import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import storeReply from "../redux/action/storeReply";

export default function PopUpBox({ commentToEdit, setOpenModal, onClose }) {
  const [commentText, setCommentText] = useState();
  const { commentData } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  useEffect(() => {
    setCommentText(commentToEdit?.commentText);
  }, [commentToEdit]);
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const updateComment = () => {
    let updatedComment = { ...commentToEdit, commentText };
    const data = [
      ...commentData.filter((item) => item.id < updatedComment.id),
      updatedComment,
      ...commentData.filter((item) => item.id > updatedComment.id),
    ];
    dispatch(storeReply(data));
    setOpenModal(false);
  };
  return (
    <div className="modalBox">
      <div className="header">Edit Comment</div>
      <div className="editBoxHolder">
        <div className="name">{commentToEdit?.name}</div>
        <div className="commentText">
          <textarea
            placeholder="Comment"
            value={commentText}
            onChange={handleCommentChange}
          />
        </div>
        <div className="buttonHolder">
          <div onClick={updateComment} className="buttonBox">
            Save
          </div>
          <div onClick={onClose} className="buttonBox">
            Close
          </div>
        </div>
      </div>
    </div>
  );
}
