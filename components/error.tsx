import * as React from 'react'

export const ErrorComponent = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex h-screen justify-center items-center">
      <p className="text-red-600">{errorMessage}</p>
    </div>
  )
}