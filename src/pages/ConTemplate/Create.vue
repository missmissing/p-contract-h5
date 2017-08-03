<style scoped>
  .title {
    text-align: right;
    padding-right: 10px;
  }

  .multiple_select {
    margin-top: 10px;
    border: solid 1px #dddee1;
    border-radius: 4px;
  }

  .multiple_select li {
    margin: 0;
    padding-left: 10px;
    border-bottom: solid 1px #dddee1;
  }

  .template-preview {
    border: solid 1px #dddee1;
    padding: 10px;
    margin-left: 20px;
  }

  #editTemplate {
    position: relative;
    top: 0;
  }

  .form-enter-active {

    transition: transform 0.5s;
  }

  .form-enter {
    transform: rotate(180deg)
  }

  .form-leave-active {
    transition: opacity 0.5s
  }

  .form-leave-to {
    opacity: 0;
  }

  .template-enter-active {
    transition: transform 0.5s;
    transition-delay: 0.5s;
  }

  .template-enter {
    transform: rotate(180deg);
  }

  .template-leave-active {
    transition: opacity 0.5s
  }

  .template-leave-to {
    opacity: 0;
  }

</style>
<template>
  <div>
    <transition name="form">
      <Form :label-width="80" v-show="!editTemplate.show">
        <Form-item label="文本类型">
          <Row>
            <Col span="8">
            <Select placeholder="请选择">
              <Option value="template">合同模板</Option>
              <Option value="text">文本</Option>
            </Select>
            </Col></Row>
        </Form-item>
        <Form-item label="文本名称">
          <Row>
            <Col span="8">
            <Input placeholder="请输入" v-model="formItem.title"/>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="文本编号">
          <Row>
            <Col span="8">
            <Input placeholder="请输入"/>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="启用时间">
          <Row>
            <Col span="8">
            <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"/>
            </Col>
            <Col span="2" style="text-align:center;padding-right:10px;">
            至
            </Col>
            <Col span="8">
            <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"/>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="业务类型">
          <Row>
            <Col span="6">
            <Cascader :data="baseData" trigger="hover"/>
            </Col>
            <Col span="2">
            <Button icon="plus-round" style="margin-left:10px">添加</Button>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <ul class="multiple_select">
              <li>123
                <Button type="text" icon="close" style="float:right;"></Button>
              </li>
              <li>123
                <Button type="text" icon="close" style="float:right;"></Button>
              </li>
              <li>123
                <Button type="text" icon="close" style="float:right;"></Button>
              </li>
            </ul>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="使用说明">
          <Row>
            <Col span="18">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
                   placeholder="请输入..."/>
            </Col>
          </Row>
        </Form-item>

        <Form-item>
          <Button @click="editTemplate.show=true" type="info">添加模板</Button>
        </Form-item>
      </Form>
    </transition>
    <transition name="template">
      <Form id="editTemplate" v-show="editTemplate.show">
        <table>
          <tr>
            <td>标题1</td>
            <td>标题2</td>
          </tr>
          <tr v-for="item in materialsItems">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
          </tr>
        </table>
        <Row>
          <Col span="10">
          <Form :label-width="0">
            <Form-item>
              <Radio-group type="button" v-model="template_module" @on-change="template_module_change">
                <Radio label="1">自定义</Radio>
                <Radio label="2">模板一</Radio>
                <Radio label="3">模板二</Radio>
                <Radio label="4">模板三</Radio>
              </Radio-group>

            </Form-item>
            <Form-item>
              <Transfer
                :data="transferTemplate.data"
                :target-keys="transferTemplate.targetKeys"
                filterable
                :filter-method="transferFilter"
                :render-format="transferTemplateRender"
                :titles="transferTemplate.titles"
                @on-change="transferModuleChange"></Transfer>
            </Form-item>
            <Form-item>
              <vue-html5-editor :content="editTemplate.content" :height="300"
                                @change="updateTemplateContent"/>
            </Form-item>
            <Form-item style="text-align:center">
              <Button @click="" type="primary" size="large">提交</Button>
              <Button @click="editTemplate.show=false" type="dashed">取消</Button>
            </Form-item>
          </Form>
          </Col>
          <Col span="14">
          <h3 style="padding-left:20px;"> 预览</h3>
          <div class="template-preview" v-html="templatePreview">
          </div>
          </Col>
        </Row>
      </Form>
    </transition>
  </div>

</template>

