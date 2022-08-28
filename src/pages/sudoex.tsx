import Fuse from 'fuse.js';
import { useState } from 'react';
import Card from '~/components/Card/Card';
import SearchBar from '~/components/SearchBar/SearchBar';
import Title from '~/components/Title';
import { MilestoneData } from '~/types/cms';
import { request } from '~/utils/server/requestCMS';

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
  return (
    <>
      <div
        className={`absolute z-10 top-0 bottom-0 left-0 right-0 ${
          modalOpen ? '' : 'invisible'
        } bg-black opacity-30 flex items-center justify-center`}
        onClick={() => setModalOpen(false)}
      ></div>
      <div className="flex flex-col items-center justify-start gap-1 pb-8">
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
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 auto-rows-min gap-4 justify-center place-items-center items-center">
          {shownMilestone.map(
            ({ attributes: { description, appName, group, images } }) => (
              <Card
                key={group}
                description={description}
                imageURLs={images.data.map(({ attributes: { url } }) => url)}
                nthGroup={group}
                appName={appName}
                showButton={true}
                runOnButtonClick={() => setModalOpen(true)}
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
