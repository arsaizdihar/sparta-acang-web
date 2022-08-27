import { useState } from 'react';
import Card from '~/components/Card/Card';
import SearchBar from '~/components/SearchBar';
import Title from '~/components/Title';
import { MilestoneData } from '~/types/cms';

type Props = {
  allMilestone: MilestoneData[];
};

const SudoEx = ({ allMilestone }: Props) => {
  const [shownMilestone, setShownMilestone] = useState(allMilestone);
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-start gap-1">
        <Title text="Sudo Ex" />
        <SearchBar placeholder="Search kelompok" />
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 auto-rows-min">
          {shownMilestone.map(
            ({ attributes: { description, appName, group, images } }) => (
              <Card
                key={group}
                description={description}
                imageURLs={images.map(({ attributes: { url } }) => url)}
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

export default SudoEx;
