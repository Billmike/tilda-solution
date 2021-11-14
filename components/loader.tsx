import * as React from 'react'
import { Spinner } from "@chakra-ui/react"

export const Loader = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <Spinner />
    </div>
  )
}