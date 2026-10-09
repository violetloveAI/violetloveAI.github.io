import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';

const mobile = '/projects/enterprise-support/mobile-workbench.jpg';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '业务洞察', english: 'PROBLEM',
    title: '把一线排障经验，变成诊断路径。',
    body: '我将制度、权限、单据、审批和接口问题组织成统一诊断路径，让支持人员从报错描述走到根因与处理建议。',
    proof: ['一线 ERP 支持经验', '6 类故障场景'],
    marker: 'QUESTION → FACTS → DIAGNOSIS',
    desktop: '/projects/enterprise-support/diagnostic-overview.png', desktopAlt: '企服智诊工作台：问题拆解、根因判断与处理建议',
    phone: mobile, phoneAlt: '企服智诊移动端诊断工作台',
    screenLabel: '从问题到处理建议', screenNote: '问题、根因、置信度与建议动作集中呈现，让排障思路清晰可跟进。',
  },
  {
    index: '02', label: '诊断设计', english: 'SYSTEM',
    title: '根因、依据与动作，一处说清。',
    body: '围绕根因和处理步骤组织诊断结果，关联文档引用与校验状态；涉及数据修改时进入人工确认，兼顾排障效率与操作责任。',
    proof: ['结论关联知识引用', '高风险操作人工确认'],
    marker: 'RETRIEVE → VERIFY → APPROVE',
    desktop: '/projects/enterprise-support/diagnostic-result.png', desktopAlt: '企服智诊诊断完成结果页与根因、证据、处理步骤',
    phone: mobile, phoneAlt: '企服智诊手机端诊断工作台',
    screenLabel: '诊断依据与处理步骤', screenNote: '文档编号、检索分数与引用状态随结论展示，支持人员可以顺着依据继续定位。',
  },
  {
    index: '03', label: '我的交付', english: 'OWNERSHIP',
    title: '把诊断方案做到可演示、可验收。',
    body: '我负责场景拆解、风险分级与验收设计，借助 AI 构建原型；以 54 条案例覆盖分类、工具选择、引用与升级判断。',
    proof: ['场景 / 规则 / 验收设计', '54 条评测案例'],
    marker: 'PRODUCT + ENGINEERING + EVAL',
    desktop: '/projects/enterprise-support/engineering-view.jpg', desktopAlt: '企服智诊前端、Agent、RAG 与 Mock ERP 工程视图',
    phone: mobile, phoneAlt: '企服智诊移动端诊断工作台',
    screenLabel: '方案与工程分工', screenNote: '按前端、Agent、知识检索与 ERP 接口划分职责，将业务诊断路径对应到工程结构。',
  },
];

export function EnterpriseSupportCase({ embedded = false }: { embedded?: boolean }) {
  return (
    <ClayProductCase
      index="02"
      kind="ERP 诊断 POC"
      englishName="ENTERPRISE SUPPORT COPILOT"
      name="enterprise-support"
      status={['一线 ERP 经验', '诊断与验收设计']}
      titleBefore="把复杂的系统问题，"
      titleAccent="变成清晰的排障路径。"
      titleAfter=""
      summary="把一线 ERP 支持经验转化为诊断工作台，串起问题拆解、证据定位与处理建议。"
      resultLead="将一线经验沉淀为"
      resultAccent="可演示、可验收的诊断方案。"
      metrics={[
        { label: '场景覆盖', value: '6 类 ERP 故障' },
        { label: '评测基线', value: '54 条案例' },
        { label: '诊断输出', value: '根因 · 依据 · 步骤' },
        { label: '我的贡献', value: '场景 · 规则 · 验收' },
      ]}
      storySteps={storySteps}
      workflow="问题拆解 → 证据定位 → 诊断建议 → 人工确认"
      demoUrl="https://violetloveai.github.io/enterprise-support-copilot/"
      githubUrl="https://github.com/violetloveAI/enterprise-support-copilot"
      clayArt="/projects/clay-subjects/enterprise-diagnosis.webp"
      deviceMode="dual"
      showcaseDesktop="/projects/enterprise-support/diagnostic-overview.png"
      showcaseDesktopAlt="企服智诊诊断工作台：从问题描述到根因与处理建议"
      showcasePhone={mobile}
      showcasePhoneAlt="企服智诊移动端诊断工作台"
      showcaseLabel="企服智诊 / ERP 诊断工作台"
      accent="#a38fc7"
      accentDeep="#69538f"
      accentSoft="#b7c9bc"
      canvasLight="#5b466f"
      canvas="#3d3150"
      canvasDeep="#201a2b"
      embedded={embedded}
    />
  );
}
