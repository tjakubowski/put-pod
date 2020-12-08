export const bitsToGroups = (bitsString, groupSize = 8) => Array.from(
  { length: Math.ceil(bitsString.length / groupSize) },
  (v, i) => bitsString.slice(i * groupSize, i * groupSize + groupSize),
);

export const stringToBinary = (string) => [...string]
  .map((char) => char
    .charCodeAt(0)
    .toString(2)
    .substring(0, 8)
    .padStart(8, '0'))
  .join('');

export const isBinary = (string) => [...string].every((char) => ['0', '1'].includes(char));

export const bytesToString = (bytesArray) => bytesArray.map((byte) => String.fromCharCode(parseInt(byte, 2))).join('');
