import s from './Users.module.css'
import React from "react";
import Paginator from "../../common/paginator/Paginator";
import User from "./User";
import {UserType} from "../../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../../redux/users-reducer";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  onFilterChanged: (filter: FilterType) => void
  users: Array<UserType>
  followingInProgress: Array<number>
  unfollow: (UserId: number) => void
  follow: (UserId: number) => void
}

const Users: React.FC<PropsType> = ({
                                      currentPage,
                                      onPageChanged,
                                      totalUsersCount,
                                      pageSize,
                                      users,
                                      ...props
                                    }) => {
  return (
    <div className={s.usersContainer}>

      <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

      <Paginator currentPage={currentPage}
                 onPageChanged={onPageChanged}
                 totalItemsCount={totalUsersCount}
                 pageSize={pageSize}/>

      <div className={s.users}>
        {
          users.map(u => <User user={u}
                               key={u.id}
                               followingInProgress={props.followingInProgress}
                               unfollow={props.unfollow}
                               follow={props.follow}
          />)
        }
      </div>
    </div>
  )
}

export default Users;
