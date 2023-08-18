import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PostProvider } from '../context/PostContext'

const AllTheProviders = ({ children }) => {
  return (
    <PostProvider>
      {children}
    </PostProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render, userEvent }