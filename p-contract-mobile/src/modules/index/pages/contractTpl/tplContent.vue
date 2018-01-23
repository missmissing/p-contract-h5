<style type="text/scss" lang="scss" scoped>
  .preview {
    padding: 15px;
    word-wrap: break-word;
    font-size: 11px;
    .title {
      text-align: center;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .header {
      margin-bottom: 20px;
      &:after {
        content: '';
        clear: both;
        display: table;
      }
    }
    .content {
      white-space: pre-wrap;
      .ql-align-right {
        text-align: right;
      }
      .ql-align-justify {
        text-align: justify;
        text-align-last: justify;
      }
      .ql-align-center {
        text-align: center;
      }
    }
    .footer {
      margin-top: 20px;
    }
  }
</style>

<template>
  <div>
    <div class="preview">
      <div class="title">合同</div>
      <div v-html="header" class="header"></div>
      <div v-html="content" class="content"></div>
      <div v-html="footer" class="footer"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        header: '',
        content: '',
        footer: ''
      };
    },
    methods: {
      setData() {
        const {contentModule, content} = this.info;
        this.content = content;
        const header = [];
        const footer = [];
        contentModule.forEach((module) => {
          if (module.moduleType === 'HEAD') {
            header.push(module.moduleContent);
          } else if (module.moduleType === 'TAIL') {
            footer.push(module.moduleContent);
          }
        });
        this.header = header.join('');
        this.footer = footer.join('');
      }
    },
    watch: {
      info() {
        this.setData();
      }
    }
  };
</script>
