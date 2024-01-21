import { View } from "react-native";
import {
  CorrectCount,
  FinishedGameCardContainer,
  Footer,
  GameQuestionsQuantity,
  GameTitle,
  InfoBlock,
  WrongCount,
} from "./FinishedGameCard.styles";
import { FinishedGame } from "../../interfaces/FinishedGame";
import { Feather } from "@expo/vector-icons";
import { secondsToMinutes } from "../../utils/secondsToMinutes";
import { formatGameDate } from "../../utils/formatGameDate";

interface FinishedGameCardProps {
  game: FinishedGame;
}

export function FinishedGameCard({ game }: FinishedGameCardProps) {
  return (
    <FinishedGameCardContainer>
      <GameTitle>{formatGameDate(new Date(game.date))}</GameTitle>

      <Footer>
        <CorrectCount>
          <Feather name="check" color="#000" size={20} />
          <GameQuestionsQuantity>{game.rightAnswers}</GameQuestionsQuantity>
        </CorrectCount>

        <WrongCount>
          <Feather name="x" color="#000" size={20} />
          <GameQuestionsQuantity>{game.wrongAnswers}</GameQuestionsQuantity>
        </WrongCount>
        <InfoBlock style={{ justifyContent: "flex-end" }}>
          <Feather name="clock" color="#1d1d1d" size={20} />
          <GameQuestionsQuantity>
            {secondsToMinutes(game.time)}
          </GameQuestionsQuantity>
        </InfoBlock>
      </Footer>
    </FinishedGameCardContainer>
  );
}
