import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { ButtonContainer, ButtonText } from "./Button.styles";
import { Feather } from "@expo/vector-icons";
import { ComponentProps, forwardRef } from "react";

interface ButtonProps extends TouchableOpacityProps {
  fullWidth?: boolean;
  loading?: boolean;
  variant?: "contained" | "outlined";
  icon?: ComponentProps<typeof Feather>["name"];
}

export const Button = forwardRef<ButtonProps, any>((props, ref) => {
  const { children, variant, loading, icon, ...rest } = props;

  return (
    <ButtonContainer
      variant={variant}
      disabled={rest.disabled || loading}
      ref={ref}
      {...rest}
    >
      {icon && <Feather name={icon} size={24} color="#fff" />}
      <ButtonText variant={variant}>
        {loading ? <ActivityIndicator /> : children}
      </ButtonText>
    </ButtonContainer>
  );
});
