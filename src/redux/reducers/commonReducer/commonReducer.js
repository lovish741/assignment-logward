export default function commonReducer(state = [], action) {
  switch (action.type) {
    case "STORE_COMMENT":
      localStorage.setItem(
        "comment",
        JSON.stringify({
          ...state,
          commentData: state?.commentData
            ? [...state.commentData, action.commentData]
            : [action.commentData],
        })
      );
      return {
        ...state,
        commentData: state?.commentData
          ? [...state.commentData, action.commentData]
          : [action.commentData],
      };
    case "EDIT_COMMENT":
      localStorage.setItem(
        "comment",
        JSON.stringify({
          ...state,
          commentData: action.commentData,
        })
      );
      return {
        ...state,
        commentData: action.commentData,
      };

    default:
      return state;
  }
}
