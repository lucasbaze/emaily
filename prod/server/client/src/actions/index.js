import axios from 'axios';
import { FETCH_USER } from './types';

// export const fetchUser = () => {
//     //Redux usually just takes an action
//     //ReduxThunk takes a function and then gives it the dispatch function instead
//     //So instead of immediately invoking the call, we can use dispatch to control behavior
//     //We only want to dispatch an action when the promise is resolved.
//     return function(dispatch) {
//         axios
//             .get('/api/current_user')
//             .then(response =>
//                 dispatch({ type: FETCH_USER, payload: response })
//             );
//     };
// };

export const fetchUser = () => async dispatch => {
    const response = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: response.data });
};

export const handleToken = token => async dispatch => {
    const response = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: response.data });
};
