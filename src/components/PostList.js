import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { fetchPosts } from '../actions';

export class Post extends Component {
    render() {
        const { post } = this.props;

        return (
            <div>
                <h2>{post.title}</h2>

                <article>
                    <p>{post.content}</p>
                </article>
            </div>
        );
    }
}

class PostList extends Component {
    static fillStore(store) {
        /* dispatch `fetchPosts`, an action that loads
           content via an external api call. when the promise
           returned by `fetchPosts` is resolved, the data
           returned by the api call will be placed into the store
           by `postsReducer`. */
        return store.dispatch(fetchPosts());
    }

    componentWillMount() {
        /* here, we fake logic for determining,
           when the component is about to mount,
           if we need to dispatch `fetchPosts` */
        if(this.props.postList.posts.length === 0) {
            this.props.dispatch(fetchPosts());
        }
    }

    render() {
        /* `postList` is the list of posts in our store
           as fetched by `fetchPosts` and connected
           here as `postList` by `connect` (below) */
        let { postList, dispatch } = this.props;

        return (
            <div>
                <Helmet title="Posts" />

                <h1>Posts</h1>

                {postList.posts.map((post, i) => {
                    return <Post key={'post:' + i} post={post} />
                })}
            </div>
        );
    }
}

/* define a selector for `connect` which connects the `PostList` component
   to the list of posts in our store. */
function whatToConnect(state) {
    return {
        postList: state.posts,
    }
}

export default connect(whatToConnect)(PostList);
