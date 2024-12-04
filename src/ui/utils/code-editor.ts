export function saveCodeToLocalStorage(challengeId: number, code: string) {
  localStorage.setItem(`code-${challengeId}`, code);
}

export function getCodeFromLocalStorage(challengeId: number) {
  return localStorage.getItem(`code-${challengeId}`);
}
