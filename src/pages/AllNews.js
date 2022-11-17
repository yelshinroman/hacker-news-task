import MainLayout from '../components/layout/MainLayout';
import NewsList from '../components/stories/NewsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/news-slice';
import { ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import SomethingWentWrong from '../components/UI/SomethingWentWrong';

const AllNews = () => {
  const dispatch = useDispatch();

  const ui = useSelector(state => state.ui);
  const { status, error } = ui.notification;
  const loading = status === 'pending' ? true : false;
  const text = loading ? 'updating' : 'update news';

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
    const timer = setInterval(() => {
      dispatch(fetchData());
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, update]);

  const updateNewsHandler = () => {
    setUpdate(prevState => {
      return !prevState;
    });
  };

  return (
    <MainLayout
      hasBtn={true}
      icon={<ReloadOutlined />}
      onClick={updateNewsHandler}
      className="reload-button"
      text={text}
      title="update"
    >
      {error ? <SomethingWentWrong message={error} /> : <NewsList />}
    </MainLayout>
  );
};

export default AllNews;
