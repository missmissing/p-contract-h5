<template>
  <div>
    <div class="toolbar-container" :id="`editor-toolbar-${editorId}`"></div>
    <div class="editor-container" :id="`editor-${editorId}`"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'

export default {
    name: 'editor',
    props: {
      editorId: [String, Number],
      value: String,
      disabled: Boolean
    },
    data () {
      return {
        editor: null,
        editorContent: ''
      }
    },
    mounted () {
      const toolbarId = `#editor-toolbar-${this.editorId}`
      const id = `#editor-${this.editorId}`
      const editor = new E(toolbarId, id)
      editor.customConfig.menus = [
        'head',
        'justify'
      ]
      editor.customConfig.pasteFilterStyle = false
      editor.customConfig.zIndex = 100
      editor.customConfig.onchangeTimeout = 1
      editor.customConfig.onchange = this.onChange
      editor.create()
      this.editor = editor
      if (this.value) {
        editor.txt.html(this.value)
      }
      if (this.disabled) {
        editor.$textElem.attr('contenteditable', false)
      }
    },
    watch: {
      value (val) {
        if (val !== this.editorContent) {
          this.editor.txt.html(val)
        }
      }
    },
    methods: {
      onChange (html) {
        this.editorContent = html
        this.emit('input', html)
        this.emit('onChange', html)
      },
      emit (eventName, ...args) {
        this.$emit(eventName, ...args, this.editor)
      }
    }
  }
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
    word-break: break-all;
  }
</style>
