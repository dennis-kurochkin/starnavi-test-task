import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Square.module.css';

const Square = ({ row, column, onFill, onUnfill }) => {
  const [filled, setFilled] = useState(false);

  const handleMouseOver = () => {
    if (!filled) {
      onFill([row, column]);
    } else {
      onUnfill([row, column]);
    }

    setFilled(!filled);
  }

  return (
    <div
      data-row={row}
      data-column={column}
      className={`${styles.elem} ${filled ? styles.filled : ''}`}
      onMouseOver={handleMouseOver}
    ></div>
  );
}

Square.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  onFill: PropTypes.func.isRequired,
  onUnfill: PropTypes.func.isRequired,
}

export default Square;
