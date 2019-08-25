import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import './App.css';
import Header from './Header';
import Landing from './Landing';

const SurveyNew = () => <h2>Survey</h2>;
const Dashboard = () => <h2>Dashboard</h2>;

const App = props => {
    useEffect(() => {
        props.fetchUser();
    }, []);

    return (
        <Container fluid>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </Container>
    );
};

//the first argument is mapStateToProps
//the second arguemnt as just props to pass

export default connect(
    null,
    actions
)(App);
