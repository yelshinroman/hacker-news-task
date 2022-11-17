// For Story page

import { Fragment } from 'react';
import FullStory from './FullStory';
import './StoryDetail.css';
import CommentsList from '../comments/CommentsList';
import { useDispatch, useSelector } from 'react-redux';
import UIButton from '../UI/UIButton';
import { ReloadOutlined } from '@ant-design/icons';
import { reloadComments } from '../../store/news-slice';
import LoadingSpinner from '../UI/LoadingSpinner';
const StoryDetail = () => {
  const dispatch = useDispatch();

  const currentStory = useSelector(state => state.news).currentStory;
  const ui = useSelector(state => state.ui);

  const { commentsStatus } = ui.notification;

  const reloadCommentsHandler = () => {
    dispatch(reloadComments(currentStory.id));
  };

  const childrenLength = currentStory.comments
    ? currentStory.comments.length
    : 0;

  const haveComments = () => {
    if (commentsStatus !== 'pending' && childrenLength !== 0) {
      return <CommentsList />;
    } else {
      const noComments = <p className="no-comments">No Comments Yet.</p>;

      return noComments;
    }
  };

  return (
    <Fragment>
      <div className="site-layout-content">
        <FullStory />
      </div>
      <div className="site-layout-content">
        <h1 className="comments-title">
          Comments <span>{currentStory.descendants}</span>
        </h1>
        {commentsStatus !== 'pending' && (
          <UIButton
            icon={<ReloadOutlined />}
            onClick={reloadCommentsHandler}
            className="reload-comments-btn"
          />
        )}
        {commentsStatus === 'pending' ? <LoadingSpinner /> : haveComments()}
      </div>
    </Fragment>
  );
};

export default StoryDetail;
