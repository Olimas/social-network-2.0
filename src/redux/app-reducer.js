import {getAuthUserData} from "./auth-reducer";

const INITIALAZED_SUCCESS = 'INITIALAZED_SUCCESS';

let initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALAZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state;
  }
}

export const setInitializedSuccess = () => ({type: INITIALAZED_SUCCESS})

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccess());
  })
}

export default appReducer;
