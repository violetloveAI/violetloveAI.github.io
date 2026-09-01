'use client';

import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';
import { useEmbeddedMode } from '../_components/useEmbeddedMode';

const mobile = '/projects/enterprise-support/mobile-workbench.jpg';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '为什么做', english: 'PROBLEM',
    title: '企业支持最危险的是：没有证据，却给出确定答案。',
    body: '制度、权限、单据、审批和接口状态必须一起核对。我把过去的一线经验抽象成一次可检查的系统诊断。',
    proof: ['来自真实支持经验', '面向 ERP 支持角色', '诊断而非泛问答'],
    marker: 'QUESTION → FACTS → DIAGNOSIS',
    desktop: '/projects/enterprise-support/diagnosis-complete.jpg', desktopAlt: '企服智诊完整诊断结果与 Agent 执行轨迹',
    phone: mobile, phoneAlt: '企服智诊 390×844 手机端工作台',
    screenLabel: '完整诊断链', screenNote: '从问题、根因和置信度一路看到建议动作，让每个关键结论都可以被检查。',
  },
  {
    index: '02', label: '可信闭环', english: 'SYSTEM',
    title: '把检索、取证、校验与审批做成可演示流程。',
    body: '当前由合成数据和确定性 fixture 驱动，不调用真实 LLM、RAG 或 ERP；界面保留未来接入所需的状态与边界。',
    proof: ['合成知识与案例', '工具与引用可追溯', '写操作前 HITL'],
    marker: 'RETRIEVE → VERIFY → APPROVE',
    desktop: '/projects/enterprise-support/knowledge-sources.jpg', desktopAlt: '企服智诊企业知识来源与引用分数',
    phone: mobile, phoneAlt: '企服智诊手机端诊断工作台',
    screenLabel: '知识来源', screenNote: '把文档编号、检索分数和引用校验状态直接摆在诊断结果旁边。',
  },
  {
    index: '03', label: '我的交付', english: 'OWNERSHIP',
    title: '我定义业务闭环与验收，再用 Coding Agent 完成交互 POC。',
    body: '我负责问题定义、场景、信息架构、风险边界与验收；AI 辅助完成前端实现，我再测试、查日志并推动修复。',
    proof: ['产品范围与风险边界', '54 条合成基线案例', '构建 · 测试 · 部署'],
    marker: 'PRODUCT + ENGINEERING + EVAL',
    desktop: '/projects/enterprise-support/engineering-view.jpg', desktopAlt: '企服智诊前端、Agent、RAG 与 Mock ERP 工程视图',
    phone: mobile, phoneAlt: '企服智诊 390×844 移动端工作台',
    screenLabel: '工程视图', screenNote: '工程视图标出计划中的 Agent、RAG 与 Mock ERP；当前只实现确定性前端演示。',
  },
];

export function EnterpriseSupportCase({ embedded = false }: { embedded?: boolean }) {
  const isEmbedded = useEmbeddedMode(embedded);

  return (
    <ClayProductCase
      index="02"
      kind="SIMULATED ENTERPRISE POC"
      englishName="ENTERPRISE SUPPORT COPILOT"
      name="enterprise-support"
      status={['DETERMINISTIC DEMO', 'SYNTHETIC DATA']}
      titleBefore="把复杂的系统问题，"
      titleAccent="变成可验证的诊断。"
      titleAfter=""
      summary="基于企业软件支持经验设计的模拟 POC，用确定性前端验证诊断流程、证据展示与风险边界。"
      resultLead="从一句提问到"
      resultAccent="一条可检查的诊断链。"
      metrics={[
        { label: 'BASELINE', value: '54 条合成案例' },
        { label: 'ENGINE', value: '确定性前端' },
        { label: 'DATA', value: '全量合成' },
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
      canvasLight="#5b466f"
      canvas="#3d3150"
      canvasDeep="#201a2b"
      embedded={isEmbedded}
    />
  );
}
