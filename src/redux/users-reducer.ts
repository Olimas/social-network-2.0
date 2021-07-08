import {updateObjectInArray} from "../utils/helpers/object-helpers";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import {FormAction} from "redux-form";
import {APIResponseType} from "../api/api";

export const InitialState = {
  users: [] as Array<UserType>,
  pageSize: 15,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users id
  filter: {
    term: "",
    friend: null as null | boolean
  }
}

const usersReducer = (state = InitialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SN/USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
      }
    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
      }
    case 'SN/USERS/SET_USERS':
      return {
        ...state, users: action.users
      }

    case 'SN/USERS/SET_FILTER':
      return {
        ...state, filter: action.payload
      }

    case 'SN/USERS/SET_CURRENT_PAGE':
      return {
        ...state, currentPage: action.currentPage
      }
    case 'SN/USERS/SET_TOTAL_USERS_COUNT':
      return {
        ...state, totalUsersCount: action.count
      }
    case 'SN/USERS/TOGGLE_IS_FETCHING':
      return {
        ...state, isFetching: action.isFetching
      }
    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id != action.userId)
      }
    default:
      return state;
  }
}

//* actionCreators
export const actions = {
  followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),

  setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const),

  setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
  setUsersTotalCount: (totalUsersCount: number) => ({
    type: 'SN/USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({
    type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching
  } as const),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId
  } as const),
}

//* thunks
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(page));
  dispatch(actions.setFilter(filter));
  let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setUsersTotalCount(data.totalCount));
}
export const _followUnfollowFlow =
  async (dispatch: DispatchType,
         userId: number,
         apiMethod: (userId: number) => Promise<APIResponseType>,
         actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
      dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
  }
export const follow = (userId: number): ThunkType =>
  async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
  }
export const unfollow = (userId: number): ThunkType =>
  async (dispatch) => {
    // @ts-ignore
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
  }

export default usersReducer;

export type InitialStateType = typeof InitialState;
export type FilterType = typeof InitialState.filter;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
type DispatchType = Dispatch<ActionsTypes>;
