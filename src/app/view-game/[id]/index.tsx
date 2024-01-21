import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Content,
  FinishedGameSection,
  FinishedGamesTitle,
  Header,
  InfoBlock,
  QuestionsCount,
} from "./styles";
import { Title } from "../../../components/Title/Title.view";
import { IconButton } from "../../../components/IconButton/IconButton.view";
import { router, useGlobalSearchParams } from "expo-router";
import { Game } from "../../../interfaces/Game";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";
import { Button } from "../../../components/Button/Button.view";
import { FinishedGame } from "../../../interfaces/FinishedGame";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FinishedGameCard } from "../../../components/FinishedGameCard/FinishedGameCard.view";
import { Feather } from "@expo/vector-icons";
import { EmptyState } from "../../../components/EmptyState/EmptyState.view";

export default function ViewGame() {
  const { id } = useGlobalSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [game, setGame] = React.useState<Game | null>(null);
  const [finishedGames, setFinishedGames] = React.useState<FinishedGame[]>([]);

  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    async function fetchGame() {
      try {
        setLoading(true);
        const games = await AsyncStorage.getItem("@trivia-ai/created-games");
        const fetchFinishedGames = await AsyncStorage.getItem(
          "@trivia-ai/finished-games"
        );

        const parsedGames = games ? JSON.parse(games) : [];
        const parsedFinishedGames = fetchFinishedGames
          ? JSON.parse(fetchFinishedGames)
          : [];

        const game = parsedGames.find((game: Game) => game.id === id);

        if (!game) throw new Error("Jogo não encontrado");

        const currentFinishedGames: FinishedGame[] = parsedFinishedGames.filter(
          (finishedGame: FinishedGame) => finishedGame.game_id === id
        );

        const sortedFinishedGames = currentFinishedGames.sort((a, b) => {
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
          return 0;
        });

        setGame(game);
        setFinishedGames(sortedFinishedGames);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar o jogo");
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, []);

  const handleClearFinishedGames = React.useCallback(() => {
    Alert.alert(
      "Aviso",
      "Você tem certeza que deseja limpar os jogos finalizados?",
      [
        {
          text: "Sim",
          onPress: async () => {
            try {
              await AsyncStorage.setItem(
                "@trivia-ai/finished-games",
                JSON.stringify([])
              );
              setFinishedGames([]);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível limpar os jogos");
            }
          },
        },
        {
          text: "Não",
        },
      ]
    );
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <Header style={{ paddingTop: insets.top + 16 }}>
        <IconButton icon="chevron-left" onPress={router.back} />
        <Title ellipsizeMode="clip">{game.title}</Title>

        <InfoBlock>
          <Feather color="#000" name="list" size={18} />
          <QuestionsCount>{game.questions.length} perguntas</QuestionsCount>
        </InfoBlock>

        <Button
          onPress={() => router.push(`/play/${game.id}`)}
          icon="play-circle"
        >
          Jogar
        </Button>
      </Header>

      <Content>
        {finishedGames.length > 0 && (
          <FinishedGameSection>
            <FinishedGamesTitle>Jogos finalizados</FinishedGamesTitle>
            <IconButton
              icon="trash"
              size={20}
              onPress={handleClearFinishedGames}
            />
          </FinishedGameSection>
        )}

        <FlatList
          data={finishedGames}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => <FinishedGameCard game={item} />}
          ListEmptyComponent={
            <EmptyState
              title="Nenhum jogo finalizado"
              text="Quando você finalizar um jogo ele irá aparecer aqui"
            />
          }
        />
      </Content>
    </>
  );
}
