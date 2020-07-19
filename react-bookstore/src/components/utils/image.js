import { stringToColour, getContrast } from "./color";

export const getDummyAvatarFromUsername = (username, size) => {
  const letter = username[0];
  const background = stringToColour(username);
  const textColor = getContrast(background);

  return `https://dummyimage.com/${size}x${size}/${background}/${textColor}&text=${letter}`;
};
