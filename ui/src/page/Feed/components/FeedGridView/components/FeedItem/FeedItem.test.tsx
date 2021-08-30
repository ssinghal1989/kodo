import { render, screen } from '@testing-library/react';
import { FeedItem } from './index';
import { FeedItem as FeedItemType } from '../../../../types';

test('render a feed item with image name and description', () => {
  const feed: FeedItemType = {
    "name": "Customer Assurance Liaison",
    "image": "http://lorempixel.com/640/480",
    "description": "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.",
    "dateLastEdited": "2018-05-19T12:33:25.545Z"
  };
  render(<FeedItem feed={feed}/>);
  const imageElement = screen.getByAltText('Customer Assurance Liaison');
  expect(imageElement).toBeInTheDocument();
  const heading = screen.getByText(/Customer Assurance Liaison/i);
  expect(heading).toBeInTheDocument();
});
