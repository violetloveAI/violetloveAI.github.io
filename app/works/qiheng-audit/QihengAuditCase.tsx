import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';

const mobile = '/projects/qiheng-audit/mobile-audit.jpg';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '业务问题', english: 'PROBLEM',
    title: '先汇总依据，再判断风险。',
    body: '整合单据、员工档案、城市标准和审批记录，由大模型生成带依据的预审意见，让财务集中复核重点风险。',
    proof: ['多源事实核对', '风险与依据同屏'],
    marker: 'CLAIM → FACTS → RISK',
    desktop: '/projects/qiheng-audit/audit-overview-approved-2026-09-06.png', desktopAlt: '启衡智审审核驾驶舱：任务进度、风险分布与重点单据', desktopFit: 'cover',
    phone: mobile, phoneAlt: '启衡智审移动端审核界面',
    screenLabel: '审核驾驶舱', screenNote: '从任务进度、风险分布与趋势定位重点单据，再进入逐单复核。',
  },
  {
    index: '02', label: '关键方案', english: 'SYSTEM',
    title: '读懂四种金额，打通两套系统。',
    body: '我梳理四金额业务模型，将审核意见写回 ERP、同步飞书，再回读核对；财务沿用既有审批与付款流程。',
    proof: ['四金额业务建模', 'ERP / 飞书双向核对'],
    marker: 'SEMANTICS → WRITE → READ BACK',
    desktop: '/projects/qiheng-audit/review-detail.webp', desktopAlt: '启衡智审报销单详情：预审意见、风险等级与逐项费用依据',
    phone: mobile, phoneAlt: '启衡智审手机端风险审核页面',
    screenLabel: '审核详情与业务依据', screenNote: '单据、发票、制度条款与风险原因并列呈现，将分散的审核依据汇到同一张工作台。',
  },
  {
    index: '03', label: '我的交付', english: 'OWNERSHIP',
    title: '独立串起前后端与审核 Agent。',
    body: '我完成前后端、Agent 和 ERP / 飞书集成，以 300 张单据验收意见写入、回读结果和审批状态。',
    proof: ['写入与回读 300 / 300', '审批状态全部保持'],
    marker: 'DESIGN → INTEGRATE → ACCEPT',
    desktop: '/projects/qiheng-audit/erp-center.webp', desktopAlt: '启衡智审 ERP 接入中心与同步状态',
    phone: mobile, phoneAlt: '启衡智审手机端产品界面',
    screenLabel: 'ERP 接入与同步', screenNote: '集中呈现数据来源、接口、权限和同步状态，让系统集成可追踪、可排查。',
  },
];

export function QihengAuditCase({ embedded = false }: { embedded?: boolean }) {
  return (
    <ClayProductCase
      index="03"
      kind="FDE 课程 · AI 报销审核"
      englishName="QIHENG AI AUDIT"
      name="qiheng-audit"
      status={['独立全栈交付', 'ERP / 飞书集成']}
      titleBefore="把分散的报销依据，"
      titleAccent="汇成清晰的审核意见。"
      titleAfter=""
      summary="把报销规则、ERP 数据与飞书协同接成一条审核链，让财务在同一工作台查看风险、依据和处理建议。"
      resultLead="300 单端到端验证，"
      resultAccent="写入与回读全部通过。"
      metrics={[
        { label: '验收样本', value: '300 张模拟单据' },
        { label: '意见写入', value: '300 / 300' },
        { label: '审批状态', value: '300 单保持原状' },
        { label: '飞书回读', value: '300 / 300' },
      ]}
      storySteps={storySteps}
      workflow="读取 ERP → AI 预审 → 意见回写 → 飞书回读 → 财务复核"
      demoUrl="https://violetloveai.github.io/qiheng-ai-audit/"
      githubUrl="https://github.com/violetloveAI/qiheng-ai-audit"
      clayArt="/projects/clay-subjects/qiheng-audit.webp"
      deviceMode="dual"
      showcaseDesktop="/projects/qiheng-audit/audit-overview-approved-2026-09-06.png"
      showcaseDesktopAlt="启衡智审审核驾驶舱：任务进度、风险分布与重点单据"
      showcasePhone={mobile}
      showcasePhoneAlt="启衡智审移动端审核界面"
      showcaseLabel="启衡智审 / AI 报销审核工作台"
      accent="#86a6c4"
      accentDeep="#3f6684"
      accentSoft="#d4b6c6"
      canvasLight="#3f6b7d"
      canvas="#2b4d5b"
      canvasDeep="#162a32"
      embedded={embedded}
    />
  );
}
