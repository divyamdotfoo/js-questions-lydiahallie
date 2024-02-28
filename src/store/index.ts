import { Question } from "@/lib/parser";
import { create } from "zustand";

export interface QuestionStore {
  question: Question | null;
  setQuestion: (ques: Question) => void;
}

export const useQuestion = create<QuestionStore>((set) => ({
  question: null,
  setQuestion: (q) => set((s) => ({ question: q })),
}));

export interface Main {
  currentIndex: number;
  incrementIndex: () => void;
  decrementIndex: () => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  setIndex: (index: number) => void;
}

export const useMain = create<Main>((set) => ({
  currentIndex: 0,
  setIndex: (i) => set((s) => ({ currentIndex: i })),
  incrementIndex: () =>
    set((s) => ({ currentIndex: (s.currentIndex + 1) % s.questions.length })),
  decrementIndex: () =>
    set((s) => ({
      currentIndex: s.currentIndex - 1 < 0 ? 0 : s.currentIndex - 1,
    })),
  questions: [],
  setQuestions: (questions) => set((s) => ({ questions: questions })),
}));
