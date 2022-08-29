import { prisma } from '~/server/db/client';

export const featureFlags = [
  'MILESTONE_SHOW',
  'MILESTONE_VOTE',
  'EVENT_REGISTER',
  'EVENT_KESAN',
  'DONATION',
] as const;

export type FeatureFlag = typeof featureFlags[number];

export async function getFeatureFlag(name: FeatureFlag) {
  const featureFlag = await prisma.featureFlag.findUnique({
    where: { name },
  });
  return featureFlag?.value ?? false;
}
