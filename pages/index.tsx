import type { NextPage } from 'next'
import Link from 'next/link'
import { useGetQuizzes } from '../fetcher/hooks';

const Home: NextPage = () => {
  const { quizzes } = useGetQuizzes()

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
                <p>Score: 8/10</p>
              </div>
              <button className="border-2 px-5 text-sm py-1 rounded-md cursor-pointer">
                Redo
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
