import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter, NavLink, Redirect, Route, withRouter} from "react-router-dom"
// import Footer from './components/Footer/Footer';
import News from "./components/Content/News/News";
import Music from "./components/Content/Music/Music";
import Settings from "./components/Content/Settings/Settings";
import {LoginPage} from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import store, {AppStateType} from "./redux/redux-store";
import {witchSuspense} from "./hoc/witchSuspense";

import {Breadcrumb, Layout, Menu} from 'antd';
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import s from "./components/Aside/Aside.module.css";
import Header from './components/Header/Header';

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

// import DialogsContainer from "./components/Content/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import('./components/Content/Dialogs/DialogsContainer'));
// import ProfileContainer from "./components/Content/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import('./components/Content/Profile/ProfileContainer'));
// import UsersContainer from "./components/Content/Users/UsersContainer";
const UsersPage = React.lazy(() => import ('./components/Content/Users/UsersContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = witchSuspense(DialogsContainer);
const SuspendedProfiles = witchSuspense(ProfileContainer);
const SuspendedUsers = witchSuspense(UsersPage);

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
    // console.error(promiseRejectionEvent);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandleErrors);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandleErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (

      // <div className="app-wrapper">
      //   <HeaderContainer/>
      //   <Aside/>
      //   <div className="content">
      //     <Route path="/profile/:userId?" render={() => <SuspendedProfiles/>}/>
      //     <Route path="/dialogs" render={() => <SuspendedDialogs/>}/>
      //     <Route path="/users" render={() => <SuspendedUsers pageTitle={"Samurai"}/>}/>
      //     <Route path="/news" render={() => <News/>}/>
      //     <Route path="/music" render={() => <Music/>}/>
      //     <Route path="/settings" render={() => <Settings/>}/>
      //     <Route path="/login" render={() => <LoginPage/>}/>
      //     <Route path="/" render={() => <Redirect to="/profile"/>}/>
      //   </div>
      //   <Footer/>
      // </div>

      <Layout>
        <Header />
        <Content style={{padding: '0 50px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{padding: '24px 0'}}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%'}}
              >
                <SubMenu key="sub1" icon={<UserOutlined/>} title="My Profile">
                  <Menu.Item key="1"><NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="/dialogs">Dialogs</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                  <Menu.Item key="3"><NavLink to="/users">Users</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined/>} title="Other">
                  <Menu.Item key="4"><NavLink to="/news">News</NavLink></Menu.Item>
                  <Menu.Item key="5"><NavLink to="/music">Music</NavLink></Menu.Item>
                  <Menu.Item key="6"><NavLink to="/settings">Settings</NavLink></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{padding: '0 24px', minHeight: 280}}>
              <Route path="/profile/:userId?" render={() => <SuspendedProfiles/>}/>
              <Route path="/dialogs" render={() => <SuspendedDialogs/>}/>
              <Route path="/users" render={() => <SuspendedUsers pageTitle={"Samurai"}/>}/>
              <Route path="/news" render={() => <News/>}/>
              <Route path="/music" render={() => <Music/>}/>
              <Route path="/settings" render={() => <Settings/>}/>
              <Route path="/login" render={() => <LoginPage/>}/>
              <Route path="/" render={() => <Redirect to="/profile"/>}/>
            </Content>
          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>SSN ©2021 Created by Olimas</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJsApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJsApp;
