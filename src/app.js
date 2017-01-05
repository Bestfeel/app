/**
 * Created by feel on 2016/12/28.
 */
import React from "react";
import ReactDOM from "react-dom";
import {hashHistory, Router} from "react-router";
import AppRoutes from "./components/Router";
import injectTapEventPlugin from "react-tap-event-plugin";


injectTapEventPlugin();

ReactDOM.render((
        <div>
            <Router history={hashHistory}>
                {AppRoutes}
            </Router>
        </div>
    ),
    document.getElementById('app')
);

