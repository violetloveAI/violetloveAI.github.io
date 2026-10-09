export type Project = {
  slug: string;
  title: string;
  englishTitle: string;
  eyebrow: string;
  summary: string;
  status: 'BUILDING' | 'PROTOTYPE' | 'AWARDED';
  type: string;
  proof: string[];
  tone: 'acid' | 'bone' | 'violet';
};

// 作品区唯一内容源：以后新增或修改项目，只需要维护这里。
export const projects: Project[] = [
  {
    slug: 'commerce-os',
    title: '跨境电商经营操作系统',
    englishTitle: 'COMMERCE OS',
    eyebrow: 'REAL USER · BUSINESS WORKFLOW',
    summary: '从真实经营问题出发，把散落在表格、平台和人脑里的动作重新组织为可执行的 AI 工作流。',
    status: 'BUILDING',
    type: 'AI PRODUCT / DELIVERY',
    proof: ['真实用户：跨境电商经营者', '持续访谈与迭代', '业务闭环优先'],
    tone: 'acid',
  },
  {
    slug: 'qiheng',
    title: '启衡 AI 财务审核',
    englishTitle: 'QIHENG',
    eyebrow: 'FINANCE · HUMAN-IN-THE-LOOP',
    summary: '让规则、风险证据和人工判断在同一个审核界面内协作，而不是把“AI 审核”停留在黑盒结论。',
    status: 'PROTOTYPE',
    type: 'AI SOLUTION / FDE',
    proof: ['风险证据可追溯', '人工复核节点', '面向企业交付'],
    tone: 'bone',
  },
  {
    slug: 'last-human-employee',
    title: '最后一个人类员工',
    englishTitle: 'THE LAST HUMAN EMPLOYEE',
    eyebrow: 'HACKATHON · TWO-PERSON TEAM',
    summary: '把 AI 时代的职场焦虑变成一场可以被体验的游戏，并在极短周期内完成策划、开发与路演。',
    status: 'AWARDED',
    type: 'AI GAME / RAPID BUILD',
    proof: ['赛道二等奖', '专项奖', '负责人 / 主策 / 协同开发'],
    tone: 'violet',
  },
];
