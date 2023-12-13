import { atom } from "recoil";

export const boardSizeState = atom({
  key: "boardSizeState",
  default: { width: 8, height: 8, mines: 10 },
});

export const boardState = atom({
  key: "boardState",
  default: Array(8).fill(
    Array(8).fill({
      isMine: false,
      isOpen: false,
      isFlagged: false,
    })
  ),
});
