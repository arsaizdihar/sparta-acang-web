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
  console.log(shownMilestone[0]?.attributes.images.data[0]?.attributes.url);
  return (
    <div className="w-full box-border px-3">
      <div className="flex flex-col items-center justify-start gap-1">
        <Title text="Sudo Ex" />
        <SearchBar
          placeholder="Search kelompok"
          onClick={(e: any) => console.log(e)}
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
              />
            ),
          )}
        </div>
      </div>
    </div>
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
