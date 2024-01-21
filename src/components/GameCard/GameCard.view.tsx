import { View } from "react-native";
import { Game } from "../../interfaces/Game";
import {
  GameCardContainer,
  GameQuestionsQuantity,
  GameTitle,
} from "./GameCard.styles";
import { Link } from "expo-router";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/view-game/${game.id}`} asChild>
      <GameCardContainer>
        <View>
          <GameTitle>{game.title}</GameTitle>
          <GameQuestionsQuantity>
            {game.questions.length} pergunta{game.questions.length > 1 && "s"}
          </GameQuestionsQuantity>
        </View>
      </GameCardContainer>
    </Link>
  );
}
