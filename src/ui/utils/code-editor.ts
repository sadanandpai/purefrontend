export function saveToLocalStorage(
  challengeId: number,
  code: string,
  userId = "anonymous"
) {
  localStorage.setItem(`${challengeId}-${userId}`, code);
}

export function getFromLocalStorage(challengeId: number, userId = "anonymous") {
  return localStorage.getItem(`${challengeId}-${userId}`);
}
