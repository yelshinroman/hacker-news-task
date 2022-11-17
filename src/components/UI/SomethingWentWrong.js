import { Fragment } from 'react';
import UIButton from './UIButton';
import { useHistory } from 'react-router-dom';
const SomethingWentWrong = props => {
  const history = useHistory();
  const goToMainPageHandler = () => {
    history.push('/news');
  };
  return (
    <Fragment>
      <p
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '3rem',
        }}
      >
        {props.message}
      </p>
      <UIButton
        title="Go To Main Page"
        text="Go To Main Page"
        className="to-main-page-btn"
        onClick={goToMainPageHandler}
      />
    </Fragment>
  );
};

export default SomethingWentWrong;
