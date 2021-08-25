import { FeedItem } from "../page/Feed/types"

export type FeedParams = {
  search?: string;
  sortBy?: string;
  page: string;
  pageSize: string;
}

export type FeedResponse = {
  feeds: Array<FeedItem>,
  totalCount: number,
}

/**
 * Method to get the feeds from the server
 * @param { FeedParams } queryParams query params for feed search
 * @returns { FeedResponse } feeds with total count
 */
export const getFeeds = (params: FeedParams) => {
  console.log('params', params);
  let url = new URL(`${window.location.origin}/api/feeds`);
  url.search = new URLSearchParams(params).toString();
  return new Promise((res, rej) => {
    fetch(url.toString())
      .then(response => response.json()).then(data => res(data))
      .catch(e => rej(e))
  })
}