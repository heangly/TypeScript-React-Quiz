export const shuffleArray = (arr: any[]) => {
  return [...arr].sort(() => Math.random() - 0.5);
}

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & {answers : string[]};

