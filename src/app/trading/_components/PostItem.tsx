"use client";

import React, { FC, useEffect, useState } from "react";
import { Post } from "../../../../interfaces";
import ThumbsIcon from "@/components/Icons/ThumbsIcon";
import delayCall, { formatDate } from "@/util/constants";
import { updatePostRating } from "@/util/discussionMethods";

const PostItem: FC<{ post: Post; userId?: string }> = ({ post, userId }) => {
  const currentRating = post.postRatings.find(
    (rating) => rating.userId === userId
  );

  const [thumbs, setThumbs] = useState<boolean | null>(
    currentRating?.isThumbsUp === true
      ? true
      : currentRating?.isThumbsUp === false
      ? false
      : null
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateRatings = () => {
      delayCall(1000);
      const currentRating = post.postRatings.find(
        (rating) => rating.userId === userId
      );

      setThumbs(
        currentRating?.isThumbsUp === true
          ? true
          : currentRating?.isThumbsUp === false
          ? false
          : null
      );

      setLoading(false);
    };

    updateRatings();
  }, [post, userId]);

  const updateThumb = async (type: "up" | "down") => {
    let newThumbs: boolean | null = null;
    setThumbs((prevThumb) => {
      if (type === "up") {
        newThumbs = prevThumb === true ? null : true;
      } else {
        newThumbs = prevThumb === false ? null : false;
      }
      return newThumbs;
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    await updatePostRating(post.id, newThumbs, userId);
  };

  return (
    <div className="flex flex-col items-start w-1/2 bg-slate-950 text-gray-100 rounded p-6 gap-4 wrap">
      <h1 className="text-2xl font-medium">{post.name}</h1>
      <p className="text-xl">{post.description}</p>
      <div className="flex justify-between bg-gray-100 rounded gap-4 px-2 py-2">
        {loading ? (
          <div className="text-black p-1">...</div>
        ) : (
          <>
            <button
              className={
                thumbs && thumbs !== null
                  ? `bg-slate-800 p-1 rounded flex gap-2`
                  : `bg-transparent p-1 flex gap-2 text-black`
              }
              onClick={() => updateThumb("up")}
            >
              <ThumbsIcon isThumbsUp selected={thumbs === true} />
              {post.postRatings.filter((pr) => pr.isThumbsUp === true).length ||
                0}
            </button>
            <button
              className={
                !thumbs && thumbs !== null
                  ? `bg-slate-800 p-1 rounded flex gap-2`
                  : `bg-transparent p-1 flex gap-2 text-black`
              }
              onClick={() => updateThumb("down")}
            >
              <ThumbsIcon selected={thumbs === false} />
              {post.postRatings.filter((pr) => pr.isThumbsUp === false)
                .length || 0}
            </button>
          </>
        )}
      </div>
      <div>
        {new Date(post.updatedAt) > new Date(post.createdAt)
          ? "Updated: " + formatDate(post.updatedAt)
          : "Created: " + formatDate(post.createdAt)}
      </div>
    </div>
  );
};

export default PostItem;
