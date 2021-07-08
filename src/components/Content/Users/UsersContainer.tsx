import React from "react";
import {useSelector} from "react-redux";
import Preloader from "../../common/preloader/Preloader";
import {getIsFetching,} from "../../../redux/users-selectors";
import {Users} from "./Users";

type UserPagePropsType = {
  pageTitle: string
}

const UsersPage: React.FC<UserPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching)

  return <>
    <h2>{props.pageTitle}</h2>
    {isFetching ? <Preloader/> : null}
    <Users/>
  </>
}
export default UsersPage;
