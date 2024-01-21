export interface Answer {
  id: string;
  answer: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  answers: Answer[];
}

export interface Game {
  id: string;
  title: string;
  questions: Question[];
}
