// 非负数
export const nonNegative = (val) => {
  const reg = new RegExp(/^(\+)?\d+(\.\d+)?$/);
  return reg.test(val);
};

//正整数
export const greaterZero = (val) => {
  const reg = new RegExp(/(^\+?[1-9][0-9]*$)|(^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$)/);
  return reg.test(val);
};
