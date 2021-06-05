import PropTypes from 'prop-types';
import styles from './GameInfo.module.css';

const GameInfo = ({ className = '', squaresInfo }) => {
  return (
    <aside className={className}>
      <h2 className={styles.title}>Hovered squares:</h2>
      <ul className={styles.list}>
        {squaresInfo.map(([row, column], index) => (
          <li className={styles.elem} key={index}>
            row {row} column {column}
          </li>
        ))}
      </ul>
    </aside>
  );
}

GameInfo.propTypes = {
  className: PropTypes.string,
  squaresInfo: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired,
}

export default GameInfo;
