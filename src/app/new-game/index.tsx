import React from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Title } from "../../components/Title/Title.view";
import { SafeAreaView } from "react-native";
import { Button } from "../../components/Button/Button.view";
import { TextInput } from "react-native-gesture-handler";
import { IconButton } from "../../components/IconButton/IconButton.view";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Game } from "../../interfaces/Game";
import { generateId } from "../../utils/generateId";
import axios from "axios";

export default function NewGameScreen() {
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");

  const handleGenerateQuestions = async () => {
    try {
      setLoading(true);

      const completion = await axios.post("http://192.168.1.2:3000/generate", {
        text,
      });

      const currentGames = await AsyncStorage.getItem(
        "@trivia-ai/created-games"
      );
      const parsedCurrentGames = currentGames ? JSON.parse(currentGames) : [];
      const newGames = [...parsedCurrentGames, completion.data];
      await AsyncStorage.setItem(
        "@trivia-ai/created-games",
        JSON.stringify(newGames)
      );

      router.push("/");
    } catch (error) {
      Alert.alert("Erro ao gerar perguntas", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.header}>
              <IconButton onPress={router.back} icon="arrow-left" />
              <Title>Novo jogo</Title>
            </View>

            <View style={styles.textareaContainer}>
              <TextInput
                style={styles.textarea}
                multiline
                placeholder="Conteúdo a ser perguntado"
                placeholderTextColor="#999"
                value={text}
                onChangeText={setText}
                inputMode="text"
                onSubmitEditing={handleGenerateQuestions}
                returnKeyType="done"
              />
            </View>
            <Button onPress={handleGenerateQuestions} loading={loading}>
              Gerar perguntas
            </Button>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  textareaContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fafafa",
    flex: 1,
  },
  textarea: {
    textAlignVertical: "top",
    fontSize: 16,
    height: "100%",
  },
});
