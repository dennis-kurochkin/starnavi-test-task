import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './WinningCheck.module.css';

const WinningCheck = ({ onEnabledChange }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleOnChange = ({ target }) => {
    setIsEnabled(target.checked);
  }

  useEffect(() => {
    onEnabledChange(isEnabled);
  }, [isEnabled, onEnabledChange]);

  return (
    <div className={styles.main}>
      <input
        type="checkbox"
        id="winning"
        checked={isEnabled}
        onChange={handleOnChange}
      />
      <label htmlFor="winning">Enable game winning? (not listed in the task requirements)</label>
    </div>
  );
}

WinningCheck.propTypes = {
  onEnabledChange: PropTypes.func.isRequired,
}

export default WinningCheck;
