import { TestResult } from "@/common/types/test";
import { create } from "zustand";

interface ChallengeState {
  result: TestResult | null;
  results: TestResult[];
  setResult: (result: TestResult) => void;
  setResults: (results: TestResult[]) => void;
}

export const usechallengeStore = create<ChallengeState>()((set) => ({
  result: null,
  results: [],
  setResult: (result) => set(() => ({ result })),
  setResults: (results) => set(() => ({ results })),
}));
