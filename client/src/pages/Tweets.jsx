import React from 'react'
import { getAllTweets } from '../features/tweetApi'
import { TweetCard } from '../components';
import InfiniteScroll from "react-infinite-scroller";

const Tweets = () => {
  const {data} = getAllTweets();
  return (
    <InfiniteScroll>

    <div>
      {data?.data?.map((item)=>(
        <TweetCard tweet = {item} />
        ))}
    </div>
        </InfiniteScroll>
  )
}

export default Tweets