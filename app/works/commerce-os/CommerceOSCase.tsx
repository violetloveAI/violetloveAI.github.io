'use client';

import { ClayProductCase, type ProductStoryStep } from '../_components/ClayProductCase';
import { useEmbeddedMode } from '../_components/useEmbeddedMode';

const privacySafePreview = '/assets/cartoon-clay-v2/work-buttons-v3/web/01-commerce-cockpit.avif';

const storySteps: readonly ProductStoryStep[] = [
  {
    index: '01', label: '匿名经营', english: 'DISCOVER',
    title: '先回答经营者每天最关心的问题。',
    body: '商品与销售数据散落在平台、CSV 和记忆里；第一版先让脱敏导出文件快速变成可读报表。',
    proof: ['匿名经营场景', '脱敏文件验证', '移动场景优先'],
    marker: 'ANONYMIZED / DAILY DECISIONS',
    desktop: privacySafePreview, desktopAlt: '跨境经营舱产品插画',
    phone: privacySafePreview, phoneAlt: '跨境经营舱产品插画',
    screenLabel: '经营总览', screenNote: '把销售窗口、经营简报和待处理事项收进第一屏，先回答“生意怎么样”。',
  },
  {
    index: '02', label: '商品身份', english: 'MODEL',
    title: '先整理商品身份，再为货源映射留出稳定接口。',
    body: '平台标题会变化。我用内部编号整理脱敏商品与销售记录；货源映射仍等待后续补录。',
    proof: ['脱敏商品数据', '标题与内部编号解耦', '货源映射待补录'],
    marker: 'SALES → PRODUCT ID → SOURCE',
    desktop: privacySafePreview, desktopAlt: '跨境经营舱产品插画',
    phone: privacySafePreview, phoneAlt: '跨境经营舱产品插画',
    screenLabel: '商品库', screenNote: '稳定编号、商品图片、搜索与状态，让经营数据不再只靠模糊标题关联。',
  },
  {
    index: '03', label: '经营规则', english: 'DECIDE',
    title: '把库存口径拆清，补货判断才可能可信。',
    body: '未盘点不等于零，在途不等于可售；这套规则已进入产品，仍需更多真实数据检验。',
    proof: ['未盘点 ≠ 0', '在途 ≠ 可售', '30 日销量进入补货判断'],
    marker: 'COUNT → VERIFY → REPLENISH',
    desktop: privacySafePreview, desktopAlt: '跨境经营舱产品插画',
    phone: privacySafePreview, phoneAlt: '跨境经营舱产品插画',
    screenLabel: '库存与补货', screenNote: '把 90 天销量、库存和在途放在同一页面，帮助经营者判断“现在该做什么”。',
  },
  {
    index: '04', label: '我的角色', english: 'DELIVER',
    title: '我负责把业务理解做成可验证的产品。',
    body: '我承担需求澄清、范围、规则、数据模型、移动体验、QA 与迭代决策，并用 Coding Agent 加速实现。',
    proof: ['Product Owner', 'AI-assisted Builder', '从问题到验收全链路'],
    marker: 'OWNER / MODELER / ITERATOR',
    desktop: privacySafePreview, desktopAlt: '跨境经营舱产品插画',
    phone: privacySafePreview, phoneAlt: '跨境经营舱产品插画',
    screenLabel: '移动经营舱', screenNote: '五个移动端主模块把销售分析、商品、库存、货源与经营数据连成工作流。',
  },
];

export function CommerceOSCase({ embedded = false }: { embedded?: boolean }) {
  const isEmbedded = useEmbeddedMode(embedded);

  return (
    <ClayProductCase
      index="01"
      kind="ANONYMIZED PRODUCT CASE"
      englishName="COMMERCE OS"
      name="commerce-os"
      status={['ANONYMIZED CASE', 'SUPPLY MAP NEXT']}
      titleBefore="把跨境经营判断，"
      titleAccent="收进一部手机。"
      titleAfter=""
      summary="基于匿名经营场景与脱敏数据，把销售文件转成可读报表，并继续验证库存、货源与补货判断。"
      resultLead="脱敏销售数据已进入产品，"
      resultAccent="货源链路仍在验证。"
      metrics={[
        { label: 'USER', value: '匿名经营场景' },
        { label: 'CATALOG', value: '脱敏商品映射' },
        { label: 'IMPORT', value: '脱敏 CSV 导入' },
        { label: 'NEXT', value: '货源映射补录' },
      ]}
      storySteps={storySteps}
      workflow="INTERVIEW → MODEL → BUILD → VERIFY → ITERATE"
      demoUrl="https://violetloveai.github.io/commerce-os-crossborder/"
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
      embedded={isEmbedded}
    />
  );
}
