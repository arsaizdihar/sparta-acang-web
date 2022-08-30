import { gql } from 'graphql-request';
import { GetStaticPropsResult } from 'next';
import { getFeatureFlag } from './getFeatureFlag';
import { request } from './requestCMS';

export async function getEventStaticProps(
  slug: string,
): Promise<GetStaticPropsResult<any>> {
  const [showMilestone, showEventRegister] = await Promise.all([
    getFeatureFlag('MILESTONE_SHOW'),
    getFeatureFlag('EVENT_REGISTER'),
  ]);

  const result = await request({
    query: gql`
      query Event($slug: String!) {
        events(filters: { slug: { eq: $slug } }, pagination: { limit: 1 }) {
          data {
            attributes {
              slug
              title
              description
              prasayarat
              lokasi
              waktuMulai
              waktuSelesai
              thumbnail {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
              dokumentasi {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug },
  });

  if (!result.events.data[0]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        showMilestone,
        showEventRegister,
        event: result.events.data[0].attributes,
      },
    },
  };
}
