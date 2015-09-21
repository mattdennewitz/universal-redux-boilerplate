import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import { REQUEST_POSTS, RECEIVE_POSTS } from './actions';

const initialState = {
    posts: [],
    isFetching: false,
}

const postsReducer = function(previousState, action) {
    switch(action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, previousState, {
                isFetching: true,
            });

        case RECEIVE_POSTS:
            return Object.assign({}, previousState, {
                isFetching: false,
                posts: action.posts,
            });

        default:
            if(previousState === undefined) {
                return initialState;
            } else {
                return previousState;
            }
    }
};

const rootReducer = combineReducers({
    posts: postsReducer,
    router: routerStateReducer,
});

export default rootReducer;
