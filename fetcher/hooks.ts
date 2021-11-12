import useSWR from 'swr';
import fetcher from '.';

type Quiz = {
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
