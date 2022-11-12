export type AnswerQuestionModel = {
  id: number;
  answer: string;
  iscorrect: boolean;
  createdAt: Date;
  updatedAt: Date;
  questionId: number;
  typeQuestionId: number;
};
