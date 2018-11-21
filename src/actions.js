export const setProducts = (payload) => (
  dispatch => {
    dispatch({
      type: 'SET_PRODUCTS',
      payload,
    });
  }
)

export const changeStep = (payload) => (
  dispatch => {
    dispatch({
      type: 'CHANGE_STEP',
      payload,
    });
  }
)

export const changeEmail = (payload) => (
  dispatch => {
    dispatch({
      type: 'CHANGE_EMAIL',
      payload,
    });
  }
)

export const changeLabel = (payload) => (
  dispatch => {
    dispatch({
      type: 'CHANGE_LABEL',
      payload,
    });
  }
)
