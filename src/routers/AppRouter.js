import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from "react-router-dom";
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    // ngOnInit behaviour xd (dispatch nunca cambiará)
    useEffect(() => {
        dispatch( startChecking() );
    }, [ dispatch ]);

    if (checking) {
        return (<h5>Espere...</h5>)
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />
                    {/* !!null => false | !!'string' => true */}
                    <PrivateRoute
                        exact
                        path="/"
                        component={ CalendarScreen }
                        isAuthenticated={ !!uid }
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
