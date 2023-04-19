export function checkValidUsernameCharacters(word: string): boolean {
  for (let index = 0; index < word.length; index++) {
    const character = word[index];
    if (!character.match(/^[a-zA-Z0-9_\-]+$/)) {
      return false;
    }
  }
  return true;
}

export function checkValidNameCharacters(word: string): boolean {
  for (let index = 0; index < word.length; index++) {
    const character = word[index];
    if (!character.match(/^[a-zA-Z\-]+$/)) {
      return false;
    }
  }
  return true;
}
