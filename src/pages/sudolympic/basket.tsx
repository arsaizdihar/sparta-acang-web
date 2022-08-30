import { GetStaticProps } from 'next';
import EventPage from '~/components/EventPage';
import { getEventStaticProps } from '~/utils/server/getEventStaticProps';

export const getStaticProps: GetStaticProps = () =>
  getEventStaticProps('basket');

export default function Sudolympic() {
  return <EventPage />;
}
