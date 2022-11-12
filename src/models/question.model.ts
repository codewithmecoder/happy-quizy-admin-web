import { AnswerQuestionModel } from './answerQuestion.model';

export type QuestionModel = {
  id: number;
  content: string;
  answerQuestions: AnswerQuestionModel[];
  createdAt: Date;
  updatedAt: Date;
  typeQuestionId: number;
};
