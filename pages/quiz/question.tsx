import * as React from 'react'
import { useRouter } from 'next/router'
import { Quiz, useGetSingleQuiz } from '../../fetcher/hooks';
import { saveScoreToStorage } from '../../utils';
import { Loader, ErrorComponent } from '../../components';

const Questions = () => {
  const router = useRouter()
  const [quizAnswerState, setQuizAnswerState] = React.useState({
    chosenAnswer: '',
    quizAnswer: '',
    correctAnswerCount: 0,
    currentQuestion: 0,
  })
  const quizId = router.query.id as string
  const { quiz, error, isLoading } = useGetSingleQuiz(quizId)

  if (error) {
    return <ErrorComponent errorMessage="An error occurred fetching the questions." />
  }

  if (isLoading) {
    return <Loader />
  }

  const handleGoBack = () => {
    setQuizAnswerState({ ...quizAnswerState, currentQuestion: currentQuestion - 1 })
  }

  const chooseAnswer = (answer: string, selectedOption: string) => {
    setQuizAnswerState({ ...quizAnswerState, chosenAnswer: selectedOption, quizAnswer: answer })
  }

  const goToNextQuestion = () => {
    const { chosenAnswer, quizAnswer, correctAnswerCount } = quizAnswerState
    let newAnswerCount = correctAnswerCount

    if (chosenAnswer === quizAnswer) {
      newAnswerCount += 1
    }

    const isLastQuestion = currentQuestion === (quiz?.questions.length as number) - 1

    if (isLastQuestion) {
      saveScoreToStorage(newAnswerCount, quiz as Quiz)
      router.replace('/')
    } else {
      setQuizAnswerState({
        currentQuestion: currentQuestion + 1,
        correctAnswerCount: newAnswerCount,
        quizAnswer: '',
        chosenAnswer: ''
      })
    }
  }

  const { chosenAnswer, currentQuestion } = quizAnswerState

  const correctAnswer = quiz?.questions[currentQuestion].answer as string

  return (
    <div className="container mt-8 mx-auto">
      <h2 className="text-center text-2xl">{quiz?.name}</h2>
      <p className="text-left md:text-center text-xl my-3 mx-4 md:mx-0">{quiz?.questions[currentQuestion].text}</p>
      <ul>
        {quiz?.questions[currentQuestion].options.split(',').map(option => (
          <div key={option} className="border-2 p-3 cursor-pointer flex items-center shadow-sm mb-6 mx-4 md:mx-0" onClick={() => chooseAnswer(correctAnswer, option)}>
            <div className={`w-3 h-3 border-2 rounded-full ${chosenAnswer === option ? 'bg-blue-600' : ''}`} />
            <li className="ml-3">{option}</li>
          </div>
        ))}
      </ul>
      <div className="flex justify-center">
        <button disabled={currentQuestion === 0} className={`border-2 px-5 text-sm py-1 rounded-md cursor-pointer mx-5 ${currentQuestion === 0 ? 'opacity-30' : 'opacity-100'}`} onClick={handleGoBack}>Back</button>
        <button disabled={chosenAnswer === ''} className={`border-2 px-5 text-sm py-1 rounded-md cursor-pointer ${chosenAnswer === '' ? 'opacity-30' : 'opacity-100'}`} onClick={goToNextQuestion}>Next</button>
      </div>
    </div>
  )
}

export default Questions