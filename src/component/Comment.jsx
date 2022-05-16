import React, { useState } from "react";

export default function Comment({ header, addComment }) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const [commentText, setCommentText] = useState("");
  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };
  const [errorMessage, setErrorMessage] = useState(false);

  const validateComment = () => {
    if (name.trim() !== "" && commentText.trim() !== "") {
      setErrorMessage(false);
      addComment(name, commentText, new Date());
      setName("");
      setCommentText("");
    } else setErrorMessage(true);
  };

  return (
    <div className="commentBox">
      <div className="heading">{header}</div>
      <div>
        <div className="child">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="child">
          <textarea
            placeholder={header}
            value={commentText}
            onChange={handleCommentTextChange}
          />
        </div>
        {errorMessage && <div>Empty name or message</div>}
        <div className="right">
          <div className="primaryButton" onClick={validateComment}>
            POST
          </div>
        </div>
      </div>
    </div>
  );
}
