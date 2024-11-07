import { TestResultProps } from "@/common/types/test";
import { create } from "zustand";

interface ChallengeState {
  result: TestResultProps | null;
  results: TestResultProps[];
  setResult: (result: TestResultProps) => void;
  setResults: (results: TestResultProps[]) => void;
}

export const useChallengeStore = create<ChallengeState>()((set) => ({
  result: null,
  results: [],
  setResult: (result) => set(() => ({ result })),
  setResults: (results) => set(() => ({ results })),
}));
