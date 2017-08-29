import Vue from 'vue'
import TreeModal from '@/components/treeModal'

describe('treeModal.vue', () => {
  it('sets the correct default data', () => {
    expect(typeof TreeModal.data).to.equal('function')
    const data = TreeModal.data()
    expect(data.checkNodes).to.eql([])
  })

  it('renders correctly with different props', () => {
    const Ctor = Vue.extend(TreeModal)
    const vm = new Ctor({propsData: {title: '提示'}}).$mount()
    expect(vm.title).to.equal('提示')
  })
})
