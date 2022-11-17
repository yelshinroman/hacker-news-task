import { useRef, useState } from 'react';
import { DownOutlined, ReloadOutlined } from '@ant-design/icons';
import { Comment, Tooltip } from 'antd';
import { convertDate, fetchAllKidsComments } from '../../store/news-slice';
import { useDispatch, useSelector } from 'react-redux';
import NestedComments from './NestedComments';
import SomethingWentWrong from '../UI/SomethingWentWrong';
import './SingleComment.css';

const SingleComment = props => {
  const dispatch = useDispatch();

  const [rotation, setRotation] = useState(-90);

  const [title, setTitle] = useState('Show replies');

  const ui = useSelector(state => state.ui);
  const { nestedCommentsStatus, error } = ui.notification;

  const isNestedLoading = useRef(false);

  function createMarkup() {
    return { __html: props.text };
  }
  const expandCommentsHandler = event => {
    event.stopPropagation();
    if (rotation === 0) {
      setTitle('Show replies');
      setRotation(-90);
    } else {
      dispatch(fetchAllKidsComments(props.id));
      isNestedLoading.current = true;
      setTitle('Hide replies');
      setRotation(0);
    }
  };
  if (nestedCommentsStatus !== 'pending') {
    isNestedLoading.current = false;
  }
  if (error) {
    return <SomethingWentWrong message={error} />;
  }
  const kidsComments = props?.comments ? (
    <NestedComments kidsComments={props.comments} />
  ) : (
    ''
  );

  return (
    <Comment
      author={props.by}
      datetime={convertDate(props.time)}
      content={
        props.by === 'unknown' ? (
          <p className="deleted-comment">{props.text}</p>
        ) : (
          <p dangerouslySetInnerHTML={createMarkup()}></p>
        )
      }
      style={{ bottom: 12 }}
      actions={
        props.kids && [
          <Tooltip title={title}>
            {isNestedLoading.current ? (
              <ReloadOutlined
                spin={true}
                style={{
                  fontSize: '1rem',
                }}
              />
            ) : (
              <DownOutlined rotate={rotation} onClick={expandCommentsHandler} />
            )}
          </Tooltip>,
        ]
      }
    >
      {rotation === 0 && kidsComments}
    </Comment>
  );
};

export default SingleComment;
