// For AllNews page
import SingleStory from './SingleStory';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../UI/LoadingSpinner';
const NewsList = () => {
  const news = useSelector(state => state.news);
  const newsList = news.items;

  if (newsList.length === 0) {
    return <LoadingSpinner />;
  }
  return newsList.map(story => {
    return <SingleStory key={story.id} story={story} />;
  });
};

export default NewsList;
