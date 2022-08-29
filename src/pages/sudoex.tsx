import { getFeatureFlag } from '~/utils/server/getFeatureFlag';

type Props = {};

export const getStaticProps = async () => {
  const showMilestone = await getFeatureFlag('MILESTONE_SHOW');

  return {
    props: {
      data: { showMilestone },
    },
  };
};

const SudoEx = (props: Props) => {
  return (
    <div className="w-full">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 auto-rows-min"></div>
    </div>
  );
};

export default SudoEx;
