import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Options = styled.View`
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  margin: -48px 16px 16px 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

interface OptionProps {
  showCorrect?: boolean;
  showIncorrect?: boolean;
}

export const Option = styled.TouchableOpacity<OptionProps>`
  background-color: #f5f5f5;
  padding: 0 20px;
  height: 64px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${({ showCorrect }) =>
    showCorrect &&
    css`
      background-color: #5fa;
    `}

  ${({ showIncorrect }) =>
    showIncorrect &&
    css`
      background-color: #f37;
    `}
`;

export const OptionText = styled.Text<{ white?: boolean }>`
  font-size: 16px;
  color: #888;
  font-weight: bold;
  color: #000;

  ${({ white }) =>
    white &&
    css`
      color: #fff;
    `}
`;

export const QuestionContainer = styled.View`
  background: #7b66ff;
  padding: 16px;
`;

export const QuestionText = styled.Text`
  font-size: 24px;
  color: #fff;
  padding-bottom: 64px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  background: #7b66ff;
  padding: 24px 16px 16px 16px;
`;

export const TimePassed = styled.Text`
  font-size: 16px;
  color: #fff;
  width: 50px;
  text-align: right;
`;

export const CurrentQuestion = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

interface DotProps {
  active: boolean;
  passed?: boolean;
}

export const Dot = styled.View<DotProps>`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);

  ${({ active }) =>
    active &&
    css`
      width: 25px;
    `}

  ${({ passed }) =>
    passed &&
    css`
      background: #fff;
    `}
`;

export const FinishedContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 24px;
  gap: 8px;
`;

export const FinishedMessage = styled.Text`
  font-size: 24px;
  color: #000;
  text-align: center;
  margin-top: 16px;
`;

export const FinishedCount = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 16px 0 24px 0;
`;

export const CorrectCount = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const GameQuestionsQuantity = styled.Text`
  font-size: 20px;
  color: #333;
`;
