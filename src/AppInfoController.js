import React from "react";
import SidebarNavigation from './SidebarNavigation';
import { Route, Router } from "react-router-dom";
import { createBrowserHistory as createHistory } from 'history'
import TabView from "./TabView";




const history = createHistory();
const SIDEBAR_WIDTH = 160;

export default class AppInfoController extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <SidebarNavigation sideWidth={SIDEBAR_WIDTH} />
                    <Route path="/ApplicationsRegistryWeb/secure/:appId/:targetId" render={(props) => 
                        (<TabView sideWidth={SIDEBAR_WIDTH} appId={props.match.params.appId} targetId={props.match.params.targetId} />)}  >
                                </Route>
                </div>
            </Router>
        )
    }

}

