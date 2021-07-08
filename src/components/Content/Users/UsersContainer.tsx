import React, {Component} from "react";
import {connect} from "react-redux";
import {
  FilterType,
  follow, getUsers,
  unfollow
} from "../../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../../common/preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount, getUsersFilter, getUsersSuperSelector,
} from "../../../redux/users-selectors";
import {UserType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress: Array<number>
  filter: FilterType
}
type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
  unfollow: (UserId: number) => void
  follow: (UserId: number) => void
}
type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize, filter} = this.props;
    this.props.getUsers(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize, filter} = this.props;
    this.props.getUsers(pageNumber, pageSize, filter);
  }

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props;
    this.props.getUsers(1, pageSize, filter);
  }

  render() {
    return <>
      <h2>{this.props.pageTitle}</h2>
      {this.props.isFetching ? <Preloader/> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        onFilterChanged={this.onFilterChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

//* selectors
let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  }
}

export default compose<React.ComponentType>(
  withAuthRedirect,
// <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
  (mapStateToProps, {follow, unfollow, getUsers})
)(UsersContainer);
