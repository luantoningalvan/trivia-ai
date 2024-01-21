import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Content,
  CorrectCount,
  CurrentQuestion,
  Dot,
  FinishedContainer,
  FinishedCount,
  FinishedMessage,
  GameQuestionsQuantity,
  Header,
  Option,
  OptionText,
  Options,
  QuestionContainer,
  QuestionText,
  TimePassed,
} from "./styles";
import { Answer, Game } from "../../../interfaces/Game";
import { useGlobalSearchParams } from "expo-router";
import { ActivityIndicator, Alert, View } from "react-native";
import { IconButton } from "../../../components/IconButton/IconButton.view";
import { secondsToMinutes } from "../../../utils/secondsToMinutes";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button } from "../../../components/Button/Button.view";
import { generateId } from "../../../utils/generateId";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlayScreen() {
  const { id } = useGlobalSearchParams();

  const insets = useSafeAreaInsets();

  const [loading, setLoading] = React.useState(true);
  const [game, setGame] = React.useState<Game | null>(null);

  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  const [timePassed, setTimePassed] = React.useState(0);
  const [finishedGame, setFinishedGame] = React.useState(false);

  const [rightAnswers, setRightAnswers] = React.useState(0);
  const [wrongAnswers, setWrongAnswers] = React.useState(0);

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleFinishGame = async (
    game: Game,
    time: number,
    right: number,
    wrong: number
  ) => {
    const currentFinishedGames = await AsyncStorage.getItem(
      "@trivia-ai/finished-games"
    );

    const parsedFinishedGames = JSON.parse(currentFinishedGames || "[]");

    await AsyncStorage.setItem(
      "@trivia-ai/finished-games",
      JSON.stringify([
        ...parsedFinishedGames,
        {
          id: generateId(),
          game_id: game.id,
          time: time,
          totalQuestions: game.questions.length,
          rightAnswers: right,
          wrongAnswers: wrong,
          date: Date.now(),
        },
      ])
    );

    setFinishedGame(true);
  };

  async function handleAnswer(answer: Answer) {
    setShowResult(true);
    setSelectedAnswer(answer);

    if (answer.isCorrect) {
      setRightAnswers((state) => state + 1);
    } else {
      setWrongAnswers((state) => state + 1);
    }

    const currentTime = timePassed;

    setTimeout(() => {
      setShowResult(false);

      if (currentQuestion === game?.questions.length - 1) {
        handleFinishGame(
          game,
          currentTime,
          rightAnswers + (answer.isCorrect ? 1 : 0),
          wrongAnswers + (!answer.isCorrect ? 1 : 0)
        );
        return;
      }

      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
    }, 1000);
  }

  function giveUp() {
    Alert.alert(
      "Finalizar jogo",
      "Você tem certeza que deseja finalizar o jogo?",
      [
        {
          text: "Sim",
          onPress: () => {
            setFinishedGame(true);
            router.push("/");
          },
        },
        {
          text: "Não",
        },
      ]
    );
  }

  function resetGame() {
    setCurrentQuestion(0);
    setTimePassed(0);
    setRightAnswers(0);
    setWrongAnswers(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setFinishedGame(false);
  }

  React.useEffect(() => {
    if (finishedGame) return;

    intervalRef.current = setInterval(() => {
      setTimePassed((timePassed) => timePassed + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [finishedGame]);

  React.useEffect(() => {
    async function fetchGame() {
      try {
        setLoading(true);
        const games = await AsyncStorage.getItem("@trivia-ai/created-games");

        const parsedGames = games ? JSON.parse(games) : [];

        const game = parsedGames.find((game: Game) => game.id === id);

        if (game) {
          setGame(game);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar o jogo");
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (finishedGame) {
    return (
      <FinishedContainer>
        <StatusBar translucent />
        <Feather name="check-circle" color="#7B66FF" size={56} />
        <FinishedMessage>Você terminou o jogo!</FinishedMessage>

        <FinishedCount>
          <CorrectCount>
            <Feather name="check" color="#000" size={24} />
            <GameQuestionsQuantity>
              {`${rightAnswers} ${rightAnswers === 1 ? "correta" : "corretas"}`}{" "}
            </GameQuestionsQuantity>
          </CorrectCount>

          <CorrectCount>
            <Feather name="x" color="#000" size={24} />
            <GameQuestionsQuantity>
              {`${wrongAnswers} ${
                wrongAnswers === 1 ? "incorreta" : "incorretas"
              }`}{" "}
            </GameQuestionsQuantity>
          </CorrectCount>
        </FinishedCount>

        <Button fullWidth onPress={resetGame}>
          Jogar novamente
        </Button>
        <Button fullWidth variant="outlined" onPress={() => router.push("/")}>
          Voltar para o início
        </Button>
      </FinishedContainer>
    );
  }

  return (
    <Container>
      <Header style={{ paddingTop: insets.top + 16 }}>
        <View style={{ width: 50 }}>
          <IconButton onPress={giveUp} icon="x" color="#fff" />
        </View>

        <CurrentQuestion>
          {game.questions.map((question, index) => (
            <Dot
              active={currentQuestion === index}
              passed={currentQuestion >= index}
              key={question.id}
            />
          ))}
        </CurrentQuestion>

        <TimePassed>{secondsToMinutes(timePassed)}</TimePassed>
      </Header>

      <QuestionContainer>
        <QuestionText>{game.questions[currentQuestion].question}</QuestionText>
      </QuestionContainer>

      <Content>
        <Options>
          {game.questions[currentQuestion].answers.map((answer) => {
            const isThisAnswerSelected = selectedAnswer?.id === answer.id;

            return (
              <Option
                showCorrect={
                  showResult && isThisAnswerSelected && answer.isCorrect
                }
                showIncorrect={
                  showResult && isThisAnswerSelected && !answer.isCorrect
                }
                key={answer.id}
                onPress={() => handleAnswer(answer)}
                disabled={showResult}
              >
                <OptionText white={isThisAnswerSelected && !answer.isCorrect}>
                  {answer.answer}
                </OptionText>
              </Option>
            );
          })}
        </Options>
      </Content>
    </Container>
  );
}
