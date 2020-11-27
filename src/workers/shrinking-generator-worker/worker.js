import registerPromiseWorker from 'promise-worker/register';
import LFSR from '@/components/algorithms/lfsr';

registerPromiseWorker(({ bits, lfsr }) => {
  const lfsrA = new LFSR(lfsr.a.initialState, lfsr.a.polynomial);
  const lfsrS = new LFSR(lfsr.s.initialState, lfsr.s.polynomial);

  let generatedBits = 0;
  let result = '';

  while (generatedBits < bits) {
    const a = lfsrA.tick();
    const s = lfsrS.tick();

    if (s === 1) {
      result = a + result;
      generatedBits++;
    }
  }

  return {
    result,
    lfsr: {
      a: {
        state: lfsrA.state,
      },
      s: {
        state: lfsrS.state,
      },
    },
  };
});
