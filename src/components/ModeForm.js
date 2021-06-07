import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { API } from '../services';
import styles from './ModeForm.module.css';

/**
 * Formats received game mode name to easily readable string.
 * @param {string} mode
 */
const getFormattedMode = mode => mode.charAt(0).toUpperCase() + mode.slice(1).split('M').join(' m');

const ModeForm = ({ onModeChange, onGameStart, isGameStarted }) => {
  const [modes, setModes] = useState([]);
  const [size, setSize] = useState(0);

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setModes(Object.entries(data)))
      .catch(error => console.error(error));
  }, []);

  const handleModeChange = ({ target }) => {
    setSize(Number(target.value));
    onModeChange(Number(target.value));
  }

  return (
    <form className={styles.form}>
      <select
        value={size}
        onChange={handleModeChange}
        className={styles.select}
      >
        <option value={0} defaultChecked>Pick mode</option>
        {modes.map(([mode, { field: size }], index) => (
          <option key={index} value={size}>
            {getFormattedMode(mode)}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onGameStart}
        disabled={size === 0 || isGameStarted}
        className={styles.button}
      >
        Start
      </button>
    </form>
  );
}

ModeForm.propTypes = {
  onModeChange: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
  isGameStarted: PropTypes.bool.isRequired,
}

export default ModeForm;
