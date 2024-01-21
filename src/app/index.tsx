import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { EmptyState } from "../components/EmptyState/EmptyState.view";
import { Title } from "../components/Title/Title.view";
import { Game } from "../interfaces/Game";
import { GameCard } from "../components/GameCard/GameCard.view";
import { IconButton } from "../components/IconButton/IconButton.view";
import { Link, router } from "expo-router";

export default function HomeScreen() {
  const [games, setGames] = React.useState<Game[]>([]);

  async function fetchGames() {
    const games = await AsyncStorage.getItem("@trivia-ai/created-games");

    if (games) {
      setGames(JSON.parse(games));
    }
  }

  React.useEffect(() => {
    fetchGames();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Title>Jogos criados</Title>
          <Link href="/new-game" asChild>
            <IconButton size={30} icon="plus-circle" color="#7B66FF" />
          </Link>
        </View>
        <View style={{ height: 8 }} />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCard game={item} />}
          ListEmptyComponent={
            <EmptyState
              title="Nenhum jogo criado"
              text="Comece criando seu primeiro jogo"
              action={{
                text: "Criar novo jogo",
                onPress: () => router.push("/new-game"),
              }}
            />
          }
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          style={styles.flatList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 16,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
});
