import styled from "styled-components/native";

export const TopBanner = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.FlatList`
  padding-top: 20%;
`;

export const PlayBoard = styled.View`
  flex-direction: row;
`;

export const TableItem = styled.TouchableOpacity`
  border: 1px solid #ddd;
  border-radius: 1px;
  padding: 10px;
`;

export const Difficulty = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
