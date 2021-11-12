import { request } from 'graphql-request';

const fetcher = (query: any) =>
  request('https://tilda-quiz.hasura.app/v1/graphql', query);

export default fetcher;
