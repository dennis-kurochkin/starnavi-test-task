import PropTypes from 'prop-types';
import styles from './Square.module.css';

const Square = ({ row, column, isFilled, onHover }) => {

  return (
    <div
      className={`${styles.elem}${isFilled ? ` ${styles.filled}` : ''}`}
      onMouseOver={() => onHover(row, column)}
    ></div>
  );
}

Square.propTypes = {
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  isFilled: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
}

export default Square;
