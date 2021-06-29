import React from "react";
import userPhoto from '../../../assets/images/user.png'
import {NavLink} from "react-router-dom";

let User = (props) => {
  let user = props.user;
  return (
    <div>
      <div>
        <NavLink to={'/profile/' + user.id}>
          <img src={user.photos.small != null ? user.photos.small : userPhoto}/>
        </NavLink>
      </div>
      <div>
        {user.followed
          ? <button disabled={props.followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                      props.unfollow(user.id);
                    }}>Unfollow</button>
          : <button disabled={props.followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                      props.follow(user.id);
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
