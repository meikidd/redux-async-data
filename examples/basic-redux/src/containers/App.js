import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectReddit, invalidateReddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';
import {
  AsyncView,
  createAsyncData,
  isPending,
  isFailed
} from 'redux-async-data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch, selectedReddit } = this.props;
    dispatch(invalidateReddit(selectedReddit));
  }

  render() {
    const { selectedReddit, posts } = this.props;

    const refreshBtn = (
      <a href="#" onClick={this.handleRefreshClick}>
        Refresh
      </a>
    );

    return (
      <div>
        <Picker
          value={selectedReddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend', 'notfound', 'empty']}
        />{' '}
        {!isPending(posts) && refreshBtn}
        <AsyncView
          data={posts}
          pending={<h2>Loading...</h2>}
          empty={<h2>Empty.</h2>}
          failed={<pre>{isFailed(posts) && posts.errorMsg.error}</pre>}
          succeeded={<Posts posts={posts.data} />}
        />
      </div>
    );
  }
}

App.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.object
};

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state;
  const posts = postsByReddit[selectedReddit] || createAsyncData([]);

  return { selectedReddit, posts };
}

export default connect(mapStateToProps)(App);
