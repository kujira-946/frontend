export function checkIsLetter(word: string): boolean {
  for (let index = 0; index < word.length; index++) {
    const character = word[index];
    if (!character.match(/[a-z]/i)) {
      return false;
    }
  }
  return true;
}
