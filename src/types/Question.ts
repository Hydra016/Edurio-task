export type MultipleChoiceQuestionOption = {
  title: string;
  selected: boolean;
};

export type MultipleChoiceQuestion = {
  id: number;
  type: string;
  title: string;
  options: MultipleChoiceQuestionOption[];
};

export type OpenQuestion = {
  id: number;
  type: string;
  title: string;
  options: null;
};

export type Question = OpenQuestion | MultipleChoiceQuestion;
