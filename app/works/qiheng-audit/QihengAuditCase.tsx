'use client';

import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';
import { useEmbeddedMode } from '../_components/useEmbeddedMode';

const privacySafePreview = '/assets/cartoon-clay-v2/work-buttons-v3/web/03-qiheng-audit.avif';
const mobile = privacySafePreview;

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '业务问题', english: 'PROBLEM',
    title: '报销审核需要同屏的事实、规则与证据。',
    body: '大模型核对报销单、员工档案、城市标准和审批记录，形成预审意见，最终决定仍由财务完成。',
    proof: ['AI 报销预审核', '模拟制造企业 ERP', '决定权始终在人'],
    marker: 'CLAIM → FACTS → RISK',
    desktop: privacySafePreview, desktopAlt: '启衡智审 AI 财务审核产品插画',
    phone: mobile, phoneAlt: '启衡智审移动端审核界面',
    screenLabel: '审核驾驶舱', screenNote: '任务、风险分布、趋势和高风险单据先形成全局判断，再进入逐单复核。',
  },
  {
    index: '02', label: '关键方案', english: 'SYSTEM',
    title: 'ERP 写回、飞书回读与人工复核组成可验证链路。',
    body: 'AI 只写审核意见，不改审批与付款状态；写回后同步飞书并回读核对。',
    proof: ['四金额业务模型', 'ERP 写入后回读', '飞书 verified + HITL'],
    marker: 'SEMANTICS → WRITE → READ BACK',
    desktop: privacySafePreview, desktopAlt: '启衡智审 AI 财务审核产品插画',
    phone: mobile, phoneAlt: '启衡智审手机端风险审核页面',
    screenLabel: '审核详情', screenNote: '单据、发票、制度条款与风险原因并列呈现，让财务能直接检查 AI 的依据。',
  },
  {
    index: '03', label: '交付证据', english: 'OWNERSHIP',
    title: '300 张模拟单据，验证业务口径与技术闭环。',
    body: '我在观猹 FDE 课程中个人完成前后端、Skill、Agent、ERP / 飞书闭环，并组织 300 张单据全量回归。',
    proof: ['个人课程项目', '300 / 300 ERP 意见写入', '0 / 300 状态被 AI 改变'],
    marker: 'DESIGN → INTEGRATE → ACCEPT',
    desktop: privacySafePreview, desktopAlt: '启衡智审 AI 财务审核产品插画',
    phone: mobile, phoneAlt: '启衡智审手机端产品界面',
    screenLabel: 'ERP 接入中心', screenNote: '数据来源、接口、权限和同步状态有明确边界，便于交付与问题排查。',
  },
];

export function QihengAuditCase({ embedded = false }: { embedded?: boolean }) {
  const isEmbedded = useEmbeddedMode(embedded);

  return (
    <ClayProductCase
      index="03"
      kind="FDE COURSE PROJECT"
      englishName="QIHENG AI AUDIT"
      name="qiheng-audit"
      status={['FDE COURSE', 'SIMULATED ERP']}
      titleBefore="让 AI 先找齐事实、规则与证据，"
      titleAccent="把最终决定留给财务。"
      titleAfter=""
      summary="观猹 FDE 课程个人项目：在模拟制造企业与 ERP 环境里，完成大模型预审、意见回写、飞书协同和人工复核。"
      resultLead="技术闭环通过，"
      resultAccent="决定权仍在人。"
      metrics={[
        { label: 'REGRESSION', value: '300 张模拟单据' },
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
      showcaseDesktopAlt="启衡智审主审核驾驶舱与风险分布界面"
      showcasePhone={mobile}
      showcasePhoneAlt="启衡智审移动端审核界面"
      showcaseLabel="PRODUCT OVERVIEW / AUDIT WORKBENCH"
      accent="#86a6c4"
      accentDeep="#3f6684"
      accentSoft="#d4b6c6"
      canvasLight="#3f6b7d"
      canvas="#2b4d5b"
      canvasDeep="#162a32"
      embedded={isEmbedded}
    />
  );
}
