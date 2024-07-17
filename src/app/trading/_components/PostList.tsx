"use client";

import React, { FC } from "react";
import { Post } from "../../../../interfaces";

const PostList: FC<{ posts: Post[] }> = ({ posts }) => {
  console.log(posts);
  return <div></div>;
};

export default PostList;
