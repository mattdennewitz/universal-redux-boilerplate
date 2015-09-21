import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { fetchPosts } from '../actions';

// basic post list item
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

// list of posts
class PostList extends Component {
    static fetchData(store) {
        return store.dispatch(fetchPosts());
    }

    componentWillMount() {
        console.log('mounting post list');

        if(this.props.postList.posts.length === 0) {
            this.props.dispatch(fetchPosts());
        }
    }

    render() {
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

function whatToConnect(state) {
    return {
        postList: state.posts,
    }
}

export default connect(whatToConnect)(PostList);
