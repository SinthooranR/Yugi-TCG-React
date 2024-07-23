"use client";

import React, { FC, useEffect, useState } from "react";
import { Post } from "../../../../interfaces";
import ThumbsIcon from "@/components/Icons/ThumbsIcon";
import { formatDate } from "@/util/constants";

const PostItem: FC<{ post: Post; userId?: string }> = ({ post, userId }) => {
  const currentRating = post.postRatings.find(
    (rating) => rating.userId === userId
  );

  const [thumbs, setThumbs] = useState<{ up: boolean; down: boolean }>({
    up: currentRating?.isThumbsUp === true ?? false,
    down: currentRating?.isThumbsUp === false ?? false,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const updateThumb = (type: "up" | "down") => {
    setThumbs((prevThumbs) => ({
      up: type === "up" ? !prevThumbs.up : false,
      down: type === "down" ? !prevThumbs.down : false,
    }));
  };

  useEffect(() => {
    const updateRatings = () => {
      const currentRating = post.postRatings.find(
        (rating) => rating.userId === userId
      );

      setThumbs({
        up: currentRating?.isThumbsUp ?? false,
        down: currentRating?.isThumbsUp === false ?? false,
      });

      setLoading(false);
    };

    updateRatings();
  }, [post, userId]);

  return (
    <div className="flex flex-col items-start w-1/2 bg-slate-950 text-gray-100 rounded p-6 gap-4 wrap">
      <h1 className="text-2xl font-medium">{post.name}</h1>
      <p className="text-xl">{post.description}</p>
      <div className="flex justify-between bg-gray-100 rounded gap-4 px-2 py-2">
        {loading ? (
          <div className="text-black p-1">...</div> // Replace this with a spinner or loading indicator
        ) : (
          <>
            <button
              className={
                thumbs.up ? `bg-slate-800 p-1 rounded` : `bg-transparent p-1`
              }
              onClick={() => updateThumb("up")}
            >
              <ThumbsIcon isThumbsUp selected={thumbs.up} />
            </button>
            <button
              className={
                thumbs.down ? `bg-slate-800 p-1 rounded` : `bg-transparent p-1`
              }
              onClick={() => updateThumb("down")}
            >
              <ThumbsIcon selected={thumbs.down} />
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
