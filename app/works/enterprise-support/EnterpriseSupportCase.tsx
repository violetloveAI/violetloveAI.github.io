import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';

const mobile = '/projects/enterprise-support/mobile-workbench.jpg';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '为什么做', english: 'PROBLEM',
    title: '企业支持最危险的，不是不会答，而是没有证据却很确定。',
    body: 'L1/L2 支持、财务 IT 与 ERP 运维面对的不是单一问答：制度、权限、单据、审批和接口状态必须一起核对。因此我把“AI 客服”重新定义为一次可验证的系统诊断。',
    proof: ['6 类 ERP 故障场景', '面向真实支持角色', '诊断而非泛问答'],
    marker: 'QUESTION → FACTS → DIAGNOSIS',
    desktop: '/projects/enterprise-support/diagnosis-complete.jpg', desktopAlt: '企服智诊完整诊断结果与 Agent 执行轨迹',
    phone: mobile, phoneAlt: '企服智诊 390×844 手机端工作台',
    screenLabel: '完整诊断链', screenNote: '从问题、根因和置信度一路看到建议动作，让结论不是一句不可检查的话。',
  },
  {
    index: '02', label: '可信闭环', english: 'SYSTEM',
    title: '检索知识、查询事实、校验证据，再把高风险动作交还给人。',
    body: '系统用 RAG 检索制度与 SOP，用受控工具查询 ERP 事实；Evidence Guard 检查引用和置信度，创建工单等写操作则通过 interrupt / resume 等待人工批准。',
    proof: ['12 份知识文档', '来源与工具调用可追溯', '写操作前 HITL'],
    marker: 'RETRIEVE → VERIFY → APPROVE',
    desktop: '/projects/enterprise-support/knowledge-sources.jpg', desktopAlt: '企服智诊企业知识来源与引用分数',
    phone: mobile, phoneAlt: '企服智诊手机端诊断工作台',
    screenLabel: '知识来源', screenNote: '把文档编号、检索分数和引用校验状态直接摆在诊断结果旁边。',
  },
  {
    index: '03', label: '我的交付', english: 'OWNERSHIP',
    title: '我不只做出界面，也定义了边界、验收标准和可复现的评测。',
    body: '这是我的 FDE 自发作品。我负责问题定义、企业场景抽象、信息架构、风险边界与验收口径，并完成前后端、Agent、RAG、评测、测试、文档和部署迭代。',
    proof: ['完整全栈与 Agent 链路', '54 条标注合成案例', '0 次评测执行失败'],
    marker: 'PRODUCT + ENGINEERING + EVAL',
    desktop: '/projects/enterprise-support/engineering-view.jpg', desktopAlt: '企服智诊前端、Agent、RAG 与 Mock ERP 工程视图',
    phone: mobile, phoneAlt: '企服智诊 390×844 移动端工作台',
    screenLabel: '工程视图', screenNote: '前端工作台、Agent API、RAG、Evidence Guard 与 Mock ERP 的职责边界清晰可见。',
  },
];

export function EnterpriseSupportCase() {
  return (
    <ClayProductCase
      index="02"
      kind="ENTERPRISE AGENT"
      englishName="ENTERPRISE SUPPORT COPILOT"
      name="enterprise-support"
      status={['FULL-STACK AGENT', 'EVIDENCE-GROUNDED']}
      titleBefore="把复杂的系统问题，"
      titleAccent="变成可验证的诊断。"
      titleAfter=""
      summary="面向 L1/L2 支持、财务 IT 与 ERP 运维，把知识检索、系统取证、证据校验和人工审批串成一条可观察链路。"
      resultLead="不是 AI 客服，"
      resultAccent="是受控诊断。"
      metrics={[
        { label: 'EVAL', value: '54 条合成案例' },
        { label: 'RUN', value: '0 次执行失败' },
        { label: 'SCENARIOS', value: '6 类 ERP 故障' },
        { label: 'CONTROL', value: '写操作 HITL' },
      ]}
      storySteps={storySteps}
      workflow="FRAME → RETRIEVE → VERIFY → DIAGNOSE → APPROVE"
      demoUrl="https://violetloveai.github.io/enterprise-support-copilot/"
      githubUrl="https://github.com/violetloveAI/enterprise-support-copilot"
      clayArt="/projects/clay-subjects/enterprise-diagnosis.webp"
      deviceMode="dual"
      showcaseDesktop="/projects/enterprise-support/engineering-view.jpg"
      showcaseDesktopAlt="企服智诊前端、Agent、RAG 与 Mock ERP 的主工程工作台"
      showcasePhone={mobile}
      showcasePhoneAlt="企服智诊 390×844 移动端工作台"
      showcaseLabel="PRODUCT OVERVIEW / ENGINEERING WORKBENCH"
      accent="#a38fc7"
      accentDeep="#69538f"
      accentSoft="#b7c9bc"
    />
  );
}
