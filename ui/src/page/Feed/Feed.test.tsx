import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Feed } from './index';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import {render, fireEvent, screen} from '@testing-library/react'

const server = setupServer(
  rest.get('/api/feeds', (req, res, ctx) => {
    return res(ctx.json({
      totalCount: 3,
      feeds: [
        {
          "name": "Customer Assurance Liaison",
          "image": "http://lorempixel.com/640/480",
          "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
          "dateLastEdited": "2018-05-19T12:33:25.545Z"
        },
        {
          "name": "Dynamic Infrastructure Designer",
          "image": "http://lorempixel.com/640/480",
          "description": "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.",
          "dateLastEdited": "2017-11-28T04:59:13.759Z"
        },
        {
          "name": "Regional Configuration Designer",
          "image": "http://lorempixel.com/640/480",
          "description": "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.",
          "dateLastEdited": "2018-07-27T21:33:53.485Z"
        }
      ]
    }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('load and display feeds', async () => {
  const history = createMemoryHistory()
  const route = '/feed'
  history.push(route)
  render(
    <Router history={history}>
      <Feed />
    </Router>,
  )
  const images = await screen.findAllByRole('img');
  expect(images).toHaveLength(3);
})

test('change search params when entered text in search input', async () => {
  const history = createMemoryHistory()
  const route = '/feed'
  history.push(route)
  render(
    <Router history={history}>
      <Feed />
    </Router>,
  )
  const searchInput = screen.getByPlaceholderText(/search.../i);
  fireEvent.change(searchInput,  { target: { value: 'The Lion' } });
  const query = new URLSearchParams(history.location.search);
  expect(query.get('search')).toEqual('The Lion');
})

test('change search params when selecting value from sort by filter', async () => {
  const history = createMemoryHistory()
  const route = '/feed'
  history.push(route)
  render(
    <Router history={history}>
      <Feed />
    </Router>,
  )
  const filterInput = screen.getByDisplayValue(/Select.../i);
  fireEvent.change(filterInput,  { target: { value: 'name' } });
  const query = new URLSearchParams(history.location.search);
  expect(query.get('sortBy')).toEqual('name');
})