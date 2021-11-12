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
    <div className="container mx-auto">
      <h2>Tilda Quiz </h2>
      {
        quizzes.quizzes.map(quiz => (
          <div key={quiz.name}>
            <h4>{quiz.name}</h4>
          </div>
        ))
      }
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
