import * as types from "./actionTypes";
import * as author from "../../api/authorApi";

export const loadAuthorsSuccess = (authors) => {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
};

export const loadAuthors = () => {
  return (dispatch) => {
    return author
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
};
