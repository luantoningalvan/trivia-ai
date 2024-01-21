import { IconButtonContainer } from "./IconButton.styles";
import { Feather } from "@expo/vector-icons";
import { ComponentProps, forwardRef } from "react";
import { RectButtonProps } from "react-native-gesture-handler";

interface IconButtonProps extends RectButtonProps {
  icon: ComponentProps<typeof Feather>["name"];
  size?: number;
  color?: string;
}

export const IconButton = forwardRef<IconButtonProps, any>((props, ref) => {
  const { icon, size, color, ...rest } = props;

  return (
    <IconButtonContainer {...rest}>
      <Feather name={icon} size={size || 24} color={color || "#000"} />
    </IconButtonContainer>
  );
});
