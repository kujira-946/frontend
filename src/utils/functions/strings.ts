export function checkValidCharacters(word: string): boolean {
  for (let index = 0; index < word.length; index++) {
    const character = word[index];
    if (!character.match(/^[a-zA-Z0-9_\-]+$/)) {
      return false;
    }
  }
  return true;
}
