import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const IconButtonContainer = styled(RectButton)`
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  border-radius: 24px;
  margin: -8px;
`;

export const IconButtonText = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-left: 8px;
`;
