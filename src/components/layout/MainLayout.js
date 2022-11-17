import UIHeader from '../UI/UIHeader';
import UIButton from '../UI/UIButton';
import classes from './MainLayout.module.css';
import Layout from 'antd/lib/layout/layout';
import { Content } from 'antd/lib/layout/layout';

const MainLayout = props => {
  return (
    <Layout>
      <UIHeader>
        {props.hasBtn && (
          <UIButton
            icon={props.icon}
            onClick={props.onClick}
            className={props.className}
            text={props.text}
            title={props.title}
          />
        )}
      </UIHeader>
      <Content className={classes['site-layout']}>{props.children}</Content>
    </Layout>
  );
};

export default MainLayout;
