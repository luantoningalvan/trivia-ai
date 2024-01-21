import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  flex: 1;
  padding: 8px 16px;
`;

export const QuestionsCount = styled.Text`
  font-size: 16px;
  color: #000;
`;

export const Header = styled.View`
  margin-bottom: 16px;
  gap: 16px;
  background-color: #c5fff8;
  padding: 16px;
`;

export const FinishedGamesTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

export const FinishedGameSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
`;

export const InfoBlock = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
