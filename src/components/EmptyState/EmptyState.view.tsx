import { Button } from "../Button/Button.view";
import {
  EmptyStateContainer,
  EmptyStateText,
  EmptyStateTitle,
} from "./EmptyState.styles";
import { Link } from "expo-router";

interface EmptyStateProps {
  title: string;
  text: string;
  action?: {
    text: string;
    onPress: () => void;
  };
}

export function EmptyState(props: EmptyStateProps) {
  const { title, text, action } = props;

  return (
    <EmptyStateContainer>
      <EmptyStateTitle>{title}</EmptyStateTitle>
      <EmptyStateText>{text}</EmptyStateText>
      {action && (
        <Button fullWidth onPress={action.onPress}>
          {action.text}
        </Button>
      )}
    </EmptyStateContainer>
  );
}
