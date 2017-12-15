const map = {
  1: '公章',
  2: '法人章'
};

export default arr => arr.map((item) => map[item]).join(',');
