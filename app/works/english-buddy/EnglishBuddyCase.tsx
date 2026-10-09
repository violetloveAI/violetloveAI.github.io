import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '产品设计', english: 'SHARED CONTEXT',
    title: '五位搭子，围绕同一任务接力。',
    body: '把阅读、词汇、听力、口语与写作串进同一次练习。用户按需组队、指定领队，各专项共享原句、作答与提示，接着用户的进度继续帮助。',
    proof: ['专项难度独立调整', '训练与陪伴双模式'],
    marker: 'ONE TASK / FIVE SPECIALISTS',
    desktop: '/projects/english-buddy/showcase-overview.png', desktopAlt: '英语搭子团演示概览，展示五位专项搭子与共同任务设计',
    phone: '/projects/english-buddy/team-selection.png', phoneAlt: '英语搭子团今日学习页，可选择五位搭子并指定领队',
    screenLabel: '围绕共同任务组队', screenNote: '按时长、兴趣与学习偏好组队，让专项练习服务于同一个目标。',
  },
  {
    index: '02', label: '协作逻辑', english: 'CONTEXTUAL HANDOFF',
    title: '在卡住的地方，接上合适的帮助。',
    body: '读到 expired 却理解有误时，小书虫把原句、作答与卡点交给词芽芽。辨清词义后回原题重试，再用优惠券过期的生活情境练习迁移。',
    proof: ['错误触发专项交接', '辨词 → 重试 → 迁移'],
    marker: 'READING → VOCABULARY',
    desktop: '/projects/english-buddy/collaboration-handoff.png', desktopAlt: '小书虫把阅读误解与原句交给词芽芽继续帮助',
    phone: '/projects/english-buddy/wrong-answer.png', phoneAlt: '英语搭子团中答错阅读题后在原题下展开词芽芽帮助',
    screenLabel: '从阅读卡点接入词汇帮助', screenNote: '帮助直接出现在原题下方，保留上下文，减少切换与重复描述。',
  },
  {
    index: '03', label: '体验衔接', english: 'STATE TRANSFER',
    title: '从听懂、说出，到写成自己的话。',
    body: '所选搭子接续复听、口语表达与消息写作，支持录音或文字输入。确认后的表达直接成为写作素材，同时保留原话、提示记录与已有草稿。',
    proof: ['用户原话跨角色承接', '草稿与过程状态保留'],
    marker: 'EXPRESSION → WRITING',
    desktop: '/projects/english-buddy/expression-to-writing.png', desktopAlt: '话匣子确认表达后把同一段原话交给小笔头继续写消息',
    phone: '/projects/english-buddy/writing-source.png', phoneAlt: '小笔头承接用户确认表达并保留来源的写作界面',
    screenLabel: '把口语表达接入写作', screenNote: '沿用用户确认的表达，保留来源、提示和草稿状态，让练习前后连贯。',
  },
  {
    index: '04', label: '交付反馈', english: 'DELIVERY & FEEDBACK',
    title: '从协作设计，走到真实使用。',
    body: '将组队、练习、跨角色交接与回顾串成完整体验，交付可试用 Demo。产品已有真实用户使用，并收到投资者对产品的正向反馈。',
    proof: ['真实用户使用', '投资者正向反馈'],
    marker: 'REAL USERS / EARLY FEEDBACK',
    desktop: '/projects/english-buddy/review-evidence.png', desktopAlt: '英语搭子团回顾概览，展示五位搭子与分项学习记录',
    phone: '/projects/english-buddy/review-calendar.png', phoneAlt: '英语搭子团回顾日历，区分演示历史与本轮学习',
    screenLabel: '让练习过程可以回顾', screenNote: '通过日历与分项记录回看学习过程，串起练习、帮助和重试。',
  },
];

export function EnglishBuddyCase({ embedded = false }: { embedded?: boolean }) {
  return (
    <ClayProductCase
      index="2026.09"
      kind="协作式英语学习 Demo"
      englishName="ENGLISH BUDDY TEAM"
      name="english-buddy"
      status={['产品方向与体验设计', '团队协作交付']}
      titleBefore="英语搭子团"
      titleAccent="读、听、说、写，"
      titleAfter="围绕同一任务接力。"
      summary="让五位专项搭子共享上下文，把碎片练习连成完整体验。我担任队长，主导产品方向、体验串联与团队交付。"
      introHighlights={[
        { title: '共同任务', detail: '读、听、说、写围绕同一目标。' },
        { title: '卡点接力', detail: '带着原句与卡点，接上专项帮助。' },
        { title: '保留进度', detail: '原话、提示与草稿贯穿整次练习。' },
      ]}
      resultLead="已进入真实使用，"
      resultAccent="获得早期正向反馈"
      metrics={[
        { label: '实际使用', value: '已有真实用户' },
        { label: '投资者反馈', value: '早期正向反馈' },
        { label: '专项角色', value: '5 位搭子' },
        { label: '我的职责', value: '产品方向与体验串联' },
      ]}
      storySteps={storySteps}
      workflow="共同任务 → 专项练习 → 上下文交接 → 学习回顾"
      demoUrl="https://violetloveai.github.io/english-buddy-team/"
      githubUrl="https://github.com/violetloveAI/english-buddy-team"
      clayArt="/projects/english-buddy/character-lineup.png"
      deviceMode="phone"
      phoneLayout="three-panel"
      accent="#91ad72"
      accentDeep="#315b42"
      accentSoft="#dce9cb"
      canvasLight="#7897a0"
      canvas="#4c6f70"
      canvasDeep="#244447"
      embedded={embedded}
    />
  );
}
