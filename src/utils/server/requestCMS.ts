import { GraphQLClient } from 'graphql-request';
import { env } from '~/env/server.mjs';

type RequestParam = {
  query: string;
  variables?: Record<string, any>;
};

const ENDPOINT = env.CMS_ENDPOINT;
const client = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization: `Bearer ${env.CMS_API_KEY}`,
  },
});

export function request<T = any>({
  query,
  variables,
}: RequestParam): Promise<T> {
  return client.request(query, variables);
}
