import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import ModeForm from './components/ModeForm';
import Field from './components/Field';
import Square from './components/Square';
import GameInfo from './components/GameInfo';
import styles from './App.module.css';
import WinningCheck from './components/WinningCheck';

const createFieldData = (size, initialValue = false) => Array(size).fill(Array(size).fill(initialValue));

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fieldSize, setFieldSize] = useState(5);
  const [field, setField] = useState(createFieldData(fieldSize));
  const [isWinningEnabled, setIsWinningEnabled] = useState(true);

  let truthyField = createFieldData(fieldSize, true);

  const handleModeChange = size => {
    if (size >= 2) {
      setFieldSize(size);
      setField(createFieldData(size));
      truthyField = createFieldData(size, true);
    } else {
      setField(createFieldData(fieldSize));
    }

    setIsPlaying(false);
  }

  const handleSquareHover = (row, column) => {
    setField(field.map((fieldRow, fieldRowIndex) => fieldRow.map(
      (fieldColumn, fieldColumnIndex) => (
        fieldRowIndex === row && fieldColumnIndex === column ? !fieldColumn : fieldColumn
      )
    )));
  }

  useEffect(() => {
    if (!isWinningEnabled || !isEqual(field, truthyField)) {
      return;
    }

    if (!window.confirm(`You filled ${fieldSize * fieldSize} squares and won 🏆🍾\nDo you want to play again?`)) {
      setIsPlaying(false);
    }

    setField(createFieldData(fieldSize));
  }, [field, truthyField, fieldSize, isWinningEnabled])

  return (
    <div className={styles.main}>
      <main>
        <h1 className={styles.title}>Starnavi Test Task</h1>
        <ModeForm
          onGameStart={() => setIsPlaying(true)}
          onModeChange={handleModeChange}
          isGameStarted={isPlaying}
        />
        <WinningCheck
          onEnabledChange={value => setIsWinningEnabled(value)}
        />
        <Field
          size={fieldSize}
          isActive={isPlaying}
        >
          {field.map((fieldRow, fieldRowIndex) => fieldRow.map((isSquareFilled, squareIndex) => (
            <Square
              key={fieldRowIndex + squareIndex}
              row={fieldRowIndex}
              column={squareIndex}
              isFilled={isSquareFilled}
              onHover={handleSquareHover}
            />
          )))}
        </Field>
      </main>
      {isPlaying && <GameInfo className={styles.info} fieldState={field} />}
    </div>
  );
}

export default App;
