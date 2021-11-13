import * as React from 'react'
import { useRouter } from 'next/router'
import { useGetSingleQuiz } from '../../fetcher/hooks';

const Questions = () => {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [chosenAnswer, setChosenAnswer] = React.useState('')
  const quizId = router.query.id as string
  const { quiz, error } = useGetSingleQuiz(quizId)

  const handleChangeQuestion = (direction: 'next' | 'back') => {
    if (direction === 'next') {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const chooseAnswer = (answer: string) => {
    setChosenAnswer(answer)
  }

  return (
    <div className="container mt-8 mx-auto">
      <h2 className="text-center text-2xl">{quiz?.name}</h2>
      <p className="text-left md:text-center text-xl my-3 mx-4 md:mx-0">{quiz?.questions[currentQuestion].text}</p>
      <ul>
        {quiz?.questions[currentQuestion].options.split(',').map(option => (
          <div key={option} className="border-2 p-3 cursor-pointer flex items-center shadow-sm mb-6 mx-4 md:mx-0" onClick={() => chooseAnswer(option)}>
            <div className={`w-3 h-3 border-2 rounded-full ${chosenAnswer === option ? 'bg-blue-600' : ''}`} />
            <li className="ml-3">{option}</li>
          </div>
        ))}
      </ul>
      <div className="flex justify-center">
        <button disabled={currentQuestion === 0} className={`border-2 px-5 text-sm py-1 rounded-md cursor-pointer mx-5 ${currentQuestion === 0 ? 'opacity-30' : 'opacity-100'}`} onClick={() => handleChangeQuestion('back')}>Back</button>
        <button disabled={chosenAnswer === ''} className={`border-2 px-5 text-sm py-1 rounded-md cursor-pointer ${chosenAnswer === '' ? 'opacity-30' : 'opacity-100'}`} onClick={() => handleChangeQuestion('next')}>Next</button>
      </div>
    </div>
  )
}

export default Questions