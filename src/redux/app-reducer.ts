import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";

const initialState = {
  initialized: false,
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALAZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      }
    default:
      return state;
  }
}

export const actions = {
  setInitializedSuccess: () => ({type: 'SN/APP/INITIALAZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(actions.setInitializedSuccess());
  })
}

export default appReducer;
