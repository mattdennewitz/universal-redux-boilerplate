import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import PostList from './components/PostList';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="posts" component={PostList} />
    </Route>
);
