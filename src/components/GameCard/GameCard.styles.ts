import styled from "styled-components/native";

export const GameCardContainer = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #dfdfdf;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const GameTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export const GameQuestionsQuantity = styled.Text`
  font-size: 16px;
  color: #888;
  margin-top: 8px;
`;
