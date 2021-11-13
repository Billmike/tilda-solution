import { request } from 'graphql-request';

const fetcher = (query: any, variables?: any) =>
  request('https://tilda-quiz.hasura.app/v1/graphql', query, variables);

export default fetcher;
