import { TextProps } from "react-native";
import { TitleText } from "./Title.styles";

interface TitleProps extends TextProps {}

export function Title({ children, ...rest }: TitleProps) {
  return <TitleText {...rest}>{children}</TitleText>;
}
