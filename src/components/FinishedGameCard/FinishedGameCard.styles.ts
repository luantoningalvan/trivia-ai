import styled from "styled-components/native";

export const FinishedGameCardContainer = styled.View`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #dfdfdf;
`;

export const GameTitle = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const GameQuestionsQuantity = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const WrongCount = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background: #fcc;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const CorrectCount = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  background: #cfc;
  padding: 2px 8px;
  border-radius: 4px;
`;

export const InfoBlock = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  flex: 1;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex: 1;
  margin-top: 16px;
`;
