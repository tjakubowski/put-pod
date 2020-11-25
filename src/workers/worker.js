addEventListener('message', async (event) => {
  const arrayToReverse = event.data.message.array;
  const reversedArray = arrayToReverse.reverse();

  postMessage(reversedArray);
});
