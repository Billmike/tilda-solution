import { Quiz } from '../fetcher/hooks';

export const saveScoreToStorage = (correctAnswerCount: number, quiz: Quiz) => {
  const quizObject = {
    [quiz?.name as string]: `Score: ${correctAnswerCount}/${quiz?.questions.length}`,
  };

  const itemInStorage = localStorage.getItem('quiz');

  if (itemInStorage) {
    const parseItem = JSON.parse(itemInStorage);
    const newQuizInStorage = {
      ...parseItem,
      ...quizObject,
    };
    localStorage.setItem('quiz', JSON.stringify(newQuizInStorage));
  } else {
    localStorage.setItem('quiz', JSON.stringify(quizObject));
  }
};

export const fetchScoresFromStorage = () => {
  if (typeof window !== 'undefined') {
    const scores = localStorage.getItem('quiz');

    if (!scores) {
      return {
        parseScores: {},
      };
    } else {
      const parseScores = JSON.parse(scores);
      return { parseScores };
    }
  }

  return {
    parseScores: {},
  };
};
