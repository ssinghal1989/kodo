import { Request, Response } from "express";
import { feeds } from "../mockData/feed";
import { FeedItem } from "../types/feed";

enum sorting {
  name = 'name',
  dateLastEdited = 'dateLastEdited'
}

type FeedQuery = {
  page: string,
  pageSize: string,
  search: string,
  sortBy: string,
}

type FeedReponse = {
  feeds: Array<FeedItem>,
  totalCount: Number
}

/**
 * Get feeds route having search and sort capability along with pagination
 * @param { String } search string to search the feeds
 * @param { String } sortBy field on which need to sort the feeds
 * @param { String } page page number for which need to return the feeds
 * @param { String } pageSize no of records should be included in one page
 * @returns { FeedReponse } feeds with total count for the given search criteria
 */

const compareName = (a: string, b: string) => a.localeCompare(b);

const compareDateString = (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime();

export const getFeeds = (request: Request<{}, {}, {}, FeedQuery>, response: Response) => {
  try {
    const query: FeedQuery = request.query;
    let filteredFeeds: Array<FeedItem> = [...feeds];
    let totalCount: Number = filteredFeeds.length;

    // Handle Search
    if (query.search && query.search.trim().length) {
      const searchStr: string = query.search.trim();
      let regexStr = '^';
      // Adding regex parts basis on exact match or fuzzy match
      if (searchStr.charCodeAt(0) === 34 && searchStr.charCodeAt(searchStr.length - 1)) {
        regexStr  = `${regexStr}(?=.*${searchStr.substring(1, searchStr.length-1)})`;
      } else {
        const searchStrArray: Array<string> = searchStr.split(' ');
        for (let i=0; i<searchStrArray.length; i++) {
          regexStr  = `${regexStr}(?=.*${searchStrArray[i]})`;
        }
      }
      regexStr  = `${regexStr}.*$`;
      const regex: RegExp = new RegExp(regexStr, 'i');
      filteredFeeds = filteredFeeds.filter((item: FeedItem) => regex.test(item.name) || regex.test(item.description));
      totalCount = filteredFeeds.length;
    }

    // Handle Sorting
    if (filteredFeeds.length && query.sortBy) {
      filteredFeeds = filteredFeeds.sort((a: FeedItem, b: FeedItem) => {
        if (query.sortBy === sorting.name) {
          return compareName(a.name, b.name);
        } else if (query.sortBy === sorting.dateLastEdited) {
          return compareDateString(a.dateLastEdited, b.dateLastEdited);
        }
      });
    }

    // Handle Pagination
    if (filteredFeeds.length && query.page && query.pageSize) {
      const page: number = parseInt(query.page);
      const pageSize: number = parseInt(query.pageSize);
      const startIndex: number = (page - 1) * pageSize;
      // Check if more data is available 
      if (!filteredFeeds[startIndex]) {
        response.status(200).json([]);
      } else {
        filteredFeeds = filteredFeeds.slice(startIndex, startIndex + pageSize);
      }
    }

    const responseObj: FeedReponse = {
      feeds: filteredFeeds,
      totalCount: totalCount
    }
    response.status(200).json(responseObj);
  } catch(e) {
    response.status(500).json(e);
  }
}