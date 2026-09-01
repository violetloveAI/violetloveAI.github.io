export type WorkProject = {
  id: string;
  index: string;
  title: string;
  english: string;
  eyebrow: string;
  summary: string;
  proof: readonly string[];
  image: string;
  caseHref: string;
  demoUrl: string | null;
  githubUrl: string | null;
  caseLabel: string;
  accent: string;
  accentSoft: string;
  accentDeep: string;
  canvasLight: string;
  canvas: string;
  canvasDeep: string;
};

export type WorkExperiment = {
  title: string;
  english: string;
  summary: string;
  image: string;
  primaryUrl: string;
  primaryLabel: string;
  secondaryUrl: string | null;
  secondaryLabel: string | null;
};

export const workProjects = [
  {
    id: 'commerce-os',
    index: '01',
    title: '跨境经营舱',
    english: 'COMMERCE OS',
    eyebrow: '面向独立卖家的跨境经营工作台',
    summary: '基于匿名经营场景，把脱敏导出文件快速转成经营报表，并规划商品、库存、货源与补货工作流。',
    proof: ['匿名经营场景', '脱敏商品数据', 'CSV 文件导入', '补货链路待验证'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/01-commerce-cockpit.avif',
    caseHref: '/works/commerce-os',
    demoUrl: 'https://violetloveai.github.io/commerce-os-crossborder/',
    githubUrl: 'https://github.com/violetloveAI/commerce-os-crossborder',
    caseLabel: '查看完整案例',
    accent: '#e99a73',
    accentSoft: '#f3c6a9',
    accentDeep: '#7b3e32',
    canvasLight: '#6d4337',
    canvas: '#4a302b',
    canvasDeep: '#241b19',
  },
  {
    id: 'enterprise-support',
    index: '02',
    title: '企服智诊',
    english: 'ENTERPRISE SUPPORT COPILOT',
    eyebrow: 'ERP 故障诊断流程模拟 POC',
    summary: '基于企业软件支持经验，把知识、系统取证、证据校验和人工审批做成可交互的确定性演示。',
    proof: ['模拟企业 POC', '54 条合成案例', '完整诊断链路', '写操作 HITL'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/02-enterprise-diagnosis.avif',
    caseHref: '/works/enterprise-support',
    demoUrl: 'https://violetloveai.github.io/enterprise-support-copilot/',
    githubUrl: 'https://github.com/violetloveAI/enterprise-support-copilot',
    caseLabel: '查看完整案例',
    accent: '#a68dce',
    accentSoft: '#d8c9ec',
    accentDeep: '#4d3b6f',
    canvasLight: '#5b466f',
    canvas: '#3d3150',
    canvasDeep: '#201a2b',
  },
  {
    id: 'qiheng',
    index: '03',
    title: '启衡智审',
    english: 'QIHENG AI AUDIT',
    eyebrow: '观猹 FDE 课程 · AI 报销审核',
    summary: '在模拟制造企业与 ERP 环境中，让大模型核对事实、规则与证据并回写意见，最终决定仍由财务完成。',
    proof: ['个人课程项目', '300 张模拟单据', 'ERP 写回 300/300', '财务保留决定权'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/03-qiheng-audit.avif',
    caseHref: '/works/qiheng-audit',
    demoUrl: 'https://violetloveai.github.io/qiheng-ai-audit/',
    githubUrl: 'https://github.com/violetloveAI/qiheng-ai-audit',
    caseLabel: '查看完整案例',
    accent: '#77a7bf',
    accentSoft: '#c2d8e2',
    accentDeep: '#315a70',
    canvasLight: '#3f6b7d',
    canvas: '#2b4d5b',
    canvasDeep: '#162a32',
  },
  {
    id: 'tutor-log',
    index: '04',
    title: '课时簿',
    english: 'TUTOR LOG',
    eyebrow: '记录课表课时与薪酬的家教助手',
    summary: '为一位匿名独立教师完成私人版 iPhone App，把课表、学生、课时记录与实际薪酬收进每天会用的工作台。',
    proof: ['匿名教师场景', '独立 0→1', '私人版已交付', '公开版筹备中'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/04-tutor-log.avif',
    caseHref: '/works/tutor-log',
    demoUrl: 'https://violetloveai.github.io/yang-teacher-tutor/',
    githubUrl: 'https://github.com/violetloveAI/yang-teacher-tutor',
    caseLabel: '查看完整案例',
    accent: '#e4b75a',
    accentSoft: '#f2d99b',
    accentDeep: '#6e5523',
    canvasLight: '#6e5a2f',
    canvas: '#504121',
    canvasDeep: '#292316',
  },
  {
    id: 'final-human',
    index: '05',
    title: 'Final Human',
    english: 'FINAL HUMAN',
    eyebrow: '追查 AI 幻觉的互动推理调查游戏',
    summary: '两人组队，在 48 小时内把 AI 幻觉风险做成可玩的调查游戏；我主导选题、方案、产品推进与路演。',
    proof: ['游戏赛道亚军', '一发入魂奖', '2 人团队', '负责人 / 主策'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/05-final-human.avif',
    caseHref: '/works/final-human',
    demoUrl: 'https://violetloveai.github.io/finalhuman/',
    githubUrl: 'https://github.com/violetloveAI/finalhuman',
    caseLabel: '查看获奖案例',
    accent: '#6f9ed4',
    accentSoft: '#bfd4ed',
    accentDeep: '#2d4f79',
    canvasLight: '#375e81',
    canvas: '#28445f',
    canvasDeep: '#142638',
  },
  {
    id: 'more-builds',
    index: '06',
    title: '更多实验',
    english: 'MORE BUILDS',
    eyebrow: '持续生长的个人实验室',
    summary: '三个轻量实验：求职决策、生活记录与桌面陪伴。它们展示我如何用 Agent 把想法快速做成可试原型。',
    proof: ['求职情报终端', '此刻', 'Codex 桌面搭档'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/06-more-builds.avif',
    caseHref: '/works/other-builds',
    demoUrl: null,
    githubUrl: 'https://github.com/violetloveAI?tab=repositories',
    caseLabel: '进入个人实验室',
    accent: '#7faf91',
    accentSoft: '#c4ddca',
    accentDeep: '#315b42',
    canvasLight: '#467457',
    canvas: '#31533e',
    canvasDeep: '#182c21',
  },
] as const satisfies readonly WorkProject[];

export const workExperiments = [
  {
    title: '求职情报终端',
    english: 'N.G.I.T.',
    summary: '把 JD 与简历拆成事实、推断、未知和证据，辅助判断是否值得投递',
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/07-job-intel-terminal.avif',
    primaryUrl: 'https://github.com/violetloveAI/ngit-intelligence-terminal',
    primaryLabel: 'GitHub',
    secondaryUrl: null,
    secondaryLabel: null,
  },
  {
    title: '此刻',
    english: 'LIFE FLOW JOURNAL',
    summary: '把每日焦点、想法、饮食、运动与收藏收进个人生活时间线',
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/08-life-moment.avif',
    primaryUrl: 'https://violetloveai.github.io/life-flow-journal-demo/',
    primaryLabel: 'Demo',
    secondaryUrl: 'https://github.com/violetloveAI/life-flow-journal-demo',
    secondaryLabel: 'GitHub',
  },
  {
    title: 'Codex 桌面搭档',
    english: 'VIOLET CODEX PET',
    summary: '用语音、气泡、待办与边缘探头呈现 Codex 任务状态的 macOS 桌面搭档',
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/09-codex-companion.avif',
    primaryUrl: 'https://github.com/violetloveAI/violet-codex-pet',
    primaryLabel: 'GitHub',
    secondaryUrl: null,
    secondaryLabel: null,
  },
] as const satisfies readonly WorkExperiment[];
