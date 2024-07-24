import { getAllPosts } from "@/util/discussionMethods";
import React, { Suspense } from "react";
import { Post } from "../../../interfaces";
import PostList from "./_components/PostList";
import LoadingSpinner from "../cards/loading";

const TradingPage = async () => {
  const posts: Post[] = await getAllPosts();
  return <PostList posts={posts} />;
};

export default TradingPage;
