<template>
  <div>
    <div class="toolbar-container" :id="`editor-toolbar-${editorId}`"></div>
    <div class="editor-container" :id="`editor-${editorId}`"></div>
  </div>
</template>

<script>
  import E from 'wangeditor';

  export default {
    name: 'editor',
    props: {
      editorId: [String, Number],
      content: String
    },
    data() {
      return {
        editor: null,
        editorContent: ''
      };
    },
    mounted() {
      const toolbarId = `#editor-toolbar-${this.editorId}`;
      const id = `#editor-${this.editorId}`;
      const editor = new E(toolbarId, id);
      editor.customConfig.menus = [
        'head',
        'justify'
      ];
      editor.customConfig.pasteFilterStyle = false;
      editor.customConfig.zIndex = 100;
      editor.customConfig.onchangeTimeout = 1;
      editor.customConfig.onchange = this.onChange;
      editor.create();
      this.editor = editor;
    },
    watch: {
      content(val) {
        this.editor.txt.html(val);
      }
    },
    methods: {
      onChange(html) {
        this.editorContent = html;
        this.emit('onChange', html);
      },
      emit(eventName, ...args) {
        this.$emit(eventName, ...args, this.editor);
      }
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .toolbar-container {
    border: 1px solid #ccc;
    flex-wrap: wrap;
  }

  .editor-container {
    border-width: 1px;
    border-style: solid;
    border-color: #ccc;
    border-top: none;
  }
</style>
