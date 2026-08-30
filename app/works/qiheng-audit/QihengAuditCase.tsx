import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';

const privacySafePreview = '/assets/cartoon-clay-v2/work-buttons-v3/web/03-qiheng-audit.avif';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '业务问题', english: 'PROBLEM',
    title: '财务真正缺的不是一个 AI 分数，而是事实、规则和证据在同一处。',
    body: '费用会计需要在报销单、员工档案、城市标准、审批记录、特批和发票之间反复查找。这个项目的作用，是先替人找齐依据、形成预审核意见，而不是替人盖章。',
    proof: ['费用会计预审核工作台', '模拟制造企业 ERP', '决定权始终在人'],
    marker: 'CLAIM → FACTS → RISK',
    desktop: privacySafePreview, desktopAlt: '启衡智审 AI 财务审核产品插画',
    phone: privacySafePreview, phoneAlt: '启衡智审 AI 财务审核产品插画',
    screenLabel: '审核驾驶舱', screenNote: '任务、风险分布、趋势和高风险单据先形成全局判断，再进入逐单复核。',
  },
  {
    index: '02', label: '关键方案', english: 'SYSTEM',
    title: '把业务口径、ERP 写回、飞书回读和人工复核做成一条可验证链路。',
    body: '我将易混淆的金额拆成四个业务字段；AI 只写审核意见，不修改审批与付款状态。写回 ERP 后再同步飞书并回读核对，避免“接口返回成功”被误当成交付完成。',
    proof: ['四金额业务模型', 'ERP 写入后回读', '飞书 verified + HITL'],
    marker: 'SEMANTICS → WRITE → READ BACK',
    desktop: privacySafePreview, desktopAlt: '启衡智审 AI 财务审核产品插画',
    phone: privacySafePreview, phoneAlt: '启衡智审 AI 财务审核产品插画',
    screenLabel: '审核详情', screenNote: '单据、发票、制度条款与风险原因并列呈现，让财务能直接检查 AI 的依据。',
  },
  {
    index: '03', label: '交付证据', english: 'OWNERSHIP',
    title: '300 张单据不是装饰数字，而是我对业务口径和技术闭环的验收证据。',
    body: '我担任项目负责人，定义问题与范围，设计 Skill、Agent、ERP / 飞书闭环和 HITL 原则，并组织测试口径与交付材料。最终完成 300 张唯一单据全量回归。',
    proof: ['300 / 300 ERP 意见写入', '300 / 300 飞书回读', '0 / 300 状态被 AI 改变'],
    marker: 'DESIGN → INTEGRATE → ACCEPT',
    desktop: privacySafePreview, desktopAlt: '启衡智审 AI 财务审核产品插画',
    phone: privacySafePreview, phoneAlt: '启衡智审 AI 财务审核产品插画',
    screenLabel: 'ERP 接入中心', screenNote: '数据来源、接口、权限和同步状态有明确边界，便于交付与问题排查。',
  },
];

export function QihengAuditCase() {
  return (
    <ClayProductCase
      index="03"
      kind="ENTERPRISE AI POC"
      englishName="QIHENG AI AUDIT"
      name="qiheng-audit"
      status={['ERP × FEISHU', 'HUMAN-IN-THE-LOOP']}
      titleBefore="不是让 AI 替财务盖章，"
      titleAccent="而是先把事实、规则和证据找齐。"
      titleAfter=""
      summary="FDE 共学营结课项目：在课程提供的模拟制造企业与 ERP 环境里，完成 AI 预审核、意见回写、飞书协同和人工复核闭环。"
      resultLead="技术闭环通过，"
      resultAccent="决定权仍在人。"
      metrics={[
        { label: 'REGRESSION', value: '300 张唯一单据' },
        { label: 'ERP WRITE', value: '300 / 300' },
        { label: 'STATUS CHANGE', value: '0 / 300' },
        { label: 'FEISHU VERIFIED', value: '300 / 300' },
      ]}
      storySteps={storySteps}
      workflow="READ ERP → ANALYZE → WRITE OPINION → VERIFY → REVIEW"
      demoUrl="https://0ab214a9f8404b3898952c953a1f3f3c.sh5.agentos-app.net"
      githubUrl="https://github.com/violetloveAI/qiheng-ai-audit"
      clayArt="/projects/clay-subjects/qiheng-audit.webp"
      deviceMode="dual"
      showcaseDesktop={privacySafePreview}
      showcaseDesktopAlt="启衡智审 AI 财务审核产品插画"
      showcasePhone={privacySafePreview}
      showcasePhoneAlt="启衡智审 AI 财务审核产品插画"
      showcaseLabel="PRODUCT OVERVIEW / AUDIT WORKBENCH"
      accent="#86a6c4"
      accentDeep="#3f6684"
      accentSoft="#d4b6c6"
    />
  );
}
