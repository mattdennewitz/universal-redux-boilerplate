import React from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import Helmet from 'react-helmet';


class App extends React.Component {
    render() {
        return (
            <div>
                <Helmet title="App" />

                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                    </ul>
                </nav>

                {this.props.children}
            </div>
        );
    }
};

export default App;
