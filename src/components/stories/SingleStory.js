import React from 'react';
import { Badge, Space, } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import './SingleStory.css';
import { convertDate } from '../../store/news-slice';

const { Meta } = Card;
const SingleStory = props => {
  const story = props.story;

  const ui = useSelector(state => state.ui);

  const { status } = ui.notification;
  const loading = status === 'pending' ? true : false;
  return (
    <Link to={`/news/${story.id}`}>
      <Card className="story-card" loading={loading} key={story.id}>
      <Space>
        <Badge count={`${story.score} point${story.score === 1 ? '' : 's'}`}         
        className="story-card__badge"
        />
      </Space>
     <Meta
            title={story.title}
            description={`By ${story.by} at ${convertDate(story.time)}`}
          />
     </Card>
    </Link>
  );    
};

export default SingleStory;