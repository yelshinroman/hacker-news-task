import { useSelector } from 'react-redux';
import Card from 'antd/lib/card/Card';
import './FullStory.css';
import { convertDate } from '../../store/news-slice';

const getUrl = url => {
  if (!url) {
    return '';
  }
  const shortUrl = url.split('/')[2];
  return shortUrl;
};

const FullStory = () => {
  const news = useSelector(state => state.news);
  const story = news.currentStory;

  const ui = useSelector(state => state.ui);
  const { status } = ui.notification;
  const loading = status === 'pending' ? true : false;

  function createMarkup() {
    return { __html: story.text };
  }

  const url = story.url && (
    <a id="story-url" href={`${story.url}`}>
      {`(${getUrl(story.url)})`}
    </a>
  );

  const title = !loading && (
    <p id="story-title">
      {story.title} {url}
    </p>
  );

  return (
    <Card bordered={false} loading={loading} title={title} className="story">
      {story.text && <p dangerouslySetInnerHTML={createMarkup()}></p>}
      <p>
        Author: <span>{story.by}</span>
      </p>
      <p>
        Score: <span>{story.score}</span>
      </p>
      <p>
        Date: <span>{convertDate(story.time)}</span>
      </p>
    </Card>
  );
};

export default FullStory;
