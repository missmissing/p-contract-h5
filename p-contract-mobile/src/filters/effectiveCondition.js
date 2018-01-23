const status = {
  1: '附期限生效',
  2: '附条件生效',
  3: '签订生效'
};

export default type => status[type];
