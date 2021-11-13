import useSWR from 'swr';
import fetcher from '.';

export type Quiz = {
  name: string;
  questions: {
    options: string;
    answer: string;
    text: string;
  }[];
  id: string;
};

export const useGetQuizzes = () => {
  const { data, error } = useSWR<{ quizzes: Quiz[] }>(
    `
      query Quizzes {
        quizzes {
          name
          questions {
            options
            answer
            text
          }
          id
        }
      }
    `,
    fetcher
  );

  return {
    quizzes: data?.quizzes,
    error,
    isLoading: !data && !error,
  };
};

export const useGetSingleQuiz = (id: string) => {
  const { data, error } = useSWR<{ quizzes_by_pk: Quiz }>(
    [
      `
      query Quiz($id: uuid!) {
        quizzes_by_pk(id: $id) {
          name
          questions {
            text
            options
            answer
          }
        }
      }
    `,
      id,
    ],
    (query, id) => fetcher(query, { id })
  );

  return {
    quiz: data?.quizzes_by_pk,
    error,
    isLoading: !error && !data,
  };
};
