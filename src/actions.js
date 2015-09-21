import axios from 'axios';

export const REQUEST_POSTS = 'request-posts';
export const FETCH_POSTS = 'fetch-posts';
export const RECEIVE_POSTS = 'receive-posts';

export function requestPosts() {
    console.log('creating action requestPosts');

    return {
        type: REQUEST_POSTS,
    };
}

export function fetchPosts() {
    console.log('creating action fetchPosts');

    return dispatch => {
        dispatch(requestPosts);

        console.log('firing fetchPosts request');

        return axios.get('http://localhost:8000/api')
            .then(posts => dispatch(receivePosts(posts.data.posts)))
            .catch(e => { console.trace(e) });
    }
}

export function receivePosts(posts) {
    console.log('creating action receivePosts with ' + posts.length + ' posts');

    return {
        type: RECEIVE_POSTS,
        posts,
    };
}
