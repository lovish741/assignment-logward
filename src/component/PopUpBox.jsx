import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import storeReply from "../redux/action/storeReply";

export default function PopUpBox({ commentToEdit, setOpenModal, onClose }) {
  const [commentText, setCommentText] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
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
  const validateUpdateComment = () => {
    if (commentText.trim() !== "") {
      setErrorMessage(false);
      updateComment();
    } else setErrorMessage(true);
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
        {errorMessage && <div>Empty name or message</div>}
        <div className="buttonHolder">
          <div onClick={validateUpdateComment} className="buttonBox">
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
