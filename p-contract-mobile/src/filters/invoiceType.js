const invoiceType = {
  1: '增值税专用发票',
  2: '增值税普通发票'
}

export default type => invoiceType[type]
