import Fuse from 'fuse.js';
import { gql } from 'graphql-request';
import { GetStaticProps } from 'next';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import Card from '~/components/Card/Card';
import CustomHead from '~/components/CustomHead';
import Modal from '~/components/Modal';
import { usePageData } from '~/components/PageDataProvider';
import SearchBar from '~/components/SearchBar/SearchBar';
import Title from '~/components/Title';
import { MilestoneData } from '~/types/cms';
import { ButtonType } from '~/types/frontEndTypes';
import { getFeatureFlag } from '~/utils/server/getFeatureFlag';
import { request } from '~/utils/server/requestCMS';
import { trpc } from '~/utils/trpc';

export const getStaticProps: GetStaticProps = async () => {
  const query = gql`
    query {
      milestones(sort: "group", pagination: { limit: 23 }) {
        data {
          attributes {
            appName
            description
            images {
              data {
                id
                attributes {
                  url
                }
              }
            }
            group
            webUrl
          }
        }
      }
    }
  `;
  const [showMilestone, enableVote, result] = await Promise.all([
    getFeatureFlag('MILESTONE_SHOW'),
    getFeatureFlag('MILESTONE_VOTE'),
    request<{ milestones: { data: MilestoneData[] } }>({
      query,
    }),
  ]);

  return {
    props: {
      data: { allMilestone: result.milestones.data, showMilestone, enableVote },
    },
    revalidate: 60,
  };
};

const SudoEx = () => {
  const {
    allMilestone,
    enableVote,
    showMilestone: showPage,
  } = usePageData<{
    allMilestone: MilestoneData[];
    enableVote: boolean;
    showMilestone: boolean;
  }>();
  const [shownMilestone, setShownMilestone] = useState(allMilestone);
  const [processingSomething, setProcessingSomething] = useState(false);
  const searchOptions = {
    includeScore: true,
    keys: ['attributes.appName', 'attributes.description', 'attributes.group'],
  };
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const fuse = new Fuse(allMilestone, searchOptions);
  function searchFunction(query: string) {
    return fuse.search(query).map((searchResult) => searchResult.item);
  }
  const voteMutation = trpc.useMutation(['milestone.vote'], {
    onSuccess: () => {
      queryClient.invalidateQueries(['milestone.getVote']);
    },
  });
  const voteCancelMutation = trpc.useMutation(['milestone.cancelVote'], {
    onSuccess: () => {
      queryClient.invalidateQueries(['milestone.getVote']);
    },
  });
  const { data: session, status: sessionStatus } = useSession();
  const { data: voteData, isLoading: voteDataLoading } = trpc.useQuery(
    ['milestone.getVote'],
    { enabled: !!session?.user && enableVote },
  );

  if (!showPage) {
    return (
      <div>
        <h2 className="font-sudo-title text-7xl text-center mt-24 px-4">
          Page ini belum aktif.
        </h2>
      </div>
    );
  }

  async function handleVote(group: number) {
    const loadingToast = toast.loading(`Sedang vote untuk kelompok ${group}`);
    setProcessingSomething(true);
    const { valueOf } = await voteMutation.mutateAsync({ id: group });
    setProcessingSomething(false);
    toast.dismiss(loadingToast);
    if (!valueOf) {
      toast.error("Failed to vote because you've already voted");
      return;
    }

    toast.success(`Berhasil vote untuk kelompok ${group}`);
  }

  async function handleCancelVote() {
    const loadingToast = toast.loading(`Sedang membatalkan vote anda`);
    let error = false;
    setProcessingSomething(true);
    try {
      await voteCancelMutation.mutateAsync();
    } catch (error) {
      error = true;
    }
    setProcessingSomething(false);
    toast.dismiss(loadingToast);
    if (error) {
      toast.error('Failed to cancel your vote because you have not voted');
      return;
    }

    toast.success('Successfully cancelled your vote');
  }

  function buttonPropsDeterminer(
    group: number,
    session: Session | null,
  ): {
    buttonType: ButtonType;
    buttonText: string;
    runOnButtonClick?: () => void;
  } {
    if (session?.user?.milestoneGroup === group) {
      return { buttonType: 'disabled', buttonText: 'Kamu ada di kelompok ini' };
    }
    if (group === voteData?.milestoneGroup) {
      return {
        buttonType: 'cancel',
        buttonText: 'BATAL VOTE',
        runOnButtonClick: () => setModalOpen(true),
      };
    }
    return {
      buttonType: 'normal',
      buttonText: 'VOTE',
      runOnButtonClick: async () => await handleVote(group),
    };
  }

  return (
    <>
      <CustomHead
        title="SudoEx"
        description="Rangkaian acara berupa Exhibiton dari SUDOVerse. Acara ini bertujuan untuk memberikan wadah partisipasi dari setiap anggota SUDO dalam acara angkatan dan menjadi tempat untuk memberikan donasi bagi orang yang hadir di acara ini."
      />
      <div
        className={`fixed z-10 top-0 bottom-0 left-0 right-0 ${
          modalOpen ? '' : 'invisible'
        } bg-rgba flex items-center justify-center bg-black/30`}
        onClick={() => setModalOpen(false)}
      >
        <Modal
          buttonText="IYA"
          runOnButtonClick={handleCancelVote}
          runToClose={() => setModalOpen(false)}
          text={'Yakin ingin batal vote?'}
        />
      </div>
      <div className="flex flex-col items-center justify-start gap-2 pb-8 px-4">
        <Title text="Sudo Ex" />
        <SearchBar
          placeholder="Search kelompok"
          runOnSearch={(query: string) => {
            setShownMilestone(searchFunction(query));
          }}
          reset={() => {
            if (
              JSON.stringify(shownMilestone) === JSON.stringify(allMilestone)
            ) {
              return;
            }
            setShownMilestone(allMilestone);
          }}
        />
        {sessionStatus === 'unauthenticated' && enableVote ? (
          <h3 className="font-sudo-title text-xl text-sudo-dark-brown">
            You cannot vote because you are not logged in
          </h3>
        ) : null}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 auto-rows-min gap-4 justify-items-center">
          {shownMilestone.map(
            ({
              attributes: { description, appName, group, images, webUrl },
            }) => {
              const { buttonText, buttonType, runOnButtonClick } =
                buttonPropsDeterminer(group, session);
              return (
                <Card
                  key={group}
                  description={description}
                  imageURLs={images.data.map(({ attributes: { url } }) => url)}
                  nthGroup={group}
                  appName={appName}
                  showButton={
                    enableVote &&
                    sessionStatus === 'authenticated' &&
                    !voteDataLoading &&
                    (voteData?.milestoneGroup
                      ? voteData.milestoneGroup === group
                      : true)
                  }
                  buttonType={processingSomething ? 'disabled' : buttonType}
                  runOnButtonClick={runOnButtonClick}
                  buttonText={buttonText}
                  webUrl={webUrl}
                />
              );
            },
          )}
        </div>
      </div>
    </>
  );
};

export default SudoEx;
