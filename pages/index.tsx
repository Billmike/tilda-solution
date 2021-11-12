import type { NextPage } from 'next'
import { gql } from '@apollo/client'
import client from '../apollo-client'

type Quiz = {
  name: string;
  questions: {
    options: string;
    answer: string;
    text: string;
  }[]
}
interface IQuiz {
  quizzes: {
    quizzes: Quiz[]
  }
}

const Home: NextPage<IQuiz> = ({ quizzes }: IQuiz) => {
  return (
    <div className="container mt-8 mx-auto">
      <h2 className="text-center text-2xl">Tilda Quizz </h2>
      <div className="grid mt-8 md:grid-cols-2 gap-4">
      {
        quizzes.quizzes.map(quiz => (
          <div key={quiz.name} className="border-2 p-5 cursor-pointer rounded-md shadow-sm mx-4 md:mx-0">
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
        ))
      }
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Quizzes {
        quizzes {
          name
          questions {
            options
            answer
            text
          }
        }
      }
    `
  })

  return {
    props: {
      quizzes: data
    }
  }
}

export default Home
