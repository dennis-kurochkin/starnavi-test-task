import { useState } from 'react';
import ModeForm from './components/ModeForm';
import Field from './components/Field';
import Square from './components/Square';
import GameInfo from './components/GameInfo';
import styles from './App.module.css';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fieldSize, setFieldSize] = useState(5);
  const [hoveredSquares, setHoveredSquares] = useState([]);

  const handleModeChange = size => {
    if (size >= 2) {
      setFieldSize(size);
    }

    setIsPlaying(false);
    setHoveredSquares([])
  }

  const handleSquareFill = squareData => {
    setHoveredSquares([...hoveredSquares, squareData]);
  }

  const handleSquareUnfill = ([row, column]) => {
    setHoveredSquares(hoveredSquares.filter(square => {
      return !(square[0] === row && square[1] === column);
    }));
  }

  let row = 1;
  let column = 1;

  return (
    <main className={styles.main}>
      <div className={styles.game}>
        <ModeForm
          onGameStart={() => setIsPlaying(true)}
          onModeChange={handleModeChange}
          isPlaying={isPlaying}
        />
        <Field
          size={fieldSize}
          isActive={isPlaying}
        >
          {[...Array(fieldSize * fieldSize)].map((_n, index) => {
            if ((index + 1) > fieldSize * row) {
              row++;
              column = 1;
            }

            return (
              <Square
                key={index}
                row={row}
                column={column++}
                onFill={handleSquareFill}
                onUnfill={handleSquareUnfill}
              />
            )
          })}
        </Field>
      </div>
      {isPlaying && <GameInfo className={styles.info} squaresInfo={hoveredSquares} />}
    </main>
  );
}

export default App;
