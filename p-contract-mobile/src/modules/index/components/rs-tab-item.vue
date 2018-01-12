<style type="text/scss" lang="scss" scoped>
  .item {
    padding: 17px 10px;
    display: inline-block;
    text-align: center;
    &.is-selected {
      border-bottom: 3px solid #26a2ff;
      color: #26a2ff;
    }
    .item-label {
      color: inherit;
      font-size: 12px;
      line-height: 1;
    }
  }
</style>

<template>
  <div
    class="item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="item-label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rs-item',
    props: ['id'],
    data() {
      return {};
    },
    methods: {
      select() {
        this.$emit('select', this.id);
      }
    }
  };
</script>
