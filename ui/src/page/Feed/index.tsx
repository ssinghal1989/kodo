import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Pagination } from "../../components/Pagination"
import { FeedParams, FeedResponse, getFeeds } from "../../service/feed";
import { debounce } from "../../utils/utils";
import { FeedGridView } from "./components/FeedGridView"
import { FeedTableView } from "./components/FeedTableView";
import { Header } from "./components/Header"
import { FeedItem } from "./types";
import styles from './Feed.module.css'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const getFeedParams = (query: URLSearchParams): FeedParams => {
  const feedParams: FeedParams = {
    page: '1',
    pageSize: PAGE_SIZE.toString(),
  }
  if (query.get('search')) {
    feedParams.search = query.get('search')!;
  }
  if (query.get('sortBy')) {
    feedParams.sortBy = query.get('sortBy')!;
  }
  return feedParams;
}

const PAGE_SIZE = 3;
export const Feed = () => {
  const query = useQuery();
  const queryString = query.toString();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [feeds, setFeeds] = useState<Array<FeedItem>>([]);

  const searchFeeds = React.useMemo(() =>
    debounce((params: FeedParams) => {
      fetchFeeds(params)
    }, 300),
    []
  );
  useEffect(() => {
    const query = new URLSearchParams(queryString);
    const feedParams: FeedParams = getFeedParams(query);
    searchFeeds(feedParams);
  }, [queryString, searchFeeds])


  const fetchFeeds = async (params: FeedParams) => {
    const feeds: FeedResponse = await getFeeds(params) as FeedResponse;
    console.log('feeds', feeds);
    setFeeds(feeds.feeds);
    setCurrentPage(parseInt(params.page));
    setTotalPages(Math.ceil(feeds.totalCount/PAGE_SIZE));
  }
  
  const onGoToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const feedParams: FeedParams = getFeedParams(query);
    feedParams.page = pageNumber.toString();
    fetchFeeds(feedParams);
  }
  return (
    <>
      <Header initialValues={{ search: query.get('search') || '', sortBy: query.get('sortBy') || '' }} />
      {
        feeds.length > 0 && (
          <>
            <FeedGridView items={feeds} />
            <FeedTableView items={feeds}/>
            <div>
              <Pagination currentPage={currentPage} goToPage={onGoToPage} totalPages={totalPages}/>
            </div>
          </>
        )
      }
      {
        feeds.length === 0 && (
          <div className={styles.noRecord}>No Record Found</div>
        )
      }
      
    </>
  )
}