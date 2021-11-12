import * as React from 'react'
import { GetStaticPropsContext } from 'next'
import client from '../../apollo-client'
import { gql } from '@apollo/client'

const Questions = ({ quiz }) => {
  console.log(quiz)
  return (
    <div>
      <h1>Hello!!!</h1>
    </div>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const quizId = context.params?.id;
  const { data } = await client.query({
    query: gql`
      quizzes_by_pk(id: $quizId) {
        name
        questions {
          text
        }
      }
    `
  })
  return {
    props: {
      quiz: data
    }
  }
}

export async function getStaticPaths() {
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
          id
        }
      }
    `
  })

  const paths = data.quizzes.map((quiz) => ({
    params: {
      id: quiz.id,
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export default Questions