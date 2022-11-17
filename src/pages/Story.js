import { useHistory, useParams } from 'react-router-dom';
import StoryDetail from '../components/full-story/StoryDetail';
import MainLayout from '../components/layout/MainLayout';
import { RollbackOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentStory } from '../store/news-slice';
import SomethingWentWrong from '../components/UI/SomethingWentWrong';
const Story = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const backToAllNewsHandler = () => {
    history.push('/news');
  };

  const params = useParams();
  const { storyId } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCurrentStory(storyId));
  }, [storyId, dispatch]);

  const ui = useSelector(state => state.ui);
  const { error } = ui.notification;

  return (
    <MainLayout
      hasBtn={true}
      icon={<RollbackOutlined />}
      onClick={backToAllNewsHandler}
      className="reload-button"
      text="Back to news"
      title="Back To All News"
    >
      {error ? <SomethingWentWrong message={error} /> : <StoryDetail />}
    </MainLayout>
  );
};

export default Story;
