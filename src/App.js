import React, { Component } from 'react';
import indexRoutes from './routes/index.jsx';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import NotFound from "./components/not-found/NotFound";

import "./App.scss";
import { Layout } from "antd";
import './assets/scss/style.css';

class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        {indexRoutes.map((prop, i) => {
                            if (prop.redirect) {
                                return <Redirect from={prop.path} to={prop.pathTo} key={i} />;
                            }
                            else {
                                return (
                                    <Route path={prop.path} component={prop.component} key={i} />
                                );
                            }
                        })}
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

export default App;
