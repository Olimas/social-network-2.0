import s from './Users.module.css'
import React from "react";
import Paginator from "../../common/paginator/Paginator";
import User from "./User";

let Users = (props) => {
  return <div className={s.usersContainer}>
    <Paginator currentPage={props.currentPage}
               onPageChanged={props.onPageChanged}
               totalItemsCount={props.totalUsersCount}
               pageSize={props.pageSize}/>

    <div className={s.users}>
      {
        props.users.map(u => <User user={u}
                                   key={u.id}
                                   followingInProgress={props.followingInProgress}
                                   unfollow={props.unfollow}
                                   follow={props.follow}
        />)
      }
    </div>
  </div>
}

export default Users;
