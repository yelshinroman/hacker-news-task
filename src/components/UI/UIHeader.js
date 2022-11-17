import React from 'react';
import classes from './UIHeader.module.css';
import { Header } from 'antd/lib/layout/layout';
const UIHeader = props => {
  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        background: 'white',
      }}
      className={classes['main-header']}
    >
      <div className={classes['main-logo']}>
        <h1>hacker news clone</h1>
      </div>
      <div className={classes['main-mobile-logo']}>
        <h1>HN</h1>
      </div>
      <nav className={classes['main-nav']}>{props.children}</nav>
    </Header>
  );
};

export default UIHeader;
