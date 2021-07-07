import React from "react";
import userPhoto from '../../../assets/images/user.png'
import {NavLink} from "react-router-dom";
import {UserType} from "../../../types/types";

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
  return (
    <div>
      <div>
        <NavLink to={'/profile/' + user.id}>
          <img src={user.photos.small != null ? user.photos.small : userPhoto}/>
        </NavLink>
      </div>
      <div>
        {user.followed
          ? <button disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                      unfollow(user.id);
                    }}>Unfollow</button>
          : <button disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                      follow(user.id);
                    }}>Follow</button>
        }
      </div>
      <div>
        <div>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </div>
        <div>
          <div>{"u.location.country"}</div>
          <div>{"u.location.city"}</div>
        </div>
      </div>
    </div>
  )
}

export default User;