<script>
  import api from '../../api'
  import tagService from '../../services/template/tag.js'
  import templateReplace from '../../common/templateReplace.js'

  export default {
    data() {
      return {
        materialsItems: [{id: 123, name: "1ewtewt"}, {id: 321, name: "tgreg"},],
        templateState: {
          categories: ['purchase_table_1', 'payment_1']
        },
        source: {
          templateTags: []
        },
        template_module: '4',
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: '',
          title: '联合扶持品牌经销商营销活动协议'
        },
        editTemplate: {
          show: false,
          header: '',
          content: '',
          footer: ''
        },
        transferTemplate: {
          data: [],//this.getModuleList(),
          targetKeys: [],
          titles: ['模板组合', '已选择模板']
        },
        baseData: [{
          value: 'beijing',
          label: '一般物资类',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '服务类',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                  children: [
                    {
                      value: 'level4',
                      label: '4级测试',
                    }
                  ]
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ],
        }]
      }
    },
    computed: {
      count() {
        console.log(this.$store.state.count);
        return this.$store.state.count;
      },
      templatePreview() {
        return tagService.template_preview('<div style="filter:alpha(Opacity=50);-moz-opacity:0.5;opacity: 0.5;"><h2 style="text-align:center;">' + this.formItem.title + '</h2><br/><br/>' + this.editTemplate.header + '</div>'
          + this.formatTemplateContent(this.editTemplate.content)
          + this.editTemplate.footer);
      },
    },
    mounted: function () {
      let $self = this;
      $self.getModuleList();
      this.refreshTemplate();
      //console.log(this.$store.state.user.test);

    },
    methods: {
      transferTemplateRender(item) {
        return item.label;
      },
      transferModuleChange(newTargetKeys, direction, moveKeys) {
        this.transferTemplate.targetKeys = newTargetKeys;
        this.refreshTemplate();
      },
      refreshTemplate() {
        const newTargetItems = [];
        this.transferTemplate.targetKeys.forEach(key => {
          newTargetItems.push(this.transferTemplate.data.find((m) => {
              return m.key === key
            })
          );
        });
        newTargetItems.sort(m => {
          return m.sort
        });

        this.editTemplate.header = '';
        this.editTemplate.footer = '';
        const templateTags = this.source.templateTags;

        newTargetItems.forEach(m => {
          if (m.type === 'H')
            this.editTemplate.header += m.content;
          else if (m.type === 'F')
            this.editTemplate.footer += m.content;
          else if (m.type === 'S') {
            this.templateState.categories.forEach(c => {
              //console.log(m.key);
              const item = templateTags.find(t => {
                return c === t.Code && m.key === t.ModuleCode;
              });
              //console.log(item);
              if (item) {
                if (m.position === 'Top')
                  this.editTemplate.header += item.Content;
                else
                  this.editTemplate.footer += item.Content;
              }
            });
          }
        });
      },
      updateTemplateContent(data) {
        // sync content to component
        console.log(data);
        this.$store.state.count += 1;
        this.editTemplate.content = data;
      },
      formatTemplateContent(content) {
        return '<div style="border:dashed 1px gray;padding:5px;">' + content + '</div>';
      },
      transferFilter(data, query) {
        return data.label.indexOf(query) > -1;
      },
      getModuleList() {
        const $self = this;

        api.getTemplateModuleList({}).then((res) => {

          $self.transferTemplate.data = res.data.data.modules.map(function (el) {

            return {
              key: el.Code,
              label: el.Name,
              disabled: false,
              content: el.Content,
              sort: el.Sort,
              type: el.Type,
              position: el.Position,
            };
          });

          $self.source.templateTags = res.data.data.templateTags;

          //测试
          const item = res.data.data.modules.find(t => {
            return 'table' === t.Code;
          });
          const html = item.Content;
          templateReplace.addData("materials", [
            {
              id: '00000012321321',
              name: '笔记本',
              description: '联想笔记本T650',
              quantity: 2,
              price: 1200.00,
              tax: '6%',
            },
            {
              id: '000000123228901',
              name: '打印机',
              description: 'HP打印机，X999',
              quantity: 1,
              price: 670.00,
              tax: '17%',
            },
          ]);
          this.editTemplate.content = templateReplace.getRepalceHtml(html);
        });

      },
      template_module_change() {
        switch (this.template_module) {
          case '1':
            this.transferTemplate.targetKeys = [];
            break;
          case '2':
            this.transferTemplate.targetKeys = ['header1', 'footer'];
            break;
          case '3':
            this.transferTemplate.targetKeys = ['payment', 'header1', 'footer'];
            break;
          case '4':
          default:
            this.transferTemplate.targetKeys = ['payment', 'purchase_table', 'header1', 'footer'];
            break;
        }
        this.refreshTemplate();

      }
    }
  }
</script>
