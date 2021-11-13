import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react';
import { useGetQuizzes } from '../fetcher/hooks';

const fetchScoresFromStorage = () => {
  if (typeof window !== 'undefined') {
    const quizzes = localStorage.getItem('quiz')

    if (!quizzes) {
      return {
        parseQuizzes: {}
      }
    } else {
      const parseQuizzes = JSON.parse(quizzes)
      return { parseQuizzes }
    }
  }

  return {
    parseQuizzes: {}
  }
}

const Home: NextPage = () => {
  const { quizzes } = useGetQuizzes()
  const [{ parseQuizzes }] = React.useState(fetchScoresFromStorage)

  return (
    <div className="container mt-8 mx-auto">
      <h2 className="text-center text-2xl">Tilda Quizz </h2>
      <div className="grid mt-8 md:grid-cols-2 gap-4">
      {
          quizzes?.map(quiz => (
            <Link key={quiz.id} href={`/quiz/question?id=${quiz.id}`} passHref>
              <div key={quiz.id} className="border-2 p-5 cursor-pointer rounded-md shadow-sm mx-4 md:mx-0">
            <h4 className="font-bold">{quiz.name}</h4>
            <div className="flex justify-between mt-3">
              <div>
                    <p>{parseQuizzes[quiz.name] || 'Not started'}</p>
              </div>
              <button className="border-2 px-5 text-sm py-1 rounded-md cursor-pointer">
                    {parseQuizzes[quiz.name] ? 'Redo' : 'Start'}
                  </button>
                </div>
              </div>
            </Link>
        ))
      }
      </div>
    </div>
  )
}

export default Home
