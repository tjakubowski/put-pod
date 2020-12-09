import { bitsToGroups } from '../utils/binary';

const validate = (bits) => {
  if (bits.length !== 20000) throw new Error('The bit string must be 20000 characters long');
};

export const testMonoBit = (bits) => {
  validate(bits);

  const onesCount = [...bits].reduce((sum, bit) => +bit + sum, 0);
  return { result: onesCount, passed: onesCount > 9725 && onesCount < 10275 };
};

export const testRuns = (bits, bit = 1) => {
  validate(bits);

  const series = [
    { count: 0, min: 2315, max: 2685 },
    { count: 0, min: 1114, max: 1386 },
    { count: 0, min: 527, max: 723 },
    { count: 0, min: 240, max: 384 },
    { count: 0, min: 103, max: 209 },
    { count: 0, min: 103, max: 209 },
  ];

  const regex = new RegExp(`${bit}+`, 'mg');

  [...bits.matchAll(regex)].forEach((group) => {
    const seriesIndex = Math.min(group[0].length, series.length) - 1;
    series[seriesIndex].count++;
  });

  const passed = series.every(({ count, min, max }) => count >= min && count <= max);

  return { result: series, passed };
};

export const testLongRuns = (bits) => {
  validate(bits);

  const regex = /((0){26,}|(1){26,})/mg;
  const longRunsCount = [...bits.matchAll(regex)].length;

  return { result: longRunsCount, passed: longRunsCount === 0 };
};

export const testPoker = (bits) => {
  validate(bits);

  const segments = bitsToGroups(bits, 4);
  const segmentsCount = new Array(16).fill(0);

  segments.forEach((segment) => {
    const number = parseInt(segment, 2);
    segmentsCount[number]++;
  });

  const result = (16 / 5000) * segmentsCount.reduce((sum, count) => sum + count * count, 0) - 5000;
  const resultRounded = Math.round((result + Number.EPSILON) * 100) / 100;

  return { result: resultRounded, passed: result > 2.16 && result < 46.17 };
};
