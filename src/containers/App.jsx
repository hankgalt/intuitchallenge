import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Home from '../pages/Home';
import Details from '../pages/Details';
import { history } from '../utils/history';

const useStyles = makeStyles({
    root: {
        height: '100%',
        minHeight: '90vh',
        overflowY: 'hidden'
    }
});

function App() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path='*' component={Details}/>
                </Switch>
            </Router>
        </Container>
    );
}

export default App
