import { useSelector } from 'react-redux';
import Tooltip from 'antd/es/tooltip';
import { Button } from 'antd';
import './UIButton.css';

const UIButton = props => {
  const ui = useSelector(state => state.ui);
  const { status } = ui.notification;
  const loading = status === 'pending' ? true : false;
  return (
    <Tooltip title={props.title} placement="bottom">
      <Button
        type="primary"
        icon={props.icon}
        loading={loading}
        onClick={props.onClick}
        className={props.className}
      >
        {props.text}
      </Button>
    </Tooltip>
  );
};

export default UIButton;
