"use client";

import React, { FC, Fragment } from "react";
import { Post } from "../../../../interfaces";
import ThumbsIcon from "@/components/Icons/ThumbsIcon";
import PostItem from "./PostItem";
import { useAuth } from "@/util/auth-context";

const PostList: FC<{ posts: Post[] }> = ({ posts }) => {
  const { user } = useAuth();

  return (
    <div className="flex pt-16 pb-4 flex-col justify-start items-center gap-6 w-full h-full">
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <Fragment key={post.id}>
            <PostItem post={post} userId={user?.userId} />
          </Fragment>
        ))}
    </div>
  );
};

export default PostList;
