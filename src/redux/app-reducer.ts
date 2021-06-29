import {getAuthUserData} from "./auth-reducer";

const INITIALAZED_SUCCESS = 'INITIALAZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean,
}

const initialState = {
  initialized: false,
}
                                                                      // return type
const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
  type: typeof INITIALAZED_SUCCESS,
}

export const setInitializedSuccess = () : InitializedSuccessActionType => ({type: INITIALAZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccess());
  })
}

export default appReducer;
