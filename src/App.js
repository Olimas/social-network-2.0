import './App.css';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom"
import Aside from './components/Aside/Aside';
import Footer from './components/Footer/Footer';
import News from "./components/Content/News/News";
import Music from "./components/Content/Music/Music";
import Settings from "./components/Content/Settings/Settings";


import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import React, {Component, Suspense} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/redux-store";


// import DialogsContainer from "./components/Content/Dialogs/DialogsContainer";
const DialogsContainer = React.lazy(() => import('./components/Content/Dialogs/DialogsContainer'));
// import ProfileContainer from "./components/Content/Profile/ProfileContainer";
const ProfileContainer = React.lazy(() => import('./components/Content/Profile/ProfileContainer'));
// import UsersContainer from "./components/Content/Users/UsersContainer";
const UsersContainer = React.lazy(() => import('./components/Content/Users/UsersContainer'));

class App extends Component {

  catchAllUnhandleErrors = (reason, promiseRejectionEvent) => {
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
      <div className="app-wrapper">
        <HeaderContainer/>
        <Aside/>
        <div className="content">
          <Route path="/profile/:userId?" render={() =>
            <Suspense fallback={<div><Preloader/> Loading...</div>}>
              <ProfileContainer/>
            </Suspense>
          }/>
          <Route path="/dialogs" render={() =>
            <Suspense fallback={<div><Preloader/> Loading...</div>}>
              <DialogsContainer/>
            </Suspense>
          }/>
          <Route path="/users" render={() =>
            <Suspense fallback={<div><Preloader/> Loading...</div>}>
              <UsersContainer/>
            </Suspense>
          }/>
          <Route path="/news" render={() => <News/>}/>
          <Route path="/music" render={() => <Music/>}/>
          <Route path="/settings" render={() => <Settings/>}/>
          <Route path="/login" render={() => <LoginPage/>}/>
          <Route path="/" render={() => <Redirect to="/profile"/>}/>
          {/*<Route path="*" render={() => <div>404 NOT FOUND</div>}/>*/}
        </div>
        <Footer/>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJsApp = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJsApp;
