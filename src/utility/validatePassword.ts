const symbols = ['!', '@', '#', '$', '%', '^', '&', '*'];

const isSymbolIncludes = (character: string): boolean => {
  return symbols.includes(character);
};

export const hasRequiredSymbol = (password: string) => {
  const passwordArray = password.split('');
  return passwordArray.some(isSymbolIncludes);
};

export const hasAtLeastOneNumber = (password: string): boolean => {
  const isMatch = password.match(/([0-9]+)/);
  return !!isMatch;
};
