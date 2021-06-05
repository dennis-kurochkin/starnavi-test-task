import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Field.module.css';

const MD_SQUARE_SIZE = '64px';
const SM_SQUARE_SIZE = '42px';

const Field = ({ size, isActive, children }) => {
  useEffect(() => {
    const { style } = document.documentElement;

    style.setProperty('--field-size', size);
    size > 10 ? style.setProperty('--square-size', SM_SQUARE_SIZE) : style.setProperty('--square-size', MD_SQUARE_SIZE);
  }, [size]);

  return (
    <div className={`${styles.grid} ${!isActive ? `${styles.inactive}` : ''}`}>
      {children}
    </div>
  );
}

Field.propTypes = {
  size: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default Field;
