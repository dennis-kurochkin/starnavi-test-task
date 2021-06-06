import PropTypes from 'prop-types';
import styles from './GameInfo.module.css';

const GameInfo = ({ className = '', fieldState }) => {
  return (
    <aside className={className}>
      <h2 className={styles.title}>Hovered squares:</h2>
      <ul className={styles.list}>
        {fieldState.map((row, rowIndex) => row.map(
          (isSquareFilled, columnIndex) => isSquareFilled && (
            <li className={styles.elem} key={rowIndex + columnIndex}>
              row {rowIndex + 1} column {columnIndex + 1}
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

GameInfo.propTypes = {
  className: PropTypes.string,
  fieldState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired).isRequired,
}

export default GameInfo;
