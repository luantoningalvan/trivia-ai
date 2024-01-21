export interface FinishedGame {
  id: string;
  game_id: string;
  time: number;
  totalQuestions: number;
  rightAnswers: number;
  wrongAnswers: number;
  date: string;
}
