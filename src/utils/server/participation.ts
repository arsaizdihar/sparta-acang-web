import { Event } from '@prisma/client';
import { inferAsyncReturnType } from '@trpc/server';
import { Session } from 'next-auth';
import { prisma } from '~/server/db/client';

export async function getEventsParticipants() {
  const events = await prisma.event.findMany();
  const result: Record<
    string,
    inferAsyncReturnType<typeof getEventParticipants>
  > = {};

  for (const event of events) {
    result[event.slug] = await getEventParticipants(event);
  }

  return result;
}

export async function getEventParticipants(event: Event) {
  // get participant count for each class year
  const participantCount = await prisma.user.groupBy({
    by: ['classYear'],
    where: {
      participation: { eventSlug: event.slug },
    },
    _count: true,
  });

  // participants quota for each class
  const classQuota = {
    21: event.quota21,
    20: event.quota20,
    19: event.quota19,
  };

  // participants count for each class
  const classCount = {
    21: event.quota21,
    20: event.quota20,
    19: event.quota19,
  };

  // count the 'non waiting' participants for each class
  for (const { _count, classYear } of participantCount) {
    // @ts-ignore
    classCount[classYear] = min(_count, classCount[classYear]);
  }

  const quotaTotal = Object.values(classQuota).reduce((a, b) => a + b, 0);

  // total 'non waiting' participants
  const quotaUsed = Object.values(classCount).reduce((a, b) => a + b, 0);

  return {
    total: quotaTotal,
    registered: quotaUsed,
  };
}

export const getUserParticipation = async (
  user: NonNullable<Session['user']>,
) => {
  if (user.classYear === 18) return undefined;

  const participation = await prisma.participation.findFirst({
    where: { userId: user.id },
    select: {
      event: true,
      createdAt: true,
    },
  });
  if (!participation) {
    return undefined;
  }
  const quota =
    participation.event[
      ('quota' + user.classYear) as keyof typeof participation.event
    ];
  const userOrder = await prisma.participation.count({
    where: {
      eventSlug: participation.event.slug,
      createdAt: { lte: participation.createdAt },
      user: {
        classYear: user.classYear,
      },
    },
  });

  return {
    eventSlug: participation.event.slug,
    isWaiting: userOrder > quota,
  };
};
