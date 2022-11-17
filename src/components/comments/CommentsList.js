// Comments list for StoryDetail

import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import LoadingSpinner from '../UI/LoadingSpinner';
const CommentsList = () => {
  const currentStory = useSelector(state => state.news).currentStory;
  const comments = currentStory.comments;

  if (comments === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ paddingTop: 12, paddingLeft: 10, paddingRight: 5 }}>
      {comments.map(comment => {
        return (
          <SingleComment
            by={comment.by}
            time={comment.time}
            text={comment.text}
            kids={comment.kids}
            key={comment.id}
            id={comment.id}
            parent={comment.parent}
            comments={comment?.comments ? comment.comments : ''}
          />
        );
      })}
    </div>
  );
};
export default CommentsList;
