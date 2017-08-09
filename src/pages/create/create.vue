<style>
    .ivu-input-type,
    .ivu-select-single {
        width: 180px;
    }
</style>
<template>
    <div>
        <Card>
            <Form :label-width="100">
                <Form-item label="是否有比价单">
                    <i-switch v-model="hasPR"></i-switch>
                </Form-item>
            </Form>
            <Form :label-width="100" inline v-show="hasPR">
                <Form-item label="比价单">
                    <Input placeholder="请输入" v-model="pr"></Input>
                </Form-item>
                <Form-item :label-width="40" v-show="hasPR">
                    <Button type="primary" @click="showSearchComparisonModal=true">
                        <span>查找</span>
                    </Button>
                </Form-item>
            </Form>
            <Form :label-width="100" inline>
                <Form-item label="合同模式">
                    <Select placeholder="请选择" v-model="conModel">
                        <Option value="1">框架意向合同</Option>
                        <Option value="2">框架合同</Option>
                        <Option value="3">单一合同</Option>
                        <Option value="4">简易合同</Option>
                    </Select>
                </Form-item>
                <Form-item label="合同类型">
                    <Select placeholder="请选择" v-model="conType">
                        <Option value="1">服务类</Option>
                        <Option value="2">固定资产类</Option>
                        <Option value="3">一般物资类</Option>
                    </Select>
                </Form-item>
            </Form>
        </Card>

        <Modal v-model="showSearchComparisonModal" title="查询比价单" width="400">
            <Form :label-width="100">
                <Form-item label="PR号">
                    <Input placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="材料编码">
                    <Input placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="创建人">
                    <Input placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="创建时间">
                    <Date-picker type="daterange" :options="options2" placement="bottom-end" placeholder="选择日期"
                                 style="width: 200px"></Date-picker>
                </Form-item>
            </Form>
        </Modal>
        <!--<approveprocess></approveprocess>-->
        <div class="submit">
            <Button type="primary" @click="nextStep">
                <span>下一步</span>
            </Button>
        </div>
    </div>
</template>
<script>
    import approveprocess from '../../components/approveProcess.vue'

    export default {
        created() {
        },
        data() {
            return {
                hasPR: true,
                pr: '',
                conModel: "0",
                conType: "0",
                showSearchComparisonModal: false,
                options2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value() {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            nextStep() {
                if (this.hasPR) {
                    if (!this.pr) {
                        this.$Message.error('请填写PR号!');
                        return;
                    }
                }

                this.$router.push({
                    path: "/ConCreate/CreateFrameContract",
                    query: {
                        pr: this.pr,
                        conModel: this.conModel,
                        conType: this.conType,
                    }
                });

            }
        },
        components: {}
    }
</script>
