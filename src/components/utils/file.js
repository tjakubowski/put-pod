export default (file, callback) => {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ({ target }) => callback(target.result);
  reader.readAsText(file);
};
