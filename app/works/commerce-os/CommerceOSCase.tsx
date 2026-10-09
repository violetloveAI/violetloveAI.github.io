import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '经营洞察', english: 'DISCOVER',
    title: '让平台报表，服务每天的经营判断。',
    body: '导入 Depop 销售文件，汇总收入、销量与商品表现，让卖家用手机快速掌握经营状况。',
    proof: ['Depop 报表导入', '移动经营工作台'],
    marker: 'REAL OPERATOR / DAILY DECISIONS',
    desktop: '/projects/commerce-os/overview.png', desktopAlt: '跨境经营舱经营总览界面',
    phone: '/projects/commerce-os/overview.png', phoneAlt: '跨境经营舱手机端经营总览',
    screenLabel: '经营总览', screenNote: '把销售窗口、经营简报和待处理事项收进第一屏，先回答“生意怎么样”。',
  },
  {
    index: '02', label: '商品身份', english: 'MODEL',
    title: '商品名称可变，内部编号不变。',
    body: '为 335 款商品建立稳定编号，关联商品与销售记录；即使标题修改，经营数据也能持续追溯。',
    proof: ['335 款商品建模', '跨记录稳定关联'],
    marker: 'SALES → PRODUCT ID → INSIGHT',
    desktop: '/projects/commerce-os/product-library.png', desktopAlt: '跨境经营舱商品库界面',
    phone: '/projects/commerce-os/product-library.png', phoneAlt: '跨境经营舱手机端商品库',
    screenLabel: '商品库', screenNote: '稳定编号、商品图片、搜索与状态，让经营数据不再只靠模糊标题关联。',
  },
  {
    index: '03', label: '经营规则', english: 'DECIDE',
    title: '结合销量与库存，辅助补货决策。',
    body: '区分未盘点、在途与可售库存，结合近 30 日销量生成补货建议，避免把未知库存当作零库存。',
    proof: ['销量驱动补货', '库存状态分层'],
    marker: 'COUNT → VERIFY → REPLENISH',
    desktop: '/projects/commerce-os/product-detail.png', desktopAlt: '跨境经营舱商品库存与补货详情',
    phone: '/projects/commerce-os/product-detail.png', phoneAlt: '跨境经营舱手机端商品详情',
    screenLabel: '库存与补货', screenNote: '把 90 天销量、库存和在途放在同一页面，帮助经营者判断“现在该做什么”。',
  },
  {
    index: '04', label: '我的角色', english: 'DELIVER',
    title: '把卖家的经营经验，转成产品规则。',
    body: '从卖家访谈到商品建模、库存规则与移动体验，我主导需求和产品设计，借助 AI 完成构建与验收。',
    proof: ['业务建模与产品设计', '端到端推进交付'],
    marker: 'OWNER / MODELER / ITERATOR',
    desktop: '/projects/commerce-os/overview.png', desktopAlt: '跨境经营舱经营总览界面',
    phone: '/projects/commerce-os/overview.png', phoneAlt: '跨境经营舱手机端经营总览',
    screenLabel: '移动经营舱', screenNote: '经营总览、商品、选品、库存与数据五个模块，围绕卖家的日常决策组织。',
  },
];

export function CommerceOSCase({ embedded = false }: { embedded?: boolean }) {
  return (
    <ClayProductCase
      index="01"
      kind="跨境电商 · 卖家定制"
      englishName="COMMERCE OS"
      name="commerce-os"
      status={['Depop 垂类头部卖家', '335 款商品建模']}
      titleBefore="把跨境经营判断，"
      titleAccent="收进一部手机。"
      titleAfter=""
      summary="为 Depop 垂类头部卖家定制，把商品、销售与补货判断整合进移动工作台。"
      introHighlights={[
        { title: '商品可追溯', detail: '稳定编号串联商品与销售记录。' },
        { title: '补货有依据', detail: '结合近 30 日销量与库存状态。' },
        { title: '经营随身看', detail: '手机掌握收入、销量与商品表现。' },
      ]}
      resultLead="从销售报表，"
      resultAccent="到经营决策。"
      metrics={[
        { label: '服务对象', value: '垂类头部卖家' },
        { label: '商品管理', value: '335 款' },
        { label: '数据接入', value: 'Depop CSV' },
        { label: '核心能力', value: '经营分析与补货' },
      ]}
      storySteps={storySteps}
      workflow="INTERVIEW → MODEL → BUILD → VERIFY → ITERATE"
      demoUrl="https://violetloveai.github.io/commerce-os-interview-demo/"
      githubUrl="https://github.com/violetloveAI/commerce-os-crossborder"
      clayArt="/projects/clay-subjects/commerce-cockpit.webp"
      deviceMode="phone"
      phoneLayout="three-panel"
      accent="#f4bc4d"
      accentDeep="#9b5b28"
      accentSoft="#df9272"
      canvasLight="#6d4337"
      canvas="#4a302b"
      canvasDeep="#241b19"
      embedded={embedded}
    />
  );
}
