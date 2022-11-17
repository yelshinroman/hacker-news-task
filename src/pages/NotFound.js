import MainLayout from '../components/layout/MainLayout';
import SomethingWentWrong from '../components/UI/SomethingWentWrong';

const NotFound = () => {
  return (
    <MainLayout hasBtn={false}>
      <SomethingWentWrong message={`Oops, this page doesn't exist!`} />
    </MainLayout>
  );
};

export default NotFound;
