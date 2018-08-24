import React from 'react';
import ReactDom from 'react-dom';
import { createStore,applyMiddleware,compose} from  'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter,Route, Switch} from "react-router-dom";
import reducers from './reducer';
import Register from "./container/register/register";
import Login from "./container/login/login";
import AuthRoute from "./conpoment/authRoute/authRouth";
import BossInfo from './container/bossinfo/bossinfo';
import Geniusinfo from './container/geniusinfo/geniusinfo';
import Dashboard from  "./conpoment/dashboard/dashboard";
import Chat from "./conpoment/chat/chat"
import "./config"
import "./index.css"

 const store =createStore(reducers,compose(
     applyMiddleware(thunk),//添加中间件，支持异步
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 ))

ReactDom.render((
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                {/*判断作用*/}
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={Geniusinfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user"  component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>)
),document.getElementById("root"))