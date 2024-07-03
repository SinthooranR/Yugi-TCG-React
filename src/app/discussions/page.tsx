import { getAllPosts } from "@/util/discussionMethods";
import React from "react";

const DiscussionPage = async () => {
  const posts = await getAllPosts();
  console.log(posts);
  return <div></div>;
};

export default DiscussionPage;
