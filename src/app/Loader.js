// components/Loader.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './CSS/Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <FontAwesomeIcon icon={faSpinner} spin size="5x" />
    </div>
  );
};

export default Loader;
