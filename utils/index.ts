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
