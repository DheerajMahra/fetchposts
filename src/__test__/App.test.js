import { screen, render, userEvent, waitForElementToBeRemoved } from '../test/test-utils'
import App from '../components/App'
import { act } from 'react-dom/test-utils'

test("Initial posts are loaded on app start", async () => {
  render(<App />)

  await waitForElementToBeRemoved(() => screen.queryByRole('button', {name: /loading/i}))

  const items = await screen.findAllByRole("listitem")

  expect(items).toHaveLength(10)
  expect(screen.queryByRole('button', {name: /loading/i})).not.toBeInTheDocument()
  expect(screen.getByRole('button', {name: /load more/i})).toBeInTheDocument()
})

test("Load More button fetches more posts", async () => {
  render(<App />)

  const loadMoreBtn = await screen.findByRole('button', {name: /load more/i});

  await act(async () => await userEvent.click(loadMoreBtn))
  await waitForElementToBeRemoved(() => screen.queryByRole('button', {name: /loading/i}))

  const items = await screen.findAllByRole("listitem")

  expect(items).toHaveLength(20)
  expect(screen.getByRole('button', {name: /load more/i})).toBeInTheDocument()
})

test("Button show `No more posts` after loading the posts 9 times", async () => {
  render(<App />)

  const loadMoreBtn = await screen.findByRole('button', {name: /load more/i});

  for(let i=0; i<9; i++) {
    await act(async () => await userEvent.click(loadMoreBtn))
  }

  expect(screen.getByRole('button', {name: /no more posts/i})).toBeInTheDocument()
})