import { SEARCH } from "./types";

export const search = (query) => async (dispatch, getState) => {
  const { logins, cards, docs } = getState();
  const data = logins.loginIds.concat(cards.cards, docs.docs);
  // console.log(data);
  try {
    dispatch({
      type: SEARCH,
      payload: {
        query,
        data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
