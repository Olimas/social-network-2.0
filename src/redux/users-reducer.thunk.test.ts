import {actions, follow, unfollow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock("../api/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPIMock.follow.mockClear();
  usersAPIMock.unfollow.mockClear();
})

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {}
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
// usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test("success follow thunk", async () => {
  const thunk = follow(1);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1));
})
test("success unfollow thunk", async () => {
  const thunk = unfollow(1);


  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingProgress(false, 1));
})
