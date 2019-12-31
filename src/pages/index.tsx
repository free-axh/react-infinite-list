import React from 'react';
import styles from './index.css';

import InfiniteList from './component/InfiniteList/index'

export default function() {

  let d = [];
  for (let i = 0; i < 1000; i++) {
    d.push({ id: i, value: i });
  }

  return (
    <div className={styles.normal}>
      <div style={{ height: '400px' }}>
        <InfiniteList screenHeight={400} dataSource={d} />
      </div>
    </div>
  );
}
