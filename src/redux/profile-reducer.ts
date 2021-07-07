import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostsType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'Its my first post', likesCount: 22},
    {id: 3, message: 'Hello', likesCount: 25},
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: "",
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD-POST': {
      return {
        ...state,
        posts: [...state.posts, {id: 4, message: action.newPostText, likesCount: 0}],
      }
    }
    case 'SN/PROFILE/SET_USER_PROFILE':
      return {
        ...state, profile: action.profile,
      }
    case 'SN/PROFILE/SET_STATUS':
      return {
        ...state, status: action.status,
      }
    case 'SN/PROFILE/DELETE_POST':
      return {
        ...state, posts: state.posts.filter(p => p.id != action.postId),
      }
    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
      return {
        ...state, profile: {...state.profile, photos: action.photos} as ProfileType, // temporary type conversion, need to fix
      }
    default:
      return state;
  }
}

//* action creators
export const actions = {
  addPostActionCreator: (newPostText: string) => ({type: 'SN/PROFILE/ADD-POST', newPostText} as const),
  setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
  setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
  deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),
  savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}

//* thunks
export const getUserProfile = (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getUserProfile(userId);
    dispatch(actions.setUserProfile(data));
  }
export const getStatus = (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  }
export const updateStatus = (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const data = await profileAPI.updateStatus(status);
      if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }
    } catch (error) {
      debugger
      alert(error.message)
    }
  }
export const savePhoto = (file: File): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  }
export const saveProfile = (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
      if (userId !=null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId cant be null");
      }

    } else {
      dispatch(stopSubmit("editProfile", {_error: data.messages[0]}));
      // dispatch(stopSubmit("editProfile", {"contacts": {"facebook": response.data.messages[0]}})); // separate message for each input
      return Promise.reject(data.messages[0]);
    }
  }

export default profileReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
