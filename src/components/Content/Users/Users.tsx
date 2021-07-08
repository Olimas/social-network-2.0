import s from './Users.module.css'
import React, {useEffect} from "react";
import Paginator from "../../common/paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPage, getFollowingInProgress,
  getPageSize,
  getUsers,
  getTotalUsersCount,
  getUsersFilter, getUsersSuperSelector,
} from "../../../redux/users-selectors";

type PropsType = {}
// type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC<PropsType> = (props) => {

  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch();
  // const history = useHistory()

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }
  const follow = (userId: number) => {
    dispatch(follow(userId));
  }
  const unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  }

  return (
    <div className={s.usersContainer}>

      <UsersSearchForm onFilterChanged={onFilterChanged}/>

      <Paginator currentPage={currentPage}
                 onPageChanged={onPageChanged}
                 totalItemsCount={totalUsersCount}
                 pageSize={pageSize}/>

      <div className={s.users}>
        {
          users.map(u => <User user={u}
                               key={u.id}
                               followingInProgress={followingInProgress}
                               unfollow={unfollow}
                               follow={follow}
          />)
        }
      </div>
    </div>
  )
}
