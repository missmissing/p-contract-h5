/**
 * 系统常量
 */

export default {
    APP_ID: '',
    SERVICE_ROOT: {
        NORMAL: '/api'
    },
    EVENT_KEY: {
        ERROR: 'ERROR',
        EVENT_PROCESS: {
            CHANGE_TITLE: 'EVENT_PROCESS_CHANGE_TITLE'
        },
        NET_COMMUNICATION: {
            ERROR: 'NET_COMMUNICATION_ERROR',
            BUSINESS_ERROR: {
                NOT_200: 'NET_COMMUNICATION_BUSINESS_ERROR_NOT_200',
                ERROR_401: 'NET_COMMUNICATION_BUSINESS_ERROR_NOT_401'
            },
            NORMAL_ERROR: {
                ERROR_500: 'NET_COMMUNICATION_NORMAL_ERROR_ERROR_500'
            }
        }
    }
};

/**
 * 获取所有的路由名称
 *
 */
export const routerNames = {
    login: '登录',
    redirect: '重定向',
    error404: '404',
    home: '首页',

    con_create: '合同创建',
    con_createIndex: '创建合同',
    con_createFrameContract: '创建框架合同',
    con_createIntentionContract: '创建意向合同',
    con_createSingleContract: '创建单一合同',
    con_createSimpleContract: '创建简易合同',

    con_sign: '合同签订',
    con_purchase_order: '创建采购订单',

    con_performance: '合同履约',
    con_performanceIndex: '履约合同',
    con_compensate: '违约/赔付处理',
    con_check_reject: '合同验收不合格处理',
    con_stop: '合同终止',
    con_update: '合同变更',

    con_support: '合同支持',
    con_textTemp_create: '合同模板创建',
    con_textTemp_update: '合同模板变更',
    con_textTemp_del: '合同模板废除',
    con_textTemp_search: '合同文本查询',
    con_search: '合同查询'
};

/**审批按钮（新版本） */
export const approvalAction = {
    /**同意 */
    OK: 1000,
    /**拒绝 */
    Reject: 1001,
    /**加签 */
    Sign: 1002,
    /**转签 */
    Transfer: 1003,
    /**驳回 */
    //TurnedDown: 1004,
    /**不同意但继续 */
    DisagreeContinue: 1005
};

/**k2系统相关 在待办中心注册的 系统编码 */
export const k2RegistrationSystemCodes = ['k2', '8081', '8080'];

/**任务状态 const*/
export const taskState = {
    /**待办 */
    todo: 1,
    /**办理中 */
    dong: 2,
    /**已办 */
    done: 3,
};
