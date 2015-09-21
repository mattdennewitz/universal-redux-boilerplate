import axios from 'axios';

/* reusable action flags */
export const REQUEST_POSTS = 'request-posts';
export const FETCH_POSTS = 'fetch-posts';
export const RECEIVE_POSTS = 'receive-posts';

export function requestPosts() {
    return {
        type: REQUEST_POSTS,
    };
}

export function fetchPosts() {
    return dispatch => {
        /* tell everyone who cares that we're about to request posts --
           good for "loading..." indicators */
        dispatch(requestPosts);

        /* request posts from the api, dispatch `receivePosts` on success */
        return axios.get('http://localhost:3100/api')
            .then(posts => dispatch(receivePosts(posts.data.posts)))
            .catch(e => { console.log('API call failed') ; console.trace(e) });
    }
}

/* dispatched when new posts are recieved, e.g. from `fetchPosts`,
   and are ready to be reduced into the store */
export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts,
    };
}
