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
    summary: '基于匿名经营场景，把销量、商品、库存、1688 货源与补货判断串成一个移动优先的经营系统。',
    proof: ['匿名经营场景', '脱敏演示数据', '移动优先 PWA', '持续迭代'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/01-commerce-cockpit.avif',
    caseHref: '/works/commerce-os',
    demoUrl: 'https://violetloveai.github.io/commerce-os-crossborder/',
    githubUrl: 'https://github.com/violetloveAI/commerce-os-crossborder',
    caseLabel: '查看完整案例',
  },
  {
    id: 'enterprise-support',
    index: '02',
    title: '企服智诊',
    english: 'ENTERPRISE SUPPORT COPILOT',
    eyebrow: '基于证据链的 ERP 故障诊断助手',
    summary: '把知识检索、系统取证、证据校验和人工审批串成可观察链路，让企业支持从“凭经验回答”走向受控诊断。',
    proof: ['54 条合成案例', '6 类 ERP 故障', '写操作 HITL', '0 次执行失败'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/02-enterprise-diagnosis.avif',
    caseHref: '/works/enterprise-support',
    demoUrl: 'https://violetloveai.github.io/enterprise-support-copilot/',
    githubUrl: 'https://github.com/violetloveAI/enterprise-support-copilot',
    caseLabel: '查看完整案例',
  },
  {
    id: 'qiheng',
    index: '03',
    title: '启衡智审',
    english: 'QIHENG AI AUDIT',
    eyebrow: '可追溯的 AI 财务预审核工作台',
    summary: '让 AI 负责找齐事实、规则与证据并回写意见，把最终决定权留给财务人员。',
    proof: ['300 张唯一单据', 'ERP 写回 300/300', '飞书核验 300/300', '人保留决定权'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/03-qiheng-audit.avif',
    caseHref: '/works/qiheng-audit',
    demoUrl: 'https://violetloveai.github.io/qiheng-ai-audit/',
    githubUrl: 'https://github.com/violetloveAI/qiheng-ai-audit',
    caseLabel: '查看完整案例',
  },
  {
    id: 'tutor-log',
    index: '04',
    title: '课时簿',
    english: 'TUTOR LOG',
    eyebrow: '记录课表课时与薪酬的家教助手',
    summary: '为一位匿名独立教师，把课表、学生、课时记录与实际薪酬装进一部每天会被使用的 App。',
    proof: ['匿名教师场景', '0→1 全流程', '移动端验证', '持续迭代'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/04-tutor-log.avif',
    caseHref: '/works/tutor-log',
    demoUrl: 'https://violetloveai.github.io/yang-teacher-tutor/',
    githubUrl: 'https://github.com/violetloveAI/yang-teacher-tutor',
    caseLabel: '查看完整案例',
  },
  {
    id: 'final-human',
    index: '05',
    title: 'Final Human',
    english: 'FINAL HUMAN',
    eyebrow: '追查 AI 幻觉的互动推理调查游戏',
    summary: '把 AI 幻觉风险变成一场必须亲自追问证据、作出判断并承担结果的互动调查游戏。',
    proof: ['游戏赛道亚军', '跨赛道专项奖', '完整游戏 + 路演', '负责人 / 主策'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/05-final-human.avif',
    caseHref: '/works/final-human',
    demoUrl: 'https://violetloveai.github.io/finalhuman/',
    githubUrl: 'https://github.com/violetloveAI/finalhuman',
    caseLabel: '查看获奖案例',
  },
  {
    id: 'more-builds',
    index: '06',
    title: '更多实验',
    english: 'MORE BUILDS',
    eyebrow: '持续生长的个人实验室',
    summary: '三个更轻、更个人的构建：从求职决策到生活记录，再到桌面陪伴，让新想法尽快变成可试的原型。',
    proof: ['求职情报终端', '此刻', 'Codex 桌面搭档'],
    image: '/assets/cartoon-clay-v2/work-buttons-v3/web/06-more-builds.avif',
    caseHref: '/works/other-builds',
    demoUrl: null,
    githubUrl: 'https://github.com/violetloveAI?tab=repositories',
    caseLabel: '进入个人实验室',
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
