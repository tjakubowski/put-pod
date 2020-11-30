const bitsToBytes = (bitsString, groupSize = 8) => Array.from({ length: Math.ceil(bitsString.length / groupSize) },
  (v, i) => bitsString.slice(i * groupSize, i * groupSize + groupSize));

const stringToBinary = (string) => [...string]
  .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
  .join('');

const isBinary = (string) => [...string].every((char) => ['0', '1'].includes(char));

const bytesToString = (bytesArray) => bytesArray.map((byte) => String.fromCharCode(parseInt(byte, 2))).join('');

export {
  bitsToBytes, stringToBinary, isBinary, bytesToString,
};
