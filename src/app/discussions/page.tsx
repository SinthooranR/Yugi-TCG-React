import { getAllPosts } from "@/util/discussionMethods";
import React from "react";
import { Post } from "../../../interfaces";
import PostList from "./_components/PostList";

const DiscussionPage = async () => {
  const posts: Post[] = await getAllPosts();
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export default DiscussionPage;
