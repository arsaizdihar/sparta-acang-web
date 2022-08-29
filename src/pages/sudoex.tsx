import Fuse from 'fuse.js';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Card from '~/components/Card/Card';
import Modal from '~/components/Modal';
import SearchBar from '~/components/SearchBar/SearchBar';
import Title from '~/components/Title';
import { MilestoneData } from '~/types/cms';
import { request } from '~/utils/server/requestCMS';
import { trpc } from '~/utils/trpc';

type Props = {
  allMilestone: MilestoneData[];
};

const SudoEx = ({ allMilestone }: Props) => {
  const [shownMilestone, setShownMilestone] = useState(allMilestone);
  const searchOptions = {
    includeScore: true,
    keys: ['attributes.appName', 'attributes.description', 'attributes.group'],
  };
  const [modalOpen, setModalOpen] = useState(false);
  const fuse = new Fuse(allMilestone, searchOptions);
  function searchFunction(query: string) {
    return fuse.search(query).map((searchResult) => searchResult.item);
  }
  const voteMutation = trpc.useMutation(['milestone.vote']);
  const {
    data: voteData,
    isLoading: voteDataLoading,
    isError: voteDataError,
  } = trpc.useQuery(['milestone.getVote']);

  const { data: session, status: sessionStatus } = useSession();

  async function handleVote(group: number) {
    const loadingToast = toast.loading(`Sedang vote untuk kelompok ${group}`);
    const { valueOf } = await voteMutation.mutateAsync({ id: group });
    toast.dismiss(loadingToast);
    if (!valueOf) {
      toast.error("Failed to vote because you've already voted");
      return;
    }

    toast.success(`Berhasil vote untuk kelompok ${group}`);
  }

  if (voteDataLoading || sessionStatus === 'loading') {
    return (
      <div className="flex flex-grow items-center justify-center">
        <h3 className="font-sudo-title text-3xl">Loading milestone data</h3>
      </div>
    );
  }

  return (
    <>
      <div
        className={`absolute z-10 top-0 bottom-0 left-0 right-0 ${
          modalOpen ? '' : 'invisible'
        } bg-rgba flex items-center justify-center bg-black/30`}
        onClick={() => setModalOpen(false)}
      >
        <Modal
          buttonText="IYA"
          runOnButtonClick={() => null}
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
        {sessionStatus === 'unauthenticated' ? (
          <h3 className="font-sudo-title text-xl text-sudo-dark-brown">
            You cannot vote because you are not logged in
          </h3>
        ) : null}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 auto-rows-min gap-4 justify-center place-items-center items-center">
          {shownMilestone.map(
            ({ attributes: { description, appName, group, images } }) => (
              <Card
                key={group}
                description={description}
                imageURLs={images.data.map(({ attributes: { url } }) => url)}
                nthGroup={group}
                appName={appName}
                showButton={sessionStatus === 'authenticated' ? true : false}
                buttonType={
                  group === voteData?.milestoneGroup ? 'cancel' : 'normal'
                }
                runOnButtonClick={async () => await handleVote(group)}
                buttonText={
                  group === voteData?.milestoneGroup ? 'BATAL VOTE' : 'VOTE'
                }
              />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const query = `{
    milestones {
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
        }
      }
    }
  }`;

  const result = await request<{ milestones: { data: MilestoneData[] } }>({
    query,
  });

  return {
    props: {
      allMilestone: result.milestones.data,
    } as Props,
  };
}

export default SudoEx;
