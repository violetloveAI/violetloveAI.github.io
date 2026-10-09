import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '产品取舍', english: 'DEFINE',
    title: '看懂家人消息，沿用熟悉的微信。',
    body: '我把核心需求收敛为“理解已有消息”：老人选截图看解释，子女制作内容后通过微信分享，让家人沿用熟悉的沟通习惯。',
    proof: ['聚焦消息理解', '老人 / 子女双路径'],
    marker: 'UNDERSTAND THE MESSAGE',
    desktop: '/projects/jialihua/elder-home.png', desktopAlt: '家里话老人端，主动选择截图并查看消息解释',
    phone: '/projects/jialihua/elder-home.png', phoneAlt: '家里话老人端手机界面，主动选择要理解的消息',
    screenLabel: '从已有消息开始', screenNote: '从微信、朋友圈和短信截图进入解释，接住长辈日常遇到的阅读难题。',
  },
  {
    index: '02', label: '老人阅读', english: 'READ & LISTEN',
    title: '看大字，也听熟悉的河南话。',
    body: '我用四档字号、三档语速和普通话 / 河南话朗读适配长辈，把“倍速”改成“读慢一点”，让操作接近日常表达。',
    proof: ['28–48 px 四档字号', '普通话 / 河南话朗读'],
    marker: 'LARGE TYPE / FAMILIAR VOICE',
    desktop: '/projects/jialihua/elder-explanation.png', desktopAlt: '家里话老人端的大字消息解释与河南话朗读界面',
    phone: '/projects/jialihua/elder-explanation.png', phoneAlt: '家里话把外孙女的消息转换为大字解释，可播放河南话',
    screenLabel: '大字解释与方言朗读', screenNote: '原图可放大、解释用大字，配合慢读与熟悉的方言，让消息更容易看清、听懂。',
  },
  {
    index: '03', label: '子女制作', english: 'MAKE & SHARE',
    title: '把一份关心，做成长图和有声视频。',
    body: '子女核对文字、选择配图和导出语言。Canvas 在浏览器生成长图；Node 服务调用 TTS，并用 FFmpeg 合成有声视频。',
    proof: ['大字长图分享', 'TTS + FFmpeg 有声视频'],
    marker: 'CHECK → EXPORT → SHARE',
    desktop: '/projects/jialihua/helper-export.png', desktopAlt: '家里话子女端的大字长图与有声视频导出界面',
    phone: '/projects/jialihua/helper-export.png', phoneAlt: '家里话子女端可选择导出语言，预览大字长图或有声视频',
    screenLabel: '给家人的图与声音', screenNote: '子女核对文字、搭配图片并选择语言，将内容做成适合微信分享的长图和有声视频。',
  },
  {
    index: '04', label: '获奖交付', english: 'BUILD & DELIVER',
    title: '一个人，从产品定义走到赛道第一。',
    body: '独立完成产品定义、双端交互与 AI 辅助开发，串起模型解读、TTS 和视频合成，获 BAYTECH 2026 AI 应用与工程赛道第一名。',
    proof: ['独立 0→1', '产品 / 交互 / 工程交付'],
    marker: 'SOLO ENTRANT / TRACK WINNER',
    desktop: '/projects/jialihua/elder-explanation.png', desktopAlt: '家里话获奖作品的消息解释与朗读界面',
    phone: '/projects/jialihua/elder-explanation.png', phoneAlt: '家里话产品界面：大字解释、原文对照与方言朗读',
    screenLabel: '从需求到完整应用', screenNote: 'React 与 Node 串起截图解读、语音朗读和视频生成，兼顾长辈体验与工程交付。',
  },
];

export function JialihuaCase({ embedded = false }: { embedded?: boolean }) {
  return (
    <ClayProductCase
      index="2026.09"
      kind="AI 应用与工程赛道第一名"
      englishName="JIALIHUA"
      name="jialihua"
      status={['独立参赛', '适老 AI 应用']}
      titleBefore="家里话"
      titleAccent="看清家人的话，"
      titleAfter="听见熟悉的乡音。"
      summary="独立完成适老 AI 应用：把微信、朋友圈与短信变成大字解释和乡音朗读，让子女把关心做成可分享的图文视频。"
      introHighlights={[
        { title: '消息解读', detail: '微信截图，转成易懂的大字解释。' },
        { title: '乡音朗读', detail: '普通话与河南话，字号语速可调。' },
        { title: '关心传递', detail: '生成长图与有声视频，方便分享。' },
      ]}
      resultLead="BAYTECH 2026 "
      resultAccent="黑客松冠军"
      highlightResult
      metrics={[
        { label: '获奖赛道', value: 'AI 应用与工程' },
        { label: '赛道成绩', value: '第一名' },
        { label: '个人角色', value: '独立参赛与交付' },
        { label: '比赛规模', value: '100+ 参赛选手' },
        { label: '现金奖励 · 全场最高', value: 'HK$8,000' },
        { label: 'Token 资源', value: 'US$1,500 等值' },
      ]}
      storySteps={storySteps}
      workflow="截图解读 → 大字解释 → 乡音朗读 → 图文视频 → 微信分享"
      demoUrl="https://violetloveai.github.io/jialihua-demo/"
      githubUrl="https://github.com/violetloveAI/jialihua-demo"
      clayArt="/projects/jialihua/elder-art.png"
      deviceMode="phone"
      phoneLayout="three-panel"
      accent="#f2c86d"
      accentDeep="#98622f"
      accentSoft="#d8ad83"
      canvasLight="#f2efdf"
      canvas="#e1e7d8"
      canvasDeep="#d6ded0"
      embedded={embedded}
    />
  );
}
