import { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRecoilState } from "recoil";
import { boardSizeState, boardState } from "../State";
import {
  TopBanner,
  Table,
  Difficulty,
  PlayBoard,
  TableItem,
} from "./MineSweeperStyle";

type BoardSizeType = {
  width: number;
  height: number;
  mines: number;
};

type CellType = {
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
};

export const MineSweeper = () => {
  const [boardSize, setBoardSize] =
    useRecoilState<BoardSizeType>(boardSizeState);
  const [board, setBoard] = useRecoilState<CellType[][]>(boardState);

  // 게임 보드를 생성하고 지뢰를 랜덤하게 배치하는 함수
  function createBoard(width: number, height: number, mines: number) {
    const board = Array(height)
      .fill(null)
      .map(() =>
        Array(width).fill({
          isMine: false,
          isOpen: false,
          isFlagged: false,
        })
      );

    for (let i = 0; i < mines; i++) {
      let row, col;

      do {
        row = Math.floor(Math.random() * height);
        col = Math.floor(Math.random() * width);
      } while (board[row][col].isMine);

      board[row][col].isMine = true;
    }

    return board;
  }

  // 주변의 지뢰 수를 계산하는 함수
  function countMines(board: CellType[][], row: number, col: number) {
    const offsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let count = 0;

    for (const offset of offsets) {
      const newRow = row + offset[0];
      const newCol = col + offset[1];

      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length &&
        board[newRow][newCol].isMine
      ) {
        count++;
      }
    }

    return count;
  }

  // 셀을 열었을 때 주변의 지뢰가 없는 셀을 모두 열어주는 함수
  function openCells(board: CellType[][], row: number, col: number) {
    const offsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    board[row][col].isOpen = true;

    if (countMines(board, row, col) === 0) {
      for (const offset of offsets) {
        const newRow = row + offset[0];
        const newCol = col + offset[1];

        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board[0].length &&
          !board[newRow][newCol].isOpen
        ) {
          openCells(board, newRow, newCol);
        }
      }
    }
  }

  const startGame = (width: number, height: number, mines: number) => {
    const newBoard = createBoard(width, height, mines);
    setBoard(newBoard);
  };

  const handleCellPress = (x: number, y: number) => {
    if (board[x][y].isMine) {
      Alert.alert("Game Over");
    } else {
      openCells(board, x, y);
      setBoard([...board]);
    }
  };

  const handleLongPress = (x: number, y: number) => {
    board[x][y].isFlagged = !board[x][y].isFlagged;
    setBoard([...board]);
  };

  const handleDifficultyChange = (difficulty: string) => {
    if (difficulty === "beginner") {
      setBoardSize({ width: 8, height: 8, mines: 10 });
    } else if (difficulty === "intermediate") {
      setBoardSize({ width: 10, height: 14, mines: 40 });
    } else if (difficulty === "expert") {
      setBoardSize({ width: 14, height: 24, mines: 99 });
    }
    startGame(boardSize.width, boardSize.height, boardSize.mines);
  };

  const renderBoard = ({
    item: row,
    index: x,
  }: {
    item: CellType[];
    index: number;
  }) => {
    return (
      <PlayBoard>
        {row.map((cell: CellType, y: number) => (
          <TableItem
            onPress={() => handleCellPress(x, y)}
            onLongPress={() => handleLongPress(x, y)}
          >
            <Text>
              {cell.isMine ? "M" : ""}
              {cell.isFlagged ? "F" : ""}
              {cell.isOpen ? "O" : ""}
            </Text>
          </TableItem>
        ))}
      </PlayBoard>
    );
  };

  useEffect(() => {
    startGame(boardSize.width, boardSize.height, boardSize.mines);
  }, [boardSize]);

  return (
    <SafeAreaView>
      <TopBanner>
        <Text>남은 지뢰: {/* 남은 지뢰 수 */}</Text>
        <Text>경과 시간: {/* 경과 시간 */}</Text>
      </TopBanner>
      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
        <Table
          data={board}
          renderItem={renderBoard}
          keyExtractor={(item: any, index: { toString: () => any }) =>
            index.toString()
          }
        />
      </View>
      <Difficulty>
        <TouchableOpacity onPress={() => handleDifficultyChange("beginner")}>
          <Text>Beginner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDifficultyChange("intermediate")}
        >
          <Text>Intermediate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDifficultyChange("expert")}>
          <Text>Expert</Text>
        </TouchableOpacity>
      </Difficulty>
    </SafeAreaView>
  );
};
