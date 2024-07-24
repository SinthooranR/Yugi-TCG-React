"use client";

import React, { FC, useEffect, useState } from "react";
import { Post } from "../../../../interfaces";
import ThumbsIcon from "@/components/Icons/ThumbsIcon";
import delayCall, { formatDate } from "@/util/constants";
import { updatePostRating } from "@/util/discussionMethods";

import * as signalR from "@microsoft/signalr";
import apiUrl from "@/util/getApiPath";

const PostItem: FC<{ post: Post; userId?: string }> = ({ post, userId }) => {
  const [thumbs, setThumbs] = useState<boolean | null>(null);
  const [ratings, setRatings] = useState(post.postRatings);

  //Used for SignalR setup
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl(`${apiUrl}/postRatingHub`)
      .build();

    connection.on(
      "ReceiveRatingUpdate",
      (ratingUpdate: {
        postId: number;
        userId: string;
        isThumbsUp: boolean | null;
      }) => {
        if (ratingUpdate.postId === post.id) {
          setRatings((prevRatings) => {
            const newRatings = prevRatings.filter(
              (rating) => rating.userId !== ratingUpdate.userId
            );
            if (ratingUpdate.isThumbsUp !== null) {
              newRatings.push({
                id: post.id,
                postId: ratingUpdate.postId,
                userId: ratingUpdate.userId,
                isThumbsUp: ratingUpdate.isThumbsUp,
              });
            }
            return newRatings;
          });

          if (ratingUpdate.userId === userId) {
            setThumbs(ratingUpdate.isThumbsUp);
          }
        }
      }
    );

    connection
      .start()
      .then(() => console.log("Connected to SignalR"))
      .catch((err) => console.error("Error connecting to SignalR", err));

    return () => {
      connection.stop();
    };
  }, [post.id, userId]);

  //Adjusts the initial state of the thumbs from the api call
  useEffect(() => {
    const currentRating = ratings.find((rating) => rating.userId === userId);
    setThumbs(currentRating?.isThumbsUp ?? null);
  }, [ratings, userId]);

  const updateThumb = async (type: "up" | "down") => {
    let newThumbs: boolean | null = null;
    if (type === "up") {
      newThumbs = thumbs === true ? null : true;
    } else {
      newThumbs = thumbs === false ? null : false;
    }

    setThumbs(newThumbs);

    await updatePostRating(post.id, newThumbs, userId);
  };

  return (
    <div className="flex flex-col items-start w-1/2 bg-slate-950 text-gray-100 rounded p-6 gap-4 wrap">
      <h1 className="text-2xl font-medium">{post.name}</h1>
      <p className="text-xl">{post.description}</p>
      <div className="flex justify-between bg-gray-100 rounded gap-4 px-2 py-2">
        <button
          className={
            thumbs === true
              ? `bg-slate-800 p-1 rounded flex gap-2`
              : `bg-transparent p-1 flex gap-2 text-black`
          }
          onClick={() => updateThumb("up")}
        >
          <ThumbsIcon isThumbsUp selected={thumbs === true} />
          {ratings.filter((pr) => pr.isThumbsUp === true).length || 0}
        </button>
        <button
          className={
            thumbs === false
              ? `bg-slate-800 p-1 rounded flex gap-2`
              : `bg-transparent p-1 flex gap-2 text-black`
          }
          onClick={() => updateThumb("down")}
        >
          <ThumbsIcon selected={thumbs === false} />
          {ratings.filter((pr) => pr.isThumbsUp === false).length || 0}
        </button>
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
