export default (structure, data) => {
  const result = {};
  Object.keys(structure).forEach((key) => {
    result[key] = data[key] || null;
  });
  return result;
};
