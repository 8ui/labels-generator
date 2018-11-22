export const setProducts = (payload) => (
  dispatch => {
    dispatch({
      type: 'SET_PRODUCTS',
      payload,
    });
  }
)

function getRandomRange(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

export const changeStep = (payload) => (
  async dispatch => {
    dispatch({
      type: 'STEP_LOADING',
      payload: true,
    });

    dispatch({
      type: 'CHANGE_STEP',
      payload,
    });

    await new Promise(resolve => {
      setTimeout(resolve, getRandomRange(300, 1200));
    });

    dispatch({
      type: 'STEP_LOADING',
      payload: false,
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
