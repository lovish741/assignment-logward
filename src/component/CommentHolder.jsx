import React, { useState } from "react";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import storeComment from "../redux/action/storeComment";
import { Modal } from "@material-ui/core";
import PopUpBox from "./PopUpBox";
import storeReply from "../redux/action/storeReply";

export default function CommentHolder({ comment, index }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [displayReplyBox, setDisplayReplyBox] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState();
  const dispatch = useDispatch();
  const { commentData } = useSelector((state) => state.common);

  const addComment = (name, commentText, date) => {
    const id = localStorage.getItem("CommentId");
    dispatch(
      storeComment({
        id,
        name,
        commentText,
        date,
        parent: index,
      })
    );
    localStorage.setItem("CommentId", parseInt(id) + 1);
    setDisplayReplyBox(false);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const handleDelete = (commentToDelete) => {
    let comment = commentData.filter((item) => item.id !== commentToDelete.id);
    dispatch(storeReply(comment));
    setOpenModal(false);
  };

  const handleModal = (comment) => {
    setOpenModal(true);
    setCommentToEdit(comment);
  };

  return (
    <div key={Math.random()}>
      <div className="commentHolder">
        <img
          src={require("./deleteIcon.png")}
          alt="deleteIcon"
          onClick={() => handleDelete(comment)}
        />
        <div className="header">
          <div className="name">{comment.name}</div>
          <div className="date">{`${new Date(comment.date).getDate()}-${
            monthNames[new Date(comment.date).getUTCMonth()]
          }-${new Date(comment.date).getFullYear()}`}</div>
        </div>

        <div className="commentText">{comment.commentText}</div>
        <div className="buttonHolder">
          <div onClick={() => setDisplayReplyBox(true)}>Reply</div>
          <div onClick={() => handleModal(comment)}>Edit</div>
        </div>
      </div>
      {displayReplyBox && <Comment header="Reply" addComment={addComment} />}
      <div className="replyCommentHolder">
        {commentData
          ?.filter((item) => item.parent === index)
          ?.map((replyComment) => {
            return (
              <div className="commentHolder">
                <img
                  src={require("./deleteIcon.png")}
                  alt="deleteIcon"
                  onClick={() => handleDelete(replyComment)}
                />
                <div className="header">
                  <div className="name">{replyComment.name}</div>
                  <div className="date">{`${new Date(
                    replyComment.date
                  ).getDate()}-${
                    monthNames[new Date(replyComment.date).getUTCMonth()]
                  }-${new Date(replyComment.date).getFullYear()}`}</div>
                </div>

                <div className="commentText">{replyComment.commentText}</div>
                <div className="buttonHolder">
                  <div onClick={() => handleModal(replyComment)}>Edit</div>
                </div>
              </div>
            );
          })}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={onClose}
      >
        <PopUpBox
          commentToEdit={commentToEdit}
          setOpenModal={setOpenModal}
          onClose={onClose}
        />
      </Modal>
    </div>
  );
}
