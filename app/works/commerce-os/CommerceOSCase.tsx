import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';

const privacySafePreview = '/assets/cartoon-clay-v2/work-buttons-v3/web/01-commerce-cockpit.avif';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '匿名经营', english: 'DISCOVER',
    title: '不是做一个通用 ERP，而是先回答经营者每天会问什么。',
    body: '商品、销售、库存和 1688 货源散落在平台、CSV 与记忆里。第一版主动裁掉直播、招聘等大范围需求，把 MVP 收回经营判断。',
    proof: ['匿名经营场景', '持续访谈与范围收敛', '移动场景优先'],
    marker: 'ANONYMIZED / DAILY DECISIONS',
    desktop: privacySafePreview, desktopAlt: '跨境经营舱产品插画',
    phone: privacySafePreview, phoneAlt: '跨境经营舱产品插画',
    screenLabel: '经营总览', screenNote: '把销售窗口、经营简报和待处理事项收进第一屏，先回答“生意怎么样”。',
  },
  {
    index: '02', label: '商品身份', english: 'MODEL',
    title: '先给商品一个稳定身份，再让销售、图片和货源真正对上。',
    body: '平台标题会变化，不能充当永久主键。我把商品归并到稳定内部编号，让图片、销售记录与多个 1688 货源都能回到同一件商品。',
    proof: ['脱敏商品完成映射', '商品图片与编号关联', '标题与内部编号解耦'],
    marker: 'SALES → PRODUCT ID → SOURCE',
    desktop: privacySafePreview, desktopAlt: '跨境经营舱产品插画',
    phone: privacySafePreview, phoneAlt: '跨境经营舱产品插画',
    screenLabel: '商品库', screenNote: '稳定编号、商品图片、搜索与状态，让经营数据不再只靠模糊标题关联。',
  },
  {
    index: '03', label: '经营规则', english: 'DECIDE',
    title: '真正有价值的是把“库存”拆清，而不是多做一个数字。',
    body: '未盘点不等于库存为零，在途也不等于可售；退款后是否恢复库存必须人工确认。补货建议只在这些口径清楚后才可信。',
    proof: ['未盘点 ≠ 0', '在途 ≠ 可售', '30 日销量进入补货判断'],
    marker: 'COUNT → VERIFY → REPLENISH',
    desktop: privacySafePreview, desktopAlt: '跨境经营舱产品插画',
    phone: privacySafePreview, phoneAlt: '跨境经营舱产品插画',
    screenLabel: '库存与补货', screenNote: '把 90 天销量、库存和在途放在同一页面，帮助经营者判断“现在该做什么”。',
  },
  {
    index: '04', label: '我的角色', english: 'DELIVER',
    title: '我负责业务怎么被理解，也负责它如何被验证和持续迭代。',
    body: '我承担用户访谈、需求收敛、业务规则与数据模型、验收标准、移动体验、QA、安全边界和部署决策，并使用 Coding Agents 加速实现。',
    proof: ['Product Owner', 'AI-assisted Builder', '从问题到验收全链路'],
    marker: 'OWNER / MODELER / ITERATOR',
    desktop: privacySafePreview, desktopAlt: '跨境经营舱产品插画',
    phone: privacySafePreview, phoneAlt: '跨境经营舱产品插画',
    screenLabel: '移动经营舱', screenNote: '五个移动端主模块把销售分析、商品、库存、货源与经营数据连成工作流。',
  },
];

export function CommerceOSCase() {
  return (
    <ClayProductCase
      index="01"
      kind="ANONYMIZED PRODUCT CASE"
      englishName="COMMERCE OS"
      name="commerce-os"
      status={['ANONYMIZED CASE', 'MOBILE-FIRST PWA']}
      titleBefore="把散落在平台、表格和记忆里的"
      titleAccent="经营判断，"
      titleAfter="收进一部手机。"
      summary="基于匿名经营场景与脱敏数据，从销售数据出发，重新连接商品、库存、1688 货源与补货决策。"
      resultLead="不是通用 ERP，"
      resultAccent="是经营者的移动经营舱。"
      metrics={[
        { label: 'USER', value: '匿名经营场景' },
        { label: 'PRODUCTS', value: '脱敏商品映射' },
        { label: 'WINDOW', value: '销售趋势窗口' },
        { label: 'FORM', value: '移动优先 PWA' },
      ]}
      storySteps={storySteps}
      workflow="INTERVIEW → MODEL → BUILD → VERIFY → ITERATE"
      demoUrl="https://violetloveai.github.io/commerce-os-crossborder/"
      githubUrl="https://github.com/violetloveAI/commerce-os-crossborder"
      clayArt="/projects/clay-subjects/commerce-cockpit.webp"
      deviceMode="phone"
      accent="#f4bc4d"
      accentDeep="#9b5b28"
      accentSoft="#df9272"
    />
  );
}
