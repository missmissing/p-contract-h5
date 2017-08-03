export default {
  bootstrap(mock) {
    //获取标签列表
    mock.onGet('/template/module/list').reply(config => {

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            errcode: 200,
            msg: '成功',
            data: {
              modules: [
                {
                  Name: '测试动态表格',
                  Code: 'table',
                  Position: 'Top',
                  Type: 'H',
                  Sort: 0,
                  Content: '<table><tr><td>标题1</td><td>标题2</td></tr><tr v-for="item in materialsItems"><td>{{item.id}}</td><td>{{item.name}}</td></tr></table>测试头<br/> 服务表格<br/><table id="materials" border="1" cellspacing="0" cellpadding="5"><tr><td width="150"><b>物料编码</b></td><td  width="250"><b>物料名称</b></td><td width="100"><b>数量</b></td><td width="100"><b>含税单价</b></td><td width="100"><b>税率</b></td></tr>{行开始}<tr><td>&物料编码&</td><td>&物料名称&</td><td>&数量&</td><td>&含税单价&</td><td>&税率&</td></tr>{行结束}</table> 测试物资<br/><table id="service"><th><td>物料编号</td><td>物料名称</td><td>数量</td></th>{行开始}<tr><td>&物料编号&</td><td>&物料名称&</td><td>&数量&</td></tr>{行结束}</table> 测试'
                },
                {
                  Name: '头部(红星甲方)',
                  Code: 'header1',
                  Position: 'Top',
                  Type: 'H',
                  Sort: 1,
                  Content: '<p class="MsoNormal" align="left" style="line-height: 1.5;font-family:Microsoft YaHei;font-size: 14px;">甲<span lang="EN-US">&nbsp;&nbsp;</span>方：&红星公司名称&</p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">注册地址：&红星公司地址&<span lang="EN-US"><o:p></o:p></span></font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">法定代表人：&红星法人代表人&<span lang="EN-US"><o:p></o:p></span></font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">联系人：&红星联系人&<span lang="EN-US"><o:p></o:p></span></font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">联系电话：&红星联系电话&<span lang="EN-US"><o:p></o:p></span></font></p><p class="MsoNormal" align="left" style="margin-left: 141.25pt; text-indent: -141.25pt;"><font face="Microsoft YaHei"><br></font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">乙<span lang="EN-US">&nbsp;&nbsp;</span>方：&乙方公司名称&</font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><span style="font-size: 11pt;"><font face="Microsoft YaHei" style="font-size: 14px;">注册地址：&乙方公司地址&</font></span></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><span style="font-size: 11pt;"><font face="Microsoft YaHei" style="font-size: 14px;">法人代表人：&乙方法人代表人&</font></span></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><span style="font-size: 11pt;"><font face="Microsoft YaHei"><span style="font-size: 14px;">联系人：&乙方联系人&</span><span lang="EN-US"><o:p></o:p></span></font></span></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><span style="font-size: 11pt;"><font face="Microsoft YaHei" style="font-size: 14px;">联系电话：&乙方联系电话&</font></span></p><br/>'
                },
                {
                  Name: '头部(红星乙方)',
                  Code: 'header2',
                  Position: 'Top',
                  Type: 'H',
                  Sort: 2,
                  Content: '<p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">甲<span lang="EN-US">&nbsp;&nbsp;</span>方：&甲方公司名称&</font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">注册地址：&甲方公司地址&<span lang="EN-US"><o:p></o:p></span></font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">法定代表人：&甲方法人代表人&<span lang="EN-US"><o:p></o:p></span></font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">联系人：&甲方联系人&<span lang="EN-US"><o:p></o:p></span></font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">联系电话：&甲方联系电话&<span lang="EN-US"><o:p></o:p></span></font></p><p class="MsoNormal" align="left" style="margin-left: 141.25pt; text-indent: -141.25pt;"><font face="Microsoft YaHei"><br></font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><font face="Microsoft YaHei" style="font-size: 14px;">乙<span lang="EN-US">&nbsp;&nbsp;</span>方：&红星公司名称&</font></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><span style="font-size: 11pt;"><font face="Microsoft YaHei" style="font-size: 14px;">注册地址：&红星公司地址&</font></span></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><span style="font-size: 11pt;"><font face="Microsoft YaHei" style="font-size: 14px;">法人代表人：&红星法人代表人&</font></span></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><span style="font-size: 11pt;"><font face="Microsoft YaHei"><span style="font-size: 14px;">联系人：&红星联系人&</span><span lang="EN-US"><o:p></o:p></span></font></span></p><p class="MsoNormal" align="left" style="line-height: 1.5;"><span style="font-size: 11pt;"><font face="Microsoft YaHei" style="font-size: 14px;">联系电话：&红星联系电话&</font></span></p><br/>'
                },
                {
                  Name: '标的物',
                  Code: 'purchase_table',
                  Type: 'S',
                  Position: 'Top',
                  Sort: 3,
                  Content: ''
                },
                {
                  Name: '付款阶段',
                  Code: 'payment',
                  Type: 'S',
                  Position: 'Top',
                  Sort: 4,
                  Content: ''
                },
                {
                  Name: '尾部',
                  Code: 'footer',
                  Position: 'Bottom',
                  Type: 'F',
                  Sort: 1,
                  Content: '<br/><br/><br/><table style="border-spacing:0px; border-collapse:collapse;width:100%;margin:0px;border: 1px solid #fff; line-height: 20px; background-color: transparent;"><tbody><tr><td>甲方：</td><td>乙方：</td></tr><tr><td>法定代表人：<br></td><td>法定代表人：</td></tr><tr><td>日期：</td><td>日期：</td></tr></tbody></table><br/><br/>'
                },
              ],
              templateTags: [
                {
                  ModuleCode: 'purchase_table',
                  Code: 'purchase_table_1',
                  Content: '<table id="materials" border="1" style="text-indent:10px;border-collapse:collapse;width:100%;border: 1px solid #000; line-height: 20px; "><tr><td width="150"><b>物料编码</b></td><td  width="250"><b>物料名称</b></td><td width="100"><b>数量</b></td><td width="100"><b>含税单价</b></td><td width="100"><b>税率</b></td></tr>{行开始}<tr><td>&物料编码&</td><td>&物料名称&</td><td>&数量&</td><td>&含税单价&</td><td>&税率&</td></tr>{行结束}</table><br></p><p ><span >含税总价</span><span style="text-decoration:underline;"> &含税总价& </span>元整（RMB<span style="text-decoration:underline;"> &含税总价& </span>元）。</span></p><br/>',
                },
                {
                  ModuleCode: 'purchase_table',
                  Code: 'purchase_table_2',
//                Content:'<table class="MsoTableGrid" border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt; mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt"> <tbody><tr><td width="184" valign="top" style="width:138.25pt;border:solid windowtext 1.0pt;mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">服务项目</span><span lang="EN-US"><o:p></o:p></span></p></td><td width="184" valign="top" style="width:138.25pt;border:solid windowtext 1.0pt;border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">价格</span><span lang="EN-US"><o:p></o:p></span></p></td><td width="184" valign="top" style="width:138.3pt;border:solid windowtext 1.0pt;border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">税率</span><span lang="EN-US"><o:p></o:p></span></p></td> </tr> <tr><td width="184" valign="top" style="width:138.25pt;border:solid windowtext 1.0pt;border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal"><br></p></td><td width="184" valign="top" style="width:138.25pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal"><br></p></td><td width="184" valign="top" style="width:138.3pt;border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt"><p class="MsoNormal"><br></p></td> </tr></tbody></table><p class="MsoNormal"><br></p><p class="MsoNormal"></p><p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">含税总价</span><span lang="EN-US">______</span><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">元整（</span><span lang="EN-US">RMB_____</span><span style="font-family:宋体;mso-ascii-font-family:Calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">元）。</span></p><br/>'
                  Content: '<table id="materials" border="1" style="text-indent:10px;border-collapse:collapse;width:100%;border: 1px solid #000; line-height: 20px; "><tr><td width="150"><b>服务项目</b></td><td width="100"><b>单价</b></td><td width="100"><b>税率</b></td></tr>{行开始}<tr><td>&服务项目&</td><td>&单价&</td><td>&税率&</td></tr>{行结束}</table><br></p><p ><span >含税总价</span><span style="text-decoration:underline;"> &含税总价& </span>元整（RMB<span style="text-decoration:underline;"> &含税总价& </span>元）。</span></p><br/>',
                },
                {
                  ModuleCode: 'payment',
                  Code: 'payment_1',
//                Content:'<table class="MsoTableGrid" border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt; mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt"> <tbody><tr>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">付款金额</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">占比</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">付款时间</span></p>  </td>  <td width="111" valign="top" style="width:83.0pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">备注</span></p>  </td> </tr> <tr>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">预付款</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td>  <td width="111" valign="top" style="width:83.0pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td> </tr></tbody></table><br/><p>保证金<span style="text-decoration:underline;"> &保证金& </span>元整（RMB<span style="text-decoration:underline;"> &保证金& </span>元），占比<span style="text-decoration:underline;"> &占比& </span>。保证金支付时间<span style="text-decoration:underline;"> &保证金支付时间& </span>。</p><br/><br/><br/>'
                  Content: '<table id="payments" border="1" style="text-indent:10px;border-collapse:collapse;width:100%;border: 1px solid #000; line-height: 20px; "><tr>'
                  + '<td width="150"><b>类型</b></td>'
                  + '<td width="150"><b>付款金额</b></td>'
                  + '<td  width="250"><b>占比</b></td>'
                  + '<td width="100"><b>付款时间</b></td>'
                  + '<td width="100"><b>备注</b></td>'
                  + '</tr>'
                  + '{行开始}'
                  + '<tr>'
                  + '<td>&类型&</td>'
                  + '<td>&付款金额&</td>'
                  + '<td>&占比&</td>'
                  + '<td>&付款时间&</td>'
                  + '<td>&备注&</td>'
                  + '</tr>{行结束}</table><br>'
                  + '<p ><span >保证金</span><span style="text-decoration:underline;"> &保证金& </span><span >元整（RMB<span style="text-decoration:underline;"> &保证金& </span>元）,</span><span >保证金支付时间</span><span style="text-decoration:underline;"> &保证金支付时间& </span>。</p><br/>'
                },
                {
                  ModuleCode: 'payment',
                  Code: 'payment_2',
//                Content:'<table class="MsoTableGrid" border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt; mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt"> <tbody><tr>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">付款金额</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">占比</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">付款时间</span></p>  </td>  <td width="111" valign="top" style="width:83.0pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">备注</span></p>  </td> </tr> <tr>  <td width="111" valign="top" style="width:82.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span style="font-family:宋体;mso-ascii-font-family:Calibri;  mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:  minor-fareast;mso-hansi-font-family:Calibri;mso-hansi-theme-font:minor-latin">预付款</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td>  <td width="111" valign="top" style="width:82.95pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td>  <td width="111" valign="top" style="width:83.0pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">  <p class="MsoNormal"><span lang="EN-US">&nbsp;</span></p>  </td> </tr></tbody></table><br/>'
                  Content: '<table id="payments" border="1" style="text-indent:10px;border-collapse:collapse;width:100%;border: 1px solid #000; line-height: 20px; "><tr>'
                  + '<td width="150"><b>类型</b></td>'
                  + '<td width="150"><b>付款金额</b></td>'
                  + '<td  width="250"><b>占比</b></td>'
                  + '<td width="100"><b>付款时间</b></td>'
                  + '<td width="100"><b>备注</b></td>'
                  + '</tr>'
                  + '{行开始}'
                  + '<tr>'
                  + '<td>&类型&</td>'
                  + '<td>&付款金额&</td>'
                  + '<td>&占比&</td>'
                  + '<td>&付款时间&</td>'
                  + '<td>&备注&</td>'
                  + '</tr>{行结束}</table><br>'
                }
              ]
            }
          }]);
        }, 300);
      });
    });

  }
};
