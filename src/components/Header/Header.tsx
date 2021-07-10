import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";

type PropsType = {}

const Header: React.FC<PropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);
  const dispatch = useDispatch()
  const logoutCallback = () => {
    dispatch(logout())
  }
  const {Header} = Layout;

  return (
    <Header className="header">
      <div className="logo"/>
      <Row>
        <Col span={11}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><NavLink to="/profile">Profile</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to="/dialogs">Dialogs</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to="/users">Users</NavLink></Menu.Item>
          </Menu>
        </Col>
        <Col span={9}>
          <img className={s.headerImg} src="https://cdn.logo.com/hotlink-ok/logo-social.png"/>
        </Col>
        <Col span={4}>
          {isAuth
            ? <div className={s.loginBlock}>
              <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
              {login} <Button onClick={logoutCallback}>Log out</Button></div>
            : <NavLink to={'/login'}><Button>Login</Button></NavLink>}
        </Col>
      </Row>
    </Header>
  );
};

export default Header;
