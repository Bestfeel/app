/**
 * Created by feel on 2016/12/28.
 */

import React from "react";
import Main from "./Main";
import {Route, IndexRoute} from "react-router";

import  testApp from  "./test/testApp";

const AppRoutes = (
    <Route path="/">
        <IndexRoute component={Main}></IndexRoute>
    </Route>
);

export default AppRoutes;