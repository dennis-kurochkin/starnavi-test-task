import { useState } from 'react';
import ModeForm from './components/ModeForm';
import Field from './components/Field';
import Square from './components/Square';
import GameInfo from './components/GameInfo';
import styles from './App.module.css';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fieldSize, setFieldSize] = useState(5);
  const [field, setField] = useState(Array(fieldSize).fill(Array(fieldSize).fill(false)));

  const handleModeChange = size => {
    if (size >= 2) {
      setFieldSize(size);
      setField(Array(size).fill(Array(size).fill(false)));
    } else {
      setField(Array(fieldSize).fill(Array(fieldSize).fill(false)));
    }

    setIsPlaying(false);
  }

  return (
    <main className={styles.main}>
      <div className={styles.game}>
        <h1 className={styles.title}>Starnavi Test Task</h1>
        <ModeForm
          onGameStart={() => setIsPlaying(true)}
          onModeChange={handleModeChange}
          isGameStarted={isPlaying}
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
              onHover={(row, column) => setField(
                field.map((fieldRow, fieldRowIndex) => fieldRow.map(
                  (fieldColumn, fieldColumnIndex) => (
                    fieldRowIndex === row && fieldColumnIndex === column ? !fieldColumn : fieldColumn
                  )
                ))
              )}
            />
          )))}
        </Field>
      </div>
      {isPlaying && <GameInfo className={styles.info} fieldState={field} />}
    </main>
  );
}

export default App;
