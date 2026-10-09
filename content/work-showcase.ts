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
    id: 'jialihua',
    index: '01',
    title: '家里话',
    english: 'JIALIHUA',
    eyebrow: '让长辈看清消息、听见熟悉乡音',
    summary: '独立打造适老 AI 应用，将微信消息转成大字解释、乡音朗读与分享视频，获黑客松赛道第一。',
    proof: ['黑客松赛道第一', '独立 0→1', '老人 / 子女双端', 'AI + 音视频链路'],
    image: '/assets/cartoon-clay-v2/work-buttons-v4/jialihua.webp',
    caseHref: '/works/jialihua',
    demoUrl: 'https://violetloveai.github.io/jialihua-demo/',
    githubUrl: 'https://github.com/violetloveAI/jialihua-demo',
    caseLabel: '查看获奖案例',
    accent: '#d8ad83',
    accentSoft: '#f2d9ad',
    accentDeep: '#6b4b2e',
    canvasLight: '#f2efdf',
    canvas: '#e1e7d8',
    canvasDeep: '#d6ded0',
  },
  {
    id: 'commerce-os',
    index: '02',
    title: '跨境经营舱',
    english: 'COMMERCE OS',
    eyebrow: '为 Depop 垂类头部卖家定制的经营工作台',
    summary: '把商品、销售与补货判断整合进移动工作台，以稳定编号串联 335 款商品与经营数据。',
    proof: ['Depop 垂类头部卖家', '335 款商品建模', '销售报表自动汇总', '销量驱动补货建议'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/01-commerce-cockpit.avif',
    caseHref: '/works/commerce-os',
    demoUrl: 'https://violetloveai.github.io/commerce-os-interview-demo/',
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
    index: '03',
    title: '企服智诊',
    english: 'ENTERPRISE SUPPORT COPILOT',
    eyebrow: '把一线 ERP 支持经验变成诊断工作台',
    summary: '串联问题定位、诊断依据与处置建议，把分散的 ERP 支持经验整理成可追溯、可复用的诊断流程。',
    proof: ['一线 ERP 支持经验', '6 类故障场景', '54 条评测案例', '诊断与验收设计'],
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
    id: 'english-buddy',
    index: '04',
    title: '英语搭子团',
    english: 'ENGLISH BUDDY TEAM',
    eyebrow: '读、听、说、写，围绕同一任务接力',
    summary: '五位专项搭子共享学习上下文，围绕用户卡点接续帮助；已获得早期用户使用与投资者正向反馈。',
    proof: ['真实用户使用', '投资者正向反馈', '五角色协作设计', '队长 / 产品方向'],
    image: '/assets/cartoon-clay-v2/work-buttons-v4/english-buddy.webp',
    caseHref: '/works/english-buddy',
    demoUrl: 'https://violetloveai.github.io/english-buddy-team/',
    githubUrl: 'https://github.com/violetloveAI/english-buddy-team',
    caseLabel: '查看协作案例',
    accent: '#8fad7a',
    accentSoft: '#dce9cb',
    accentDeep: '#315b42',
    canvasLight: '#7897a0',
    canvas: '#4c6f70',
    canvasDeep: '#244447',
  },
  {
    id: 'qiheng',
    index: '05',
    title: '启衡智审',
    english: 'QIHENG AI AUDIT',
    eyebrow: '观猹 FDE 课程 · AI 报销审核',
    summary: '打通 AI 预审、ERP 意见回写与飞书协同，在 FDE 课程项目中完成 300 单回归，形成财务审核闭环。',
    proof: ['独立全栈交付', '四金额业务建模', 'ERP / 飞书集成', '300 单回归通过'],
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
    index: '06',
    title: '课时簿',
    english: 'TUTOR LOG',
    eyebrow: '把排课、教学与收入连成一套工作流',
    summary: '从真实家教工作流出发，独立交付 iPhone 私人版，连通排课、教学记录与收款，并将备课和通勤纳入真实时薪。',
    proof: ['老师日常使用', '独立 0→1 交付', '真实时薪核算', '离线与加密备份'],
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
    id: 'more-builds',
    index: '07',
    title: '更多创作',
    english: 'MORE CREATIONS',
    eyebrow: '持续生长的个人创作室',
    summary: '四个可试用的创作：互动推理、公共答案共创、双人成长与桌面陪伴。',
    proof: ['Final Human', '活答案', '共星纪', 'Codex 桌面搭档'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/06-more-builds.avif',
    caseHref: '/works/other-builds',
    demoUrl: null,
    githubUrl: 'https://github.com/violetloveAI?tab=repositories',
    caseLabel: '进入个人创作室',
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
    title: 'Final Human',
    english: 'FINAL HUMAN',
    summary: '两人 24 小时完成追查 AI 幻觉的调查游戏，获游戏赛道亚军与一发入魂奖',
    image: '/projects/final-human/opening.webp',
    primaryUrl: 'https://violetloveai.github.io/finalhuman/',
    primaryLabel: 'Demo',
    secondaryUrl: 'https://github.com/violetloveAI/finalhuman',
    secondaryLabel: 'GitHub',
  },
  {
    title: '共星纪',
    english: 'DUAL LIFE UNIVERSE',
    summary: '把双人记录与共同回忆设计成合作型生活 RPG，用远征任务和成长视图呈现日常进步',
    image: '/projects/other-builds/gongxingji-03.webp',
    primaryUrl: 'https://violetloveai.github.io/gongxingji-showcase-demo/',
    primaryLabel: 'Demo',
    secondaryUrl: 'https://github.com/violetloveAI/gongxingji-showcase-demo',
    secondaryLabel: 'GitHub',
  },
  {
    title: '活答案',
    english: 'LIVE ANSWERS',
    summary: '串起经历贡献、版本对比与审阅发布，让公共答案持续更新，每次补充都有据可查',
    image: '/projects/other-builds/live-answers-home.png',
    primaryUrl: 'https://violetloveai.github.io/zhihu-live-answers/',
    primaryLabel: 'Demo',
    secondaryUrl: 'https://github.com/violetloveAI/zhihu-live-answers',
    secondaryLabel: 'GitHub',
  },
  {
    title: 'Codex 桌面搭档',
    english: 'VIOLET CODEX PET',
    summary: '用本地语音、任务气泡与九组动画呈现 Codex 任务状态，把桌面反馈做成有陪伴感的交互',
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/09-codex-companion.avif',
    primaryUrl: 'https://violetloveai.github.io/violet-codex-pet-demo/',
    primaryLabel: 'Demo',
    secondaryUrl: 'https://github.com/violetloveAI/violet-codex-pet',
    secondaryLabel: 'GitHub',
  },
] as const satisfies readonly WorkExperiment[];
