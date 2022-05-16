import React, { useEffect, useState } from "react";
import storeComment from "../redux/action/storeComment";
import Comment from "./Comment";
import CommentHolder from "./CommentHolder";
import { useDispatch, useSelector } from "react-redux";
import storeReply from "../redux/action/storeReply";

export default function Assignment() {
  const { commentData } = useSelector((state) => state.common);
  const [commentedData, setCommentedData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const { commentData } = JSON.parse(localStorage.getItem("comment") || "[]");
    setCommentedData(commentData);
    console.log(localStorage.getItem("CommentId"), commentData);
    dispatch(storeReply(commentData));
    if (localStorage.getItem("CommentId") === null)
      localStorage.setItem("CommentId", 0);
  }, [dispatch]);
  useEffect(() => {
    const { commentData } = JSON.parse(localStorage.getItem("comment") || "[]");
    setCommentedData(commentData);
  }, [commentData]);
  console.log(commentedData);
  const [sortedComment, setSortedComment] = useState([]);
  const addComment = (name, commentText, date) => {
    const id = localStorage.getItem("CommentId");
    dispatch(
      storeComment({
        id,
        name,
        commentText,
        date,
        parent: null,
      })
    );
    localStorage.setItem("CommentId", parseInt(id) + 1);
    const { commentData } = JSON.parse(localStorage.getItem("comment"));
    setCommentedData(commentData);
  };
  const sortByDate = (arr) => {
    const sorter = (a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    };
    return arr?.sort(sorter).filter((item) => item.parent === null);
  };

  useEffect(() => {
    setSortedComment(sortByDate(commentedData) || []);
  }, [commentedData]);
  return (
    <>
      <Comment header="Comment" addComment={addComment} />
      {sortedComment.map((comment, index) => {
        return <CommentHolder comment={comment} index={index} />;
      })}
    </>
  );
}
