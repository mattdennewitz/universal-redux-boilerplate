import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import { REQUEST_POSTS, RECEIVE_POSTS } from './actions';

/* initial post state shape */
const initialPostsState = {
    posts: [],
    isFetching: false,
}

const postsReducer = function(previousState, action) {
    switch(action.type) {
        /* alerting that we're opening a request */
        case REQUEST_POSTS:
            return Object.assign({}, previousState, {
                isFetching: true,
            });

        /* new posts are available and should be added */
        case RECEIVE_POSTS:
            return Object.assign({}, previousState, {
                isFetching: false,
                posts: action.posts,
            });

        default:
            if(previousState === undefined) {
                return initialPostsState;
            } else {
                return previousState;
            }
    }
};

/* combine all purpose-specific reducers into a single reducer */
const rootReducer = combineReducers({
    posts: postsReducer,

    /* hint: connect and track react-router's state to our store
        using redux-router */
    router: routerStateReducer,
});

export default rootReducer;
