export default {
  data: [],
  pairs: [],
  addData(id, params) {
    this.data.push({
      id: id,
      params: params
    });
  },
  getRepalceHtml(html) {
    const tables = this.getTables(html);
    tables.forEach(table => {
      this.extractTable(table);
      html = html.replace(table.html, table.repalceHtml);
    });
    return html;
  },
  extractTable(table) {
    let datatable = this.data.find(m => {
      return m.id === table.id
    });
    if (!datatable) {
      table.repalceHtml = table.html;
      return;
    }

    let regRow = /\{行开始\}(.*)\{行结束\}/;
    let targetHtml = table.html;
    if (regRow.test(table.html)) {
      let r = table.html.match(regRow);
      let replaceSourceHtml = r[0];
      let repeatRow = r[1];
      let replaceTargetHtml = '';
      switch (table.id) {
        case 'materials':
          datatable.params.forEach(row => {
            replaceTargetHtml += repeatRow.replace('&物料编码&', row.id)
              .replace('&物料名称&', row.name)
              .replace('&服务项目&', row.name)
              .replace('&数量&', row.quantity)
              .replace('&含税单价&', row.price)
              .replace('&单价&', row.price)
              .replace('&税率&', row.tax);
          });
          break;
        case 'payments':
          datatable.params.forEach(row => {
            replaceTargetHtml += repeatRow.replace('&类型&', row.type)
              .replace('&付款金额&', row.amount)
              .replace('&占比&', row.percent)
              .replace('&付款时间&', row.payTime)
              .replace('&备注&', row.description);
          });
          break;
        default:
          break;
      }
      targetHtml = table.html.replace(replaceSourceHtml, replaceTargetHtml);
    }
    table.repalceHtml = targetHtml;
  },
  getTables(html) {
    let tables = [];
    let index = 0;
    while (html.indexOf('</table>', index) > -1) {
      let temp = html.substring(0, html.indexOf('</table>', index) + 8);
      let reg = /<table.*id=\"([a-zA-Z_\-]*)\".*>.*<\/table>/i;
      if (reg.test(temp)) {
        let r = temp.match(reg);
        tables.push({
          id: r[1],
          html: r[0]
        });
      }
      html = html.substring(temp.length, html.length);
    }
    return tables;
  },
  replaceAll(html, pairs) {
    pairs.forEach(p => {
      html = html.replace(p.source, p.target);
    });
    return html;
  }
}
