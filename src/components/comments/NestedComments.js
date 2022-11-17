// list for nested comments in StoryDetail
import SingleComment from './SingleComment';
const NestedComments = props => {
  return props.kidsComments.map(comment => {
    if (comment?.deleted) {
      return (
        <SingleComment
          key={comment.id}
          by="unknown"
          time={comment.time}
          text="Comment was deleted!"
        />
      );
    }
    return (
      <SingleComment
        by={comment.by}
        time={comment.time}
        text={comment.text}
        kids={comment.kids}
        key={comment.id}
        id={comment.id}
        comments={comment?.comments ? comment.comments : ''}
      />
    );
  });
};

export default NestedComments;
