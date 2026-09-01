'use client';

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lifeMediaByInterest, type LifeMedia } from '../content/life-media';
import { workProjects } from '../content/work-showcase';
import educationContent from '../public/education-page/content.json';
import { LiquidCursor } from './LiquidCursor';
import { SensoryLayer } from './SensoryLayer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = [
  { index: '01', label: 'AI 辅助构建', english: 'WORKS', href: '#work', image: '/assets/cartoon-clay-v2/01-navigation/01-ai-assisted-building.webp', width: 2043, height: 770 },
  { index: '02', label: '工作 · 打怪升级', english: 'CAREER', href: '#career', image: '/assets/cartoon-clay-v2/01-navigation/02-career.webp', width: 1672, height: 941 },
  { index: '03', label: '教育经历', english: 'EDUCATION', href: '#education', image: '/assets/cartoon-clay-v2/01-navigation/03-education.webp', width: 1672, height: 941 },
  { index: '04', label: '生活与兴趣', english: 'LIFE', href: '#life', image: '/assets/cartoon-clay-v2/01-navigation/04-life-interests.webp', width: 1672, height: 941 },
  { index: '05', label: '联系我', english: 'CONTACT', href: '#contact', image: '/assets/cartoon-clay-v2/01-navigation/05-contact.webp', width: 1672, height: 941 },
] as const;

const contactEntries = [
  { id: 'email', index: '01', label: '邮箱', english: 'EMAIL', image: '/assets/cartoon-clay-v2/06-contact/01-email.webp', width: 1774, height: 887, value: '982928723@qq.com', note: '目前全职求职 FDE；深圳、异地、出差和驻场机会均可沟通。', href: 'mailto:982928723@qq.com' },
  { id: 'wechat', index: '02', label: '微信', english: 'WECHAT', image: '/assets/cartoon-clay-v2/06-contact/02-wechat.webp', width: 1942, height: 809, value: '沟通后提供', note: '微信暂不在公开页面展示，邮件联系后可以直接添加。', href: null },
  { id: 'github', index: '03', label: 'GitHub', english: 'GITHUB', image: '/assets/cartoon-clay-v2/06-contact/03-github.webp', width: 2043, height: 770, value: 'violetloveai', note: '查看公开项目、代码，以及每个作品真实的实现边界。', href: 'https://github.com/violetloveai' },
  { id: 'resume', index: '04', label: '简历', english: 'RESUME', image: '/assets/cartoon-clay-v2/06-contact/04-resume-download.webp', width: 2172, height: 724, value: 'FDE 求职材料', note: '一页简历、完整履历与项目作品集可按岗位需要提供。', href: null },
] as const;

const downloads = [
  { name: '一页中文简历', meta: '快速了解 · 1 PAGE', image: '/assets/cartoon-clay-v2/resume-buttons/01-one-page-chinese-resume.webp' },
  { name: '完整求职简历', meta: '经历与能力 · FULL CV', image: '/assets/cartoon-clay-v2/resume-buttons/02-full-job-resume.webp' },
  { name: 'FDE 项目作品集', meta: '项目证据 · CASEBOOK', image: '/assets/cartoon-clay-v2/resume-buttons/03-fde-project-portfolio.webp' },
] as const;

const careerStages = [
  {
    id: 'delivery-management', level: 'LV.01', role: '交付管理', tabLabel: '交付管理', type: '实习', period: '2023.09—2023.12', altitude: '理解交付',
    company: '企业软件团队 · 大型项目交付部', location: '深圳 · 知识赋能',
    quest: '第一次站到交付的中间', metric: '知识被理解、被采用，交付才算发生。',
    summary: '我从总部知识赋能活动开始，站在讲师、学员和交付团队之间，把复杂内容变成一场场能顺利抵达现场的培训。也第一次确认：我擅长的不只是完成后台任务，更是把人和信息组织起来。',
    evidence: [
      { value: '多城', label: '线下培训独立支撑' },
      { value: '数十场', label: '线上直播全流程' },
      { value: '高满意度', label: '会务体验' },
    ],
    stories: [
      {
        id: 'training-tour', label: '线下交付', eyebrow: '01 / OFFLINE DELIVERY',
        title: '把培训真正送到多座城市',
        summary: '独立支撑多座城市的线下培训，在讲师、学员、场地与交付团队之间，把复杂信息组织成可落地的会务流程。',
        proof: ['多城独立支撑', '会务体验保持高满意度', '讲师 · 学员 · 场地 · 会务协同'],
        media: {
          kind: 'gallery',
          label: '培训交付 · 2 张现场记录',
          items: [
            { src: '/assets/career-personas/01-offline-delivery.webp', alt: '多城线下培训交付的黏土人物插画', label: '培训交付 · 多城协同' },
            { src: '/assets/career-personas/02-live-operations.webp', alt: '培训与直播运营的黏土人物插画', label: '培训交付 · 会务与直播' },
          ],
        },
      },
      {
        id: 'live-operations', label: '直播运营', eyebrow: '02 / LIVE OPERATIONS',
        title: '让数十场直播稳定抵达数千人次',
        summary: '承担主持、宣传、录制与复盘，把一次直播拆成可重复执行的链路，让知识不只“讲过”，还能够被稳定接收与回看。',
        proof: ['数十场线上直播', '累计数千人次观看', '主持 · 宣传 · 录制 · 复盘'],
        media: {
          kind: 'gallery',
          label: '直播运营 · 2 张工作记录',
          items: [
            { src: '/assets/career-personas/02-live-operations.webp', alt: '直播运营与课程组织的黏土人物插画', label: '直播运营 · 全流程组织' },
            { src: '/assets/career-personas/01-offline-delivery.webp', alt: '知识赋能与多方协同的黏土人物插画', label: '直播运营 · 多方协同' },
          ],
        },
      },
    ],
    skills: ['活动运营', '结构化表达', '多方协作'],
    image: '/assets/cartoon-clay-v2/career-evidence/01-delivery-management.webp', alt: '交付管理中的培训组织与直播协作场景插画',
  },
  {
    id: 'implementation-consultant', level: 'LV.02', role: '实施顾问', tabLabel: '实施顾问', type: '实习', period: '2024.01—2024.08', altitude: '进入系统',
    company: '企业软件团队 · 大型集团财务共享项目', location: '华南 · 项目现场',
    quest: '第一次进入大型企业系统建设', metric: '把脏数据、配置与问题清单，推到真正上线。',
    summary: '在大型集团财务共享融合项目里，我从总账、审批流、主数据和系统测试切入，逐步看懂一套系统如何跨过数据、权限、流程与协作的重重关卡，抵达上线与客户验收。',
    evidence: [
      { value: '万级', label: '客户与供应商主数据' },
      { value: '千余条', label: '凭证异常报告' },
      { value: '大型', label: '财务共享融合项目' },
    ],
    stories: [
      {
        id: 'master-data', label: '主数据治理', eyebrow: '01 / DATA MIGRATION',
        title: '把万级主数据推到可导入、可验收',
        summary: '用 SQL 提取 EAS 与星瀚客户、供应商数据，以 Excel 比对差异、定义清洗规则，再用 Python 统一社会信用代码，完成系统导入与信息部验收。',
        proof: ['万级客户与供应商数据', 'SQL · Excel · Python 联合处理', '完成系统导入与验收'],
        media: {
          kind: 'gallery',
          label: '主数据治理 · 1 张项目证据',
          items: [
            { src: '/assets/career-personas/03-master-data.webp', alt: '主数据治理与迁移的黏土人物插画', label: '主数据治理 · 数据迁移' },
          ],
        },
      },
      {
        id: 'go-live', label: '驻场上线', eyebrow: '02 / GO-LIVE',
        title: '从需求澄清到多公司上线切换',
        summary: '全程驻场韶关，跟进多家子公司的需求澄清、方案演示、系统配置、数据检查与上线切换，把问题清单持续推到责任人与最终状态。',
        proof: ['多家子公司并行推进', '千余条凭证异常报告', '问题 · 责任人 · 进度持续闭环'],
        media: {
          kind: 'gallery',
          label: '驻场上线 · 2 张项目记录',
          items: [
            { src: '/assets/career-personas/04-go-live.webp', alt: '驻场上线与切换的黏土人物插画', label: '驻场上线 · 上线切换' },
            { src: '/assets/career-personas/03-master-data.webp', alt: '数据治理与系统验收的黏土人物插画', label: '驻场上线 · 数据验收' },
          ],
        },
      },
    ],
    skills: ['数据治理', 'SQL · Python', '上线切换'],
    image: '/assets/cartoon-clay-v2/career-evidence/02-implementation-consultant.webp', alt: '实施顾问进行系统配置和数据治理的场景插画',
  },
  {
    id: 'application-support', level: 'LV.03', role: '应用支持', tabLabel: '应用支持', type: '全职', period: '2024.08—2026.01', altitude: '解决问题',
    company: '企业软件团队 · 大型集团综合业务项目', location: '深圳 · 项目现场',
    quest: '从解决问题，到建立机制', metric: '不只关闭工单，也把反复出现的问题变成机制、知识和工具。',
    summary: '长期驻场服务大型集团的多类业务板块，覆盖财务共享、总账、应收、报销、发票、电子档案和主数据等场景。我从日常支持走向专项治理、知识沉淀和自动化，对问题闭环与持续改善负责。',
    evidence: [
      { value: '数千张', label: '持续检查业务单据' },
      { value: '显著下降', label: '月均审批问题' },
      { value: '多套', label: '系统可点击总手册' },
    ],
    honor: '正式入职后 · 纯金训练营唯一双优：优秀个人 + 优秀小组（组长）',
    credential: '在职期间考取项目管理专业人士认证',
    stories: [
      {
        id: 'operations-delivery', label: '现场诊断', eyebrow: '01 / FIELD DIAGNOSIS',
        title: '把模糊诉求拆成可闭环的问题',
        summary: '面对电话、企业微信与现场诉求，我先澄清业务流程，再通过复现、权限、配置、数据和接口检查判断责任边界；复杂问题则带着证据协调实施、开发与产品闭环。',
        proof: ['多类业务板块长期驻场', '日常运营 · 月结 · 新需求 · 上线', '持续沉淀日报与风险记录'],
        media: {
          kind: 'gallery',
          label: '现场诊断 · 2 张一线证据',
          items: [
            { src: '/assets/career-personas/05-field-diagnosis.webp', alt: '现场问题诊断的黏土人物插画', label: '现场诊断 · 问题闭环' },
            { src: '/assets/career-personas/06-approval-governance.webp', alt: '审批治理与机制建设的黏土人物插画', label: '现场诊断 · 治理机制' },
          ],
        },
      },
      {
        id: 'approval-governance', label: '审批治理', eyebrow: '02 / APPROVAL GOVERNANCE',
        title: '把反复故障做成审批治理机制',
        summary: '针对人员任职变化导致的审批节点异常，建立 SQL 批量检查、主数据变更跟踪和在途单据监控；再提出“部门编码 + 职务”动态匹配方案，协同开发推进落地。',
        proof: ['持续检查数千张单据', '提前识别异常单据', '月均问题显著下降'],
        media: {
          kind: 'gallery',
          label: '审批治理 · 2 张专项证据',
          items: [
            { src: '/assets/career-personas/06-approval-governance.webp', alt: '审批数据统计与治理的黏土人物插画', label: '审批治理 · 数据与方案' },
            { src: '/assets/career-personas/05-field-diagnosis.webp', alt: '异常识别与问题闭环的黏土人物插画', label: '审批治理 · 异常识别' },
          ],
        },
      },
      {
        id: 'system-manual', label: '知识与带教', eyebrow: '03 / KNOWLEDGE ENABLEMENT',
        title: '把多套系统沉淀成可用知识',
        summary: '拉通不同模块负责人，从系统和单据两个视角整理操作与问题路径，形成可点击总手册并发布至官方系统指南；同期承担 2 名项目新人的带教与工作衔接。',
        proof: ['覆盖多套主要系统', '发布至官方系统指南', '带教项目新人'],
        media: {
          kind: 'gallery',
          label: '知识与带教 · 2 张知识资产',
          items: [
            { src: '/assets/career-personas/07-knowledge-enablement.webp', alt: '系统知识沉淀与带教的黏土人物插画', label: '知识与带教 · 知识资产' },
            { src: '/assets/career-personas/05-field-diagnosis.webp', alt: '问题路径与知识结构的黏土人物插画', label: '知识与带教 · 问题路径' },
          ],
        },
      },
      {
        id: 'receipt-automation', label: '数据与 AI', eyebrow: '04 / DATA & AI AUTOMATION',
        title: '把重复整理交给数据与 AI',
        summary: '用 SQL 与 Excel 重做集团月度指标统计；面对海外项目前期数百份 PDF 银行回单，再用 Python 与大语言模型完成文本提取、字段整理和标准 Excel 输出。',
        proof: ['月度统计耗时显著降低', '处理数百份 PDF 回单', 'SQL · Excel · Python + LLM'],
        media: {
          kind: 'gallery',
          label: '数据与 AI · 2 张自动化记录',
          items: [
            { src: '/assets/career-personas/08-data-automation.webp', alt: '数据整理与 AI 自动化的黏土人物插画', label: '数据与 AI · 自动化方案' },
            { src: '/assets/career-personas/07-knowledge-enablement.webp', alt: '数据与知识结构化的黏土人物插画', label: '数据与 AI · 结构化输出' },
          ],
        },
      },
    ],
    skills: ['问题诊断', '机制治理', '知识与自动化'],
    image: '/assets/cartoon-clay-v2/career-evidence/03-application-support.webp', alt: '应用支持处理系统问题并沉淀手册的场景插画',
  },
  {
    id: 'vibe-coding', level: 'LV.04', role: 'FDE 方案实践', tabLabel: 'FDE 实践', type: '现在进行时', period: '2026—NOW', altitude: '创造方案',
    company: '个人项目 · FDE 能力构建', location: '深圳 · 全职求职 / 接受异地与驻场',
    quest: '从交付系统，到定义 AI 方案', metric: '问题定义、Agent 协作、测试验收，我都对结果负责。',
    summary: '我负责理解用户、定义问题与验收标准，再借助 Coding Agent 完成实现；通过测试、反馈和迭代，对最终体验与交付结果负责。',
    evidence: [
      { value: '结营', label: '观猹 FDE 课程' },
      { value: '2 个', label: '用户场景产品' },
      { value: '双奖', label: '黑客松作品' },
    ],
    stories: [
      {
        id: 'fde-course', label: '企业 AI 闭环', eyebrow: '01 / ENTERPRISE AI LOOP',
        title: '把 FDE 训练做成完整企业 AI 闭环',
        summary: '完成观猹 FDE 课程并结营；在模拟企业和 ERP 环境中，个人完成启衡智审的前后端、Agent、回写、飞书协同与回归测试。',
        proof: ['观猹 FDE 课程结营', '个人完成启衡智审', '300 张模拟单据回归'],
        media: {
          kind: 'gallery',
          label: '企业 AI 闭环 · 3 张实践记录',
          items: [
            { src: '/assets/career-personas/09-fde-course.webp', alt: 'FDE 课程与企业 AI 闭环的黏土人物插画', label: '企业 AI 闭环 · FDE 课程' },
            { src: '/assets/career-personas/10-real-user-products.webp', alt: '用户场景产品验证的黏土人物插画', label: '企业 AI 闭环 · 产品验证' },
            { src: '/assets/career-personas/08-data-automation.webp', alt: '数据与 Agent 协作的黏土人物插画', label: '企业 AI 闭环 · Agent 协作' },
          ],
        },
      },
      {
        id: 'real-user-products', label: '匿名用户交付', eyebrow: '02 / USER DELIVERY',
        title: '先把产品交给两位具体使用者',
        summary: '为匿名经营者把脱敏文件转成经营报表；为匿名独立教师交付课时簿私人版。两位使用者都反馈整体体验很好，后续继续根据实际使用迭代。',
        proof: ['跨境经营舱 · 使用方便', '课时簿 · 私人版已使用', '反馈驱动范围与迭代'],
        media: {
          kind: 'feedback-summary',
          label: '使用者反馈摘要 · 由本人转述，非聊天截图',
          items: [
            { product: '跨境经营舱', role: '匿名经营者', summary: '导入脱敏文件后能很快看到经营报表，使用方便。' },
            { product: '课时簿', role: '匿名独立教师', summary: '私人版符合日常使用需要，整体体验很好，也很惊喜。' },
          ],
        },
      },
      {
        id: 'hackathon-build', label: '限时快速构建', eyebrow: '03 / 48H DELIVERY',
        title: '48 小时主导一件双奖作品',
        summary: '深圳特种兵黑客松两人组队；我主导选题、方案、产品推进和路演，并参与开发协作，把 AI 幻觉议题做成可玩的调查游戏。',
        proof: ['游戏赛道亚军', '跨赛道“一发入魂奖”', '主导产品与现场路演'],
        media: {
          kind: 'gallery',
          label: '限时快速构建 · 2 张现场记录',
          items: [
            { src: '/assets/career-personas/11-hackathon-build.webp', alt: '黑客松限时构建的黏土人物插画', label: '限时快速构建 · 团队协作' },
            { src: '/assets/career-personas/09-fde-course.webp', alt: '产品构建与现场路演的黏土人物插画', label: '限时快速构建 · 产品路演' },
          ],
        },
      },
    ],
    skills: ['需求定义', 'Agent 协作', '测试验收'],
    image: '/assets/cartoon-clay-v2/career-evidence/04-vibe-coding.webp', alt: '使用 AI 工具快速构建和验证产品原型的场景插画',
  },
] as const;

const careerPersonaByStory = {
  'training-tour': '/assets/career-personas/01-offline-delivery.webp',
  'live-operations': '/assets/career-personas/02-live-operations.webp',
  'master-data': '/assets/career-personas/03-master-data.webp',
  'go-live': '/assets/career-personas/04-go-live.webp',
  'operations-delivery': '/assets/career-personas/05-field-diagnosis.webp',
  'approval-governance': '/assets/career-personas/06-approval-governance.webp',
  'system-manual': '/assets/career-personas/07-knowledge-enablement.webp',
  'receipt-automation': '/assets/career-personas/08-data-automation.webp',
  'fde-course': '/assets/career-personas/09-fde-course.webp',
  'real-user-products': '/assets/career-personas/10-real-user-products.webp',
  'hackathon-build': '/assets/career-personas/11-hackathon-build.webp',
} as const;

type EducationMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label?: string;
};

type EducationSchool = {
  id: string;
  label: string;
  english: string;
  title: string;
  meta: string;
  image: string;
  width: number;
  height: number;
  lead: string;
  notes: string[];
  cue: string;
  character: EducationMedia | null;
  details: EducationMedia[];
};

type EducationTopic = {
  id: string;
  label: string;
  english: string;
  image: string;
  width: number;
  height: number;
  lead: string;
  items: string[];
  character: EducationMedia | null;
  details: EducationMedia[];
  focusX: string;
  focusY: string;
  detailX: number;
  detailY: number;
};

const educationPage = educationContent.page;
const educationSchools: readonly EducationSchool[] = educationContent.schools;
const educationTopics: readonly EducationTopic[] = educationContent.topics;

const lifeInterests = [
  {
    id: 'hiking', index: '01', title: '山野徒步', english: 'WILD TRAILS',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/01-hiking-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/01-hiking-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/01-hiking-bloom.webp',
    width: 1254, height: 1254,
    note: '在山里恢复注意力，也享受把远目标拆成眼前一步的节奏。', tags: ['山野恢复力', '背包与登山杖', '山顶远眺', '一步一步抵达'],
    originX: -350, originY: 220,
    media: lifeMediaByInterest.hiking,
  },
  {
    id: 'creator', index: '02', title: '内容创作', english: 'CREATIVE SIGNALS',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/02-content-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/02-content-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/02-content-bloom.webp',
    width: 1254, height: 1254,
    note: '用短视频和 AI 作品测试表达，也用数据复盘观众真正会停下来的内容。', tags: ['100W+ 播放', '视频封面实验', 'AI 作品', '数据复盘'],
    originX: -240, originY: 300,
    media: lifeMediaByInterest.creator,
  },
  {
    id: 'think-build', index: '03', title: '思辨与共创', english: 'THINK & BUILD',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/03-thinking-cocreation-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/03-thinking-cocreation-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/03-thinking-cocreation-bloom.webp',
    width: 1254, height: 1254,
    note: '先听懂对方，再拆解问题；也喜欢在有限时间里，和新队友把想法做成可体验的东西。',
    tags: ['辩论表达', '四次冠军', '黑客松共创', '限时交付'],
    originX: 0, originY: 320,
    media: lifeMediaByInterest['think-build'],
  },
  {
    id: 'journey', index: '04', title: '镜头与远行', english: 'LENS & JOURNEY',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/04-camera-travel-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/04-camera-travel-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/04-camera-travel-bloom.webp',
    width: 1254, height: 1254,
    note: '用镜头记录不同地方的人与空间，也借由一次次远行更新看世界的方式。',
    tags: ['旅行 × 摄影', '地标观察', '空间与光线', '用镜头记路'],
    originX: 240, originY: 300,
    media: lifeMediaByInterest.journey,
  },
  {
    id: 'practice', index: '05', title: '长期练习', english: 'DAILY PRACTICE',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/05-long-practice-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/05-long-practice-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/05-long-practice-bloom.webp',
    width: 1254, height: 1254,
    note: '从高中开始保持英语输入，也用短周期实验建立新的运动习惯。',
    tags: ['3752 天英语输入', '21 天晨跑', '每次 3KM', '用记录对抗中断'],
    originX: 350, originY: 220,
    media: lifeMediaByInterest.practice,
  },
] as const;

const lifeInterestLayout = [
  { interest: lifeInterests[0], positionClass: 'life-interest-1' },
  { interest: lifeInterests[1], positionClass: 'life-interest-2' },
  { interest: lifeInterests[2], positionClass: 'life-interest-3' },
  { interest: lifeInterests[3], positionClass: 'life-interest-4' },
  { interest: lifeInterests[4], positionClass: 'life-interest-5' },
] as const;

type EducationTopicId = (typeof educationTopics)[number]['id'];
type EducationSchoolId = (typeof educationSchools)[number]['id'];
type LifeInterestId = (typeof lifeInterests)[number]['id'];
type WorkSelectionId = (typeof workProjects)[number]['id'];
type CareerStageId = (typeof careerStages)[number]['id'];
type ContactEntryId = (typeof contactEntries)[number]['id'];
type LifePortraitPhase = 'idle' | 'revealing' | 'revealed' | 'returning';

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const resumeTriggerRef = useRef<HTMLButtonElement>(null);
  const firstDownloadOptionRef = useRef<HTMLButtonElement>(null);
  const downloadWasOpenRef = useRef(false);
  const resumeOpenedWithKeyboardRef = useRef(false);
  const lifePortraitHoldTimersRef = useRef<Record<string, number>>({});
  const lifePortraitReturnTimersRef = useRef<Record<string, number>>({});
  const lifePortraitInstantTimerRef = useRef<number | null>(null);
  const lifePortraitPhaseTimerRef = useRef<number | null>(null);
  const [activeWork, setActiveWork] = useState<WorkSelectionId>('commerce-os');
  const [activeCareer, setActiveCareer] = useState<CareerStageId>('delivery-management');
  const [activeCareerStories, setActiveCareerStories] = useState<Record<CareerStageId, string>>({
    'delivery-management': 'training-tour',
    'implementation-consultant': 'master-data',
    'application-support': 'operations-delivery',
    'vibe-coding': 'fde-course',
  });
  const [activeCareerMediaIndexes, setActiveCareerMediaIndexes] = useState<Record<string, number>>({});
  const [shiftedCareerPersona, setShiftedCareerPersona] = useState<string | null>(null);
  const [activeEducation, setActiveEducation] = useState<EducationTopicId | null>(null);
  const [activeEducationSchool, setActiveEducationSchool] = useState<EducationSchoolId | null>(null);
  const [activeEducationMediaIndexes, setActiveEducationMediaIndexes] = useState<Record<string, number>>({});
  const [activeLife, setActiveLife] = useState<LifeInterestId | null>(null);
  const [holdingLifePortrait, setHoldingLifePortrait] = useState<string | null>(null);
  const [instantLifePortrait, setInstantLifePortrait] = useState<string | null>(null);
  const [revealedLifePortraits, setRevealedLifePortraits] = useState<Record<string, boolean>>({});
  const [lifePortraitPhase, setLifePortraitPhase] = useState<LifePortraitPhase>('idle');
  const [activeContact, setActiveContact] = useState<ContactEntryId | null>(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [workReduceMotion, setWorkReduceMotion] = useState(false);

  const selectedWorkIndex = workProjects.findIndex((item) => item.id === activeWork);
  const selectedWork = workProjects[selectedWorkIndex] ?? workProjects[0];

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setWorkReduceMotion(query.matches);
    syncPreference();
    query.addEventListener('change', syncPreference);
    return () => query.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => () => {
    Object.values(lifePortraitHoldTimersRef.current).forEach((timer) => window.clearTimeout(timer));
    Object.values(lifePortraitReturnTimersRef.current).forEach((timer) => window.clearTimeout(timer));
    if (lifePortraitInstantTimerRef.current !== null) window.clearTimeout(lifePortraitInstantTimerRef.current);
    if (lifePortraitPhaseTimerRef.current !== null) window.clearTimeout(lifePortraitPhaseTimerRef.current);
  }, []);

  useEffect(() => {
    if (downloadOpen) {
      downloadWasOpenRef.current = true;
      const focusFrame = window.requestAnimationFrame(() => firstDownloadOptionRef.current?.focus());
      return () => window.cancelAnimationFrame(focusFrame);
    }
    if (downloadWasOpenRef.current) {
      downloadWasOpenRef.current = false;
      resumeTriggerRef.current?.focus();
    }
  }, [downloadOpen]);

  useEffect(() => {
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(refreshFrame);
  }, [activeLife]);

  const { contextSafe } = useGSAP(() => {
    const root = pageRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    media.add(
      { desktop: '(min-width: 801px)', mobile: '(max-width: 800px)', reduce: '(prefers-reduced-motion: reduce)' },
      (context) => {
        const { mobile, reduce } = context.conditions as { mobile: boolean; reduce: boolean };

        gsap.set('.bio-scene', { yPercent: 0, autoAlpha: 1 });
        gsap.set('.nav-scene', { yPercent: 100, autoAlpha: 1 });
        gsap.set('.bio-content-v2', { y: reduce ? 0 : 18, autoAlpha: 0 });
        const navEntryRotations = [-2.4, 2.1, -1.6, 1.8, -2];
        gsap.set('.nav-card-inner', {
          yPercent: reduce ? 0 : -62,
          rotation: (index) => (reduce ? 0 : navEntryRotations[index] ?? 0),
          autoAlpha: reduce ? 1 : 0,
        });
        gsap.set('.nav-route-map', { scale: reduce ? 1 : 0.96, autoAlpha: reduce ? 1 : 0 });
        gsap.set('.nav-route-stop', { scale: reduce ? 1 : 0.46, autoAlpha: reduce ? 1 : 0 });
        gsap.set('.story-night', { autoAlpha: 1 });
        gsap.set('.story-dawn', { clipPath: 'circle(0.25vmax at 50% 50%)', autoAlpha: 1 });
        gsap.set('.story-dawn-bloom', { scale: reduce ? 1 : 0.018, autoAlpha: 0 });

        if (reduce) {
          gsap.set('.opening-prompt', { autoAlpha: 0 });
          gsap.set('.word-mask', { clipPath: 'inset(0% 0 0 0)' });
          gsap.set('.intro-char', { yPercent: 0 });
          gsap.set('.hero-small, .hero-handwrite, .story-avatar', { y: 0, scale: 1, rotation: 0, autoAlpha: 1 });
        } else {
          gsap.set('.word-mask', { clipPath: 'inset(100% 0 0 0)' });
          gsap.set('.intro-char', { yPercent: 112 });
          gsap.set('.hero-small', { y: 18, autoAlpha: 0 });
          gsap.set('.hero-handwrite', { scale: 0.92, rotation: -14, autoAlpha: 0 });
          gsap.set('.story-avatar', { scale: 0.92, rotation: -7, autoAlpha: 0 });
        }

        const story = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '.story', start: 'top top', end: 'bottom bottom', scrub: reduce ? true : 0.8, invalidateOnRefresh: true },
        });

        if (reduce) {
          story.to({}, { duration: 1 });
        } else {
          story
            .to('.opening-prompt', { yPercent: -7, autoAlpha: 0, duration: 0.12 }, 0)
            .to('.stage-grid', { autoAlpha: 1, duration: 0.72 }, 0)
            .to('.word-mask', { clipPath: 'inset(0% 0 0 0)', duration: 0.9 }, 0.03)
            .to('.intro-char', { yPercent: 0, duration: 0.84, stagger: 0.025 }, 0.06)
            .to('.story-avatar', { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.88 }, 0.08)
            .to('.hero-small', { y: 0, autoAlpha: 1, duration: 0.52, stagger: 0.035 }, 0.38)
            .to('.hero-handwrite', { scale: 1, rotation: -7, autoAlpha: 1, duration: 0.42 }, 0.5);
        }

        story
          .to('.hero-scene', { yPercent: -7, scale: 0.86, autoAlpha: 0, duration: reduce ? 0.01 : 0.72 }, 1)
          .to('.story-avatar', {
            x: mobile ? '26vw' : '30vw',
            y: mobile ? '0vh' : '-5vh',
            scale: mobile ? 0.54 : 0.92,
            rotation: 0,
            duration: reduce ? 0.01 : 0.86,
          }, 1)
          .to('.avatar-orbit, .avatar-tag', { autoAlpha: 0, duration: reduce ? 0.01 : 0.3 }, 1.08)
          .to('.story-dawn-bloom', { scale: 1.05, autoAlpha: 0.86, duration: reduce ? 0.01 : 0.92 }, 1)
          .to('.story-dawn', { clipPath: 'circle(75vmax at 50% 50%)', duration: reduce ? 0.01 : 0.92 }, 1.08)
          .to('.story-dawn-bloom', { autoAlpha: 0.14, duration: reduce ? 0.01 : 0.34 }, 1.86)
          .to('.bio-content-v2', {
            y: 0,
            autoAlpha: 1,
            duration: reduce ? 0.15 : 0.45,
            stagger: reduce ? 0 : 0.04,
          }, 1.5)
          .to('.bio-content-v2, .story-avatar', {
            y: reduce ? 0 : '-=16',
            autoAlpha: 0,
            duration: reduce ? 0.15 : 0.38,
          }, 2.65)
          .to('.nav-scene', { yPercent: 0, duration: reduce ? 0.01 : 0.82 }, 2.72)
          .to('.nav-route-map', { scale: 1, autoAlpha: 1, duration: reduce ? 0.15 : 0.56 }, 2.84)
          .to('.story-night', { autoAlpha: 0, duration: reduce ? 0.01 : 0.24 }, 3.08);

        const navCards = gsap.utils.toArray<HTMLElement>('.nav-card-inner');
        const navStops = gsap.utils.toArray<HTMLElement>('.nav-route-stop');

        navCards.forEach((card, index) => {
          const cardStart = 3 + (reduce ? 0 : index * 0.14);
          story.to(card, {
            yPercent: 0,
            rotation: 0,
            autoAlpha: 1,
            duration: reduce ? 0.15 : 0.68,
            ease: reduce ? 'none' : 'power3.out',
          }, cardStart);

          if (navStops[index]) {
            story.to(navStops[index], {
              scale: 1,
              autoAlpha: 1,
              duration: reduce ? 0.15 : 0.54,
              ease: reduce ? 'none' : 'power3.out',
            }, cardStart + (reduce ? 0 : 0.24));
          }
        });

        story.to('.story-dawn, .story-dawn-bloom', { autoAlpha: 0, duration: reduce ? 0.15 : 0.68 }, reduce ? 3.14 : 3.74);

        return () => story.kill();
      },
    );

    void document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => media.revert();
  }, { scope: pageRef });

  useGSAP(() => {
    const activeIndex = educationTopics.findIndex((item) => item.id === activeEducation);
    const selected = activeIndex >= 0 ? educationTopics[activeIndex] : null;
    const selectedSchool = educationSchools.find((item) => item.id === activeEducationSchool) ?? null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 800px)').matches;
    const nodes = gsap.utils.toArray<HTMLElement>('.education-topic-node');

    const highSchool = pageRef.current?.querySelector<HTMLElement>('.education-school-high .education-school-sprite');
    const university = pageRef.current?.querySelector<HTMLElement>('.education-school-university .education-school-sprite');
    if (highSchool) {
      const isHighSchool = selectedSchool?.id === 'high-school';
      gsap.to(highSchool, {
        x: selected && !compact && !reduce ? -18 : 0,
        y: selected && !compact && !reduce ? -16 : 0,
        scale: selected ? (compact ? 1 : 0.6) : isHighSchool ? (compact ? 1.12 : 1.2) : compact ? 1 : selectedSchool ? 0.72 : 1,
        opacity: selected ? 0.48 : isHighSchool || !selectedSchool ? 1 : 0.5,
        duration: reduce ? 0.12 : 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (university) {
      const isUniversity = selectedSchool?.id === 'university';
      gsap.to(university, {
        x: !compact && !reduce ? selected ? 16 : isUniversity ? 28 : 0 : 0,
        y: !compact && !reduce ? selected ? 30 : isUniversity ? 20 : 0 : 0,
        scale: selected ? (compact ? 0.82 : 0.72) : compact ? 1 : isUniversity ? 0.9 : selectedSchool ? 0.78 : 1,
        opacity: selected ? 0.62 : isUniversity || !selectedSchool ? 1 : 0.52,
        duration: reduce ? 0.12 : 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    nodes.forEach((node, index) => {
      const sprite = node.querySelector<HTMLElement>('.education-topic-sprite');
      if (!sprite) return;
      const isActive = index === activeIndex;
      gsap.to(sprite, {
        x: 0,
        y: 0,
        scale: selected ? (isActive ? (compact ? 1.1 : 1.16) : compact ? 0.96 : 0.94) : selectedSchool ? (selectedSchool.id === 'university' ? 1 : 0.66) : 1,
        rotation: reduce || !selected || !isActive ? 0 : activeIndex % 2 === 0 ? -1 : 1,
        opacity: selected ? (isActive ? 1 : 0.88) : selectedSchool ? (selectedSchool.id === 'university' ? 1 : 0.4) : 1,
        duration: reduce ? 0.12 : 0.28,
        ease: isActive ? 'back.out(1.4)' : 'power3.out',
        overwrite: 'auto',
      });

      const pedestal = node.querySelector<HTMLElement>('.education-topic-pedestal');
      if (pedestal) gsap.to(pedestal, {
        autoAlpha: selected && isActive ? 1 : 0,
        scaleX: selected && isActive ? 1 : 0.88,
        scaleY: selected && isActive ? 1 : 0.92,
        duration: reduce ? 0.12 : 0.22,
        ease: 'power3.out',
        overwrite: 'auto',
      });

    });

    const detail = pageRef.current?.querySelector<HTMLElement>('.education-detail-shell');
    if (detail && (selected || selectedSchool)) {
      const detailX = selected ? selected.detailX : selectedSchool?.id === 'high-school' ? -90 : 90;
      const detailY = selected ? selected.detailY : 28;
      gsap.fromTo(
        detail,
        { autoAlpha: 0, x: reduce || compact ? 0 : detailX, y: reduce || compact ? 0 : detailY, scale: reduce ? 1 : 0.96 },
        { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: reduce ? 0.15 : 0.28, ease: 'power3.out', clearProps: 'transform' },
      );
      const detailCards = gsap.utils.toArray<HTMLElement>('.education-detail-card');
      if (selected && detailCards.length) gsap.fromTo(
        detailCards,
        {
          autoAlpha: 0,
          x: reduce || compact ? 0 : detailX * 0.7,
          y: reduce || compact ? 0 : detailY * 0.6,
          scale: reduce ? 1 : 0.94,
          rotation: reduce ? 0 : (index) => [-3, 1, 3][index] ?? 0,
        },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: reduce ? 0.15 : 0.28,
          stagger: reduce ? 0 : 0.05,
          ease: 'power3.out',
        },
      );
    }
  }, { dependencies: [activeEducation, activeEducationSchool], scope: pageRef, revertOnUpdate: true });

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chapters = gsap.utils.toArray<HTMLElement>(
      '.work-canvas-v2, .career-canvas-v2, .education-canvas, .life-canvas-v2, .contact-canvas-v2',
    );

    chapters.forEach((chapter) => {
      const content = Array.from(chapter.children).filter((child): child is HTMLElement => (
        child instanceof HTMLElement
        && !child.matches('.life-ambient-light, .life-light-scrim')
      ));
      gsap.fromTo(
        content,
        { y: 14, autoAlpha: 0.76 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.025,
          ease: 'none',
          scrollTrigger: {
            trigger: chapter,
            start: 'top 94%',
            end: 'top 36%',
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        },
      );
      const exitContent = content.filter((child) => (
        !chapter.classList.contains('work-canvas-v2')
        && !child.matches('header, [class*="hint"]')
      ));
      if (!exitContent.length) return;
      gsap.to(exitContent, {
        y: -14,
        autoAlpha: 0,
        stagger: 0.025,
        ease: 'none',
        scrollTrigger: {
          trigger: chapter,
          start: 'bottom 64%',
          end: 'bottom 8%',
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });
    });
  }, { scope: pageRef });

  useGSAP(() => {
    const selected = lifeInterests.find((item) => item.id === activeLife) ?? null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 800px)').matches;
    const buttons = gsap.utils.toArray<HTMLElement>('.life-interest-button');

    buttons.forEach((button, index) => {
      const sprite = button.querySelector<HTMLElement>('.life-interest-sprite');
      if (!sprite) return;
      const isActive = button.dataset.lifeInterest === selected?.id;
      gsap.to(sprite, {
        x: 0,
        y: 0,
        scale: !selected ? 1 : isActive ? 1.07 : compact ? 0.9 : 0.86,
        opacity: !selected || isActive ? 1 : 0.5,
        rotation: reduce ? 0 : isActive ? (index % 2 === 0 ? -1.5 : 1.5) : 0,
        duration: reduce ? 0.12 : 0.42,
        ease: isActive ? 'back.out(1.55)' : 'power3.out',
        overwrite: 'auto',
      });
    });

    if (!selected) return;
    const originX = reduce ? 0 : compact ? 0 : selected.originX;
    const originY = reduce || compact ? 0 : selected.originY;
    const copy = pageRef.current?.querySelector<HTMLElement>('.life-focus-copy');
    const visuals = gsap.utils.toArray<HTMLElement>('.life-memory-visual');
    const keywords = gsap.utils.toArray<HTMLElement>('.life-keyword-cloud small');
    if (copy) {
      gsap.fromTo(copy, { autoAlpha: 0, x: originX * 0.25, y: originY * 0.2 }, { autoAlpha: 1, x: 0, y: 0, duration: reduce ? 0.15 : 0.28, ease: 'power3.out' });
    }
    gsap.fromTo(
      visuals,
      { autoAlpha: 0, x: originX * 0.18, y: originY * 0.16, scale: reduce ? 1 : 0.96 },
      { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: reduce ? 0.15 : 0.28, stagger: reduce ? 0 : 0.025, ease: 'power3.out' },
    );
    gsap.fromTo(
      keywords,
      { autoAlpha: 0, y: reduce ? 0 : -36, rotation: reduce ? 0 : (index) => [-4, 3, -2, 4, -3][index] ?? 0 },
      { autoAlpha: 1, y: 0, rotation: 0, duration: reduce ? 0.15 : 0.28, stagger: reduce ? 0 : 0.045, ease: 'power3.out' },
    );
  }, { dependencies: [activeLife], scope: pageRef, revertOnUpdate: true });

  useGSAP(() => {
    const projectButtons = gsap.utils.toArray<HTMLElement>('[data-work-project-button]');
    const feature = pageRef.current?.querySelector<HTMLElement>('.work-feature-v3');
    const preview = feature?.querySelector<HTMLElement>('.work-embed-preview-v3');

    if (workReduceMotion) {
      gsap.set(projectButtons, {
        '--work-button-y': '0px',
        '--work-button-scale': 1,
        '--work-button-rotation': '0deg',
        clearProps: 'opacity,visibility',
      });
      if (feature) gsap.set(feature, { clearProps: 'transform,opacity,visibility' });
      return;
    }

    const media = gsap.matchMedia();
    media.add(
      { compact: '(max-width: 1024px)', desktop: '(min-width: 1025px)' },
      (context) => {
        const compact = Boolean(context.conditions?.compact);
        projectButtons.forEach((button, index) => {
          const isActive = index === selectedWorkIndex;
          gsap.to(button, {
            '--work-button-y': isActive ? (compact ? '-2px' : '-8px') : '0px',
            '--work-button-scale': isActive ? 1.02 : compact ? 0.94 : 0.96,
            '--work-button-rotation': isActive ? '0deg' : index % 2 === 0 ? '-2deg' : '2deg',
            autoAlpha: isActive ? 1 : compact ? 0.76 : 0.72,
            duration: 0.24,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        });
      },
    );

    if (feature) {
      gsap.fromTo(
        feature,
        { autoAlpha: 0, y: workReduceMotion ? 0 : 10, scale: workReduceMotion ? 1 : 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: workReduceMotion ? 0.12 : 0.24, ease: 'power3.out', overwrite: 'auto' },
      );
    }

    if (preview && !workReduceMotion) {
      gsap.fromTo(
        preview,
        { autoAlpha: 0.54, scale: 0.975, y: 8 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.24, ease: 'power3.out', overwrite: 'auto' },
      );
    }

    return () => media.revert();
  }, { dependencies: [selectedWorkIndex, workReduceMotion], scope: pageRef, revertOnUpdate: true });

  useGSAP(() => {
    const selectedIndex = careerStages.findIndex((item) => item.id === activeCareer);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 800px)').matches;
    const nodes = gsap.utils.toArray<HTMLElement>('.career-stage-node');

    nodes.forEach((node, index) => {
      const sprite = node.querySelector<HTMLElement>('.career-stage-sprite');
      if (!sprite) return;
      const isActive = index === selectedIndex;
      gsap.to(sprite, {
        x: compact || reduce ? 0 : isActive ? 0 : index < selectedIndex ? -6 : 6,
        y: compact || reduce ? 0 : isActive ? -8 : index % 2 === 0 ? 4 : -2,
        scale: isActive ? 1.04 : 0.9,
        opacity: isActive ? 1 : compact ? 0.72 : 0.76,
        rotation: reduce ? 0 : isActive ? 0 : index % 2 === 0 ? -2 : 2,
        duration: reduce ? 0.12 : 0.28,
        ease: isActive ? 'back.out(1.4)' : 'power3.out',
        overwrite: 'auto',
      });
    });

    const detail = pageRef.current?.querySelector<HTMLElement>('.career-focus-detail');
    if (detail) {
      gsap.fromTo(detail, { autoAlpha: 0, x: reduce || compact ? 0 : selectedIndex < 2 ? -70 : 70, y: reduce ? 0 : 22 }, { autoAlpha: 1, x: 0, y: 0, duration: reduce ? 0.15 : 0.28, ease: 'power3.out' });
    }
  }, { dependencies: [activeCareer], scope: pageRef, revertOnUpdate: true });

  useGSAP(() => {
    const selectedIndex = contactEntries.findIndex((item) => item.id === activeContact);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 800px)').matches;
    const nodes = gsap.utils.toArray<HTMLElement>('.contact-entry-button');

    nodes.forEach((node, index) => {
      const sprite = node.querySelector<HTMLElement>('.contact-entry-sprite');
      if (!sprite) return;
      const isActive = index === selectedIndex;
      gsap.to(sprite, {
        x: reduce || compact || selectedIndex < 0 ? 0 : isActive ? 0 : index < selectedIndex ? -16 : 16,
        y: reduce || compact || selectedIndex < 0 ? 0 : isActive ? -8 : index % 2 === 0 ? -10 : 10,
        scale: selectedIndex < 0 ? 1 : isActive ? 1.05 : compact ? 0.88 : 0.66,
        opacity: selectedIndex < 0 || isActive ? 1 : 0.52,
        rotation: reduce || selectedIndex < 0 ? 0 : isActive ? 0 : index % 2 === 0 ? -2 : 2,
        duration: reduce ? 0.12 : 0.28,
        ease: isActive ? 'back.out(1.4)' : 'power3.out',
        overwrite: 'auto',
      });
    });

    const detail = pageRef.current?.querySelector<HTMLElement>('.contact-focus-detail');
    if (detail && selectedIndex >= 0) {
      gsap.fromTo(
        detail.children,
        { autoAlpha: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: reduce ? 0.15 : 0.28, stagger: reduce ? 0 : 0.05, ease: 'power3.out' },
      );
    }
  }, { dependencies: [activeContact], scope: pageRef, revertOnUpdate: true });

  useGSAP(() => {
    if (!downloadOpen) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (resumeOpenedWithKeyboardRef.current) {
      resumeOpenedWithKeyboardRef.current = false;
      gsap.set('.resume-modal-backdrop, .resume-modal, .resume-download-option', { autoAlpha: 1, x: 0, y: 0, scale: 1 });
      return;
    }
    gsap.fromTo('.resume-modal-backdrop', { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0.12 : 0.25, ease: 'power3.out' });
    gsap.fromTo('.resume-modal', { autoAlpha: 0, scale: reduce ? 1 : 0.96 }, { autoAlpha: 1, scale: 1, duration: reduce ? 0.12 : 0.25, ease: 'power3.out' });
    gsap.fromTo('.resume-download-option', { autoAlpha: 0, y: reduce ? 0 : 10 }, { autoAlpha: 1, y: 0, duration: reduce ? 0.12 : 0.25, stagger: reduce ? 0 : 0.045, ease: 'power3.out' });
  }, { dependencies: [downloadOpen], scope: pageRef, revertOnUpdate: true });

  const activateWork = contextSafe((id: WorkSelectionId) => {
    setActiveWork(id);
  });

  const activateCareer = contextSafe((id: CareerStageId, button: HTMLButtonElement) => {
    setActiveCareer(id);
    setShiftedCareerPersona(null);
    const sprite = button.querySelector<HTMLElement>('.career-stage-sprite');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.matchMedia('(max-width: 800px)').matches) {
      window.requestAnimationFrame(() => document.getElementById('career-focus-stage')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }));
    }
    if (!sprite || reduce) return;
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(sprite, { scale: 0.9, duration: 0.1, ease: 'power2.out' })
      .to(sprite, { scale: 1.05, duration: 0.28, ease: 'back.out(1.7)' });
  });

  const activateCareerStory = contextSafe((id: string) => {
    setActiveCareerStories((current) => ({ ...current, [activeCareer]: id }));
    setShiftedCareerPersona(null);
  });

  const advanceCareerMedia = (storyId: string, mediaCount: number) => {
    setActiveCareerMediaIndexes((current) => ({
      ...current,
      [storyId]: ((current[storyId] ?? 0) + 1) % mediaCount,
    }));
  };

  const selectCareerMedia = (storyId: string, mediaIndex: number) => {
    setActiveCareerMediaIndexes((current) => ({
      ...current,
      [storyId]: mediaIndex,
    }));
  };

  const advanceEducationMedia = (topicId: string, mediaCount: number) => {
    setActiveEducationMediaIndexes((current) => ({
      ...current,
      [topicId]: ((current[topicId] ?? 0) + 1) % mediaCount,
    }));
  };

  const selectEducationMedia = (topicId: string, mediaIndex: number) => {
    setActiveEducationMediaIndexes((current) => ({
      ...current,
      [topicId]: mediaIndex,
    }));
  };

  const toggleCareerPersona = (storyId: string) => {
    setShiftedCareerPersona((current) => current === storyId ? null : storyId);
  };

  const activateContact = contextSafe((id: ContactEntryId, button: HTMLButtonElement, shouldAnimate = true) => {
    setActiveContact(id);
    const sprite = button.querySelector<HTMLElement>('.contact-entry-sprite');
    if (!shouldAnimate || !sprite || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(sprite, { scale: 0.93, duration: 0.1, ease: 'power2.out' })
      .to(sprite, { scale: 1.05, duration: 0.28, ease: 'back.out(1.7)' });
  });

  const openResume = (event: React.MouseEvent<HTMLButtonElement>) => {
    resumeOpenedWithKeyboardRef.current = event.detail === 0;
    setDownloadOpen(true);
  };

  const closeResume = contextSafe((immediate = false) => {
    if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDownloadOpen(false);
      return;
    }
    gsap.timeline({ onComplete: () => setDownloadOpen(false) })
      .to('.resume-modal', { autoAlpha: 0, scale: 0.96, duration: 0.2, ease: 'power3.out' })
      .to('.resume-modal-backdrop', { autoAlpha: 0, duration: 0.2, ease: 'power3.out' }, 0);
  });

  const trapDownloadFocus = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeResume(true);
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'));
    if (!focusable.length) return;
    const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
    const nextIndex = event.shiftKey
      ? (currentIndex - 1 + focusable.length) % focusable.length
      : (currentIndex + 1) % focusable.length;
    event.preventDefault();
    focusable[nextIndex].focus();
  };

  const playEducationSparkle = contextSafe((button: HTMLButtonElement, selector: string) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const flash = button.querySelector<HTMLElement>(selector);
    if (!flash) return;
    const sparkles = gsap.utils.toArray<HTMLElement>(flash.querySelectorAll('i'));
    gsap.killTweensOf([flash, ...sparkles]);
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .set(flash, { autoAlpha: 1 })
      .fromTo(
        sparkles,
        { autoAlpha: 0, scale: 0.55, rotation: -18 },
        { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.1, stagger: 0.025, repeat: 1, yoyo: true, ease: 'power2.out' },
      )
      .to(flash, { autoAlpha: 0, duration: 0.12, ease: 'power2.out' }, 0.15);
  });

  const activateEducation = contextSafe((id: EducationTopicId, button: HTMLButtonElement) => {
    setActiveEducationSchool(null);
    setActiveEducation(id);
    playEducationSparkle(button, '.education-topic-flash');
    const art = button.querySelector<HTMLElement>('.education-topic-art');
    if (!art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(art, { scale: 0.94, duration: 0.12, ease: 'power2.out' })
      .to(art, { scale: 1, duration: 0.28, ease: 'back.out(1.7)' });
  });

  const activateEducationSchool = contextSafe((id: EducationSchoolId, button: HTMLButtonElement) => {
    setActiveEducation(null);
    setActiveEducationSchool((current) => current === id ? null : id);
    playEducationSparkle(button, '.education-school-flash');
    const art = button.querySelector<HTMLElement>('.education-school-sprite img');
    if (!art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: () => gsap.set(art, { clearProps: 'transform' }),
    })
      .to(art, { scale: 0.94, duration: 0.1, ease: 'power2.out' })
      .to(art, { scale: 1.04, duration: 0.28, ease: 'back.out(1.65)' });
  });

  const resetEducation = () => {
    setActiveEducation(null);
    setActiveEducationSchool(null);
  };

  const resetEducationFromBlank = (event: ReactMouseEvent<HTMLElement>) => {
    if (!activeEducation && !activeEducationSchool) return;
    const target = event.target as HTMLElement;
    if (target.closest('button, a, p, h1, h2, h3, h4, li, span, strong, em, small, img')) return;
    resetEducation();
  };

  const resetEducationFromKeyboard = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape' || (!activeEducation && !activeEducationSchool)) return;
    event.preventDefault();
    resetEducation();
  };

  const resetLifePortraits = () => {
    Object.values(lifePortraitHoldTimersRef.current).forEach((timer) => window.clearTimeout(timer));
    lifePortraitHoldTimersRef.current = {};
    Object.values(lifePortraitReturnTimersRef.current).forEach((timer) => window.clearTimeout(timer));
    lifePortraitReturnTimersRef.current = {};
    if (lifePortraitInstantTimerRef.current !== null) {
      window.clearTimeout(lifePortraitInstantTimerRef.current);
      lifePortraitInstantTimerRef.current = null;
    }
    if (lifePortraitPhaseTimerRef.current !== null) {
      window.clearTimeout(lifePortraitPhaseTimerRef.current);
      lifePortraitPhaseTimerRef.current = null;
    }
    setHoldingLifePortrait(null);
    setInstantLifePortrait(null);
    setRevealedLifePortraits({});
    setLifePortraitPhase('idle');
  };

  const revealLifePortraitTemporarily = (groupKey: string, instant = false) => {
    const currentReturnTimer = lifePortraitReturnTimersRef.current[groupKey];
    if (currentReturnTimer !== undefined) window.clearTimeout(currentReturnTimer);
    if (lifePortraitPhaseTimerRef.current !== null) window.clearTimeout(lifePortraitPhaseTimerRef.current);
    setLifePortraitPhase(instant ? 'revealed' : 'revealing');
    setRevealedLifePortraits((current) => ({ ...current, [groupKey]: true }));
    if (!instant) {
      lifePortraitPhaseTimerRef.current = window.setTimeout(() => {
        setLifePortraitPhase('revealed');
        lifePortraitPhaseTimerRef.current = null;
      }, 520);
    }
    lifePortraitReturnTimersRef.current[groupKey] = window.setTimeout(() => {
      if (lifePortraitPhaseTimerRef.current !== null) window.clearTimeout(lifePortraitPhaseTimerRef.current);
      setLifePortraitPhase(instant ? 'idle' : 'returning');
      setRevealedLifePortraits((current) => {
        const next = { ...current };
        delete next[groupKey];
        return next;
      });
      if (!instant) {
        lifePortraitPhaseTimerRef.current = window.setTimeout(() => {
          setLifePortraitPhase('idle');
          lifePortraitPhaseTimerRef.current = null;
        }, 420);
      }
      delete lifePortraitReturnTimersRef.current[groupKey];
    }, 3000);
  };

  const cancelLifePortraitHold = (key: string) => {
    const timer = lifePortraitHoldTimersRef.current[key];
    if (timer !== undefined) {
      window.clearTimeout(timer);
      delete lifePortraitHoldTimersRef.current[key];
    }
    setHoldingLifePortrait((current) => current === key ? null : current);
  };

  const beginLifePortraitHold = (key: string, groupKey: string, event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || revealedLifePortraits[groupKey]) return;
    Object.values(lifePortraitHoldTimersRef.current).forEach((timer) => window.clearTimeout(timer));
    lifePortraitHoldTimersRef.current = {};
    setHoldingLifePortrait(key);
    lifePortraitHoldTimersRef.current[key] = window.setTimeout(() => {
      revealLifePortraitTemporarily(groupKey);
      setHoldingLifePortrait((current) => current === key ? null : current);
      delete lifePortraitHoldTimersRef.current[key];
    }, 1500);
  };

  const revealLifePortraitFromKeyboard = (key: string, groupKey: string, event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if ((event.key !== 'Enter' && event.key !== ' ') || event.repeat || revealedLifePortraits[groupKey]) return;
    event.preventDefault();
    cancelLifePortraitHold(key);
    setInstantLifePortrait(key);
    revealLifePortraitTemporarily(groupKey, true);
    if (lifePortraitInstantTimerRef.current !== null) window.clearTimeout(lifePortraitInstantTimerRef.current);
    lifePortraitInstantTimerRef.current = window.setTimeout(() => {
      setInstantLifePortrait((current) => current === key ? null : current);
      lifePortraitInstantTimerRef.current = null;
    }, 3400);
  };

  const runLifeActivation = contextSafe((id: LifeInterestId, button: HTMLButtonElement) => {
    const lifeCanvas = button.closest<HTMLElement>('.life-canvas-v2');
    const isCurrent = button.getAttribute('aria-selected') === 'true';
    const hasCurrent = Boolean(lifeCanvas?.querySelector('.life-interest-button[aria-selected="true"]'));
    const nextLife = isCurrent ? null : id;
    const scrim = lifeCanvas?.querySelector<HTMLElement>('.life-light-scrim');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (scrim) {
      gsap.killTweensOf(scrim);
      if (reduce) {
        gsap.set(scrim, { opacity: nextLife ? 0 : 0.58 });
      } else if (!nextLife) {
        gsap.to(scrim, { opacity: 0.58, duration: 0.22, ease: 'power2.inOut', overwrite: 'auto' });
      } else if (hasCurrent && !isCurrent) {
        gsap.timeline({ defaults: { overwrite: 'auto' } })
          .to(scrim, { opacity: 0.68, duration: 0.16, ease: 'power2.inOut' })
          .to(scrim, { opacity: 0, duration: 0.26, ease: 'power3.out' });
      } else {
        gsap.to(scrim, { opacity: 0, duration: 0.28, ease: 'power3.out', overwrite: 'auto' });
      }
    }

    setActiveLife((current) => current === id ? null : id);
    const flower = button.querySelector<HTMLElement>('.life-interest-sprite');
    if (!flower || reduce) return;
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(flower, { scale: 0.92, duration: 0.12, ease: 'power2.out' })
      .to(flower, { scale: 1, duration: 0.36, ease: 'back.out(1.7)' });
  });

  const activateLife = (id: LifeInterestId, button: HTMLButtonElement) => {
    resetLifePortraits();
    runLifeActivation(id, button);
  };

  const selectedContact = contactEntries.find((item) => item.id === activeContact) ?? null;
  const selectedCareer = careerStages.find((item) => item.id === activeCareer) ?? careerStages[0];
  const selectedCareerStory = selectedCareer.stories.find((item) => item.id === activeCareerStories[activeCareer]) ?? selectedCareer.stories[0];
  const selectedCareerPersona = careerPersonaByStory[selectedCareerStory.id];
  const selectedCareerGallery = 'kind' in selectedCareerStory.media && selectedCareerStory.media.kind === 'gallery' ? selectedCareerStory.media : null;
  const selectedCareerMediaIndex = selectedCareerGallery ? Math.min(activeCareerMediaIndexes[selectedCareerStory.id] ?? 0, selectedCareerGallery.items.length - 1) : 0;
  const selectedCareerGalleryItem = selectedCareerGallery?.items[selectedCareerMediaIndex] ?? selectedCareerGallery?.items[0];
  const selectedEducation = educationTopics.find((item) => item.id === activeEducation) ?? null;
  const selectedEducationMediaIndex = selectedEducation?.details.length
    ? Math.min(activeEducationMediaIndexes[selectedEducation.id] ?? 0, selectedEducation.details.length - 1)
    : 0;
  const selectedEducationMedia = selectedEducation?.details[selectedEducationMediaIndex] ?? selectedEducation?.details[0];
  const selectedEducationSchool = educationSchools.find((item) => item.id === activeEducationSchool) ?? null;
  const selectedLife = lifeInterests.find((item) => item.id === activeLife) ?? null;
  const selectedLifeMedia = (selectedLife?.media ?? []) as readonly LifeMedia[];
  const selectedLifeGalleryColumns = selectedLifeMedia.length >= 11 ? 6 : selectedLifeMedia.length >= 9 ? 5 : 4;

  useGSAP(() => {
    const detail = pageRef.current?.querySelector<HTMLElement>('.career-mission-detail');
    if (!detail) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.fromTo(
      detail.children,
      { autoAlpha: 0, y: reduce ? 0 : 12 },
      { autoAlpha: 1, y: 0, duration: reduce ? 0.12 : 0.24, stagger: reduce ? 0 : 0.035, ease: 'power3.out' },
    );
  }, { dependencies: [activeCareer, selectedCareerStory.id], scope: pageRef, revertOnUpdate: true });

  return (
    <main
      ref={pageRef}
      style={{
        '--work-accent': selectedWork.accent,
        '--work-accent-soft': selectedWork.accentSoft,
        '--work-accent-deep': selectedWork.accentDeep,
        '--work-canvas-light': selectedWork.canvasLight,
        '--work-canvas': selectedWork.canvas,
        '--work-canvas-deep': selectedWork.canvasDeep,
      } as CSSProperties}
    >
      <SensoryLayer />
      <LiquidCursor />
      <section className="story" id="top">
        <div className="story-stage">
          <div className="story-night" aria-hidden="true" />
          <div className="stage-grid" aria-hidden="true" />
          <div className="story-dawn" aria-hidden="true" />
          <div className="story-dawn-bloom" aria-hidden="true" />
          <div className="opening-prompt" aria-hidden="true">
            <div className="opening-topline"><span>VIOLET XIE / PERSONAL WEBSITE</span><span>FDE · SHENZHEN · 2026</span></div>
            <div className="opening-copy"><span className="opening-index">HELLO / 00</span><strong><span>你好，我是</span><em>谢子涵</em></strong><p>Violet。很高兴认识你。</p></div>
            <div className="opening-action"><span>↓</span><p>SCROLL DOWN<br />下滑打开我的个人档案</p></div>
          </div>
          <div className="scene hero-scene">
            <div className="scene-top hero-small"><span>HELLO, I&apos;M VIOLET</span><span>FDE · 企业 AI 前线交付</span></div>
            <h1 className="intro-title fde-title" aria-label="FDE"><span className="word-mask">{'FDE'.split('').map((char, index) => <i className={`intro-char ${index === 1 ? 'outline-char' : ''}`} key={`${char}-${index}`}>{char}</i>)}</span></h1>
            <div className="hero-caption hero-small"><p>你好，我是谢子涵。<br />你也可以叫我 Violet。</p><span>把模糊业务问题推进为可验证的 AI 方案</span></div>
            <span className="hero-handwrite" aria-hidden="true">nice to meet you</span>
            <div className="scene-progress hero-small"><span>01 / 03</span><i /><span>SCROLL TO ENTER</span></div>
          </div>
          <div className="scene bio-scene" id="profile">
            <div className="bio-label bio-content-v2">NICE TO MEET YOU · 02</div>
            <div className="bio-copy bio-content-v2"><div className="line-mask"><h2>很高兴</h2></div><div className="line-mask"><h2 className="accent-type">认识你。</h2></div><div className="line-mask bio-paragraph-mask"><p>我从大型企业软件交付现场出发，做过实施、应用支持与专项治理。现在用 Agent 把业务问题做成可演示、可验证的 AI 方案，目标是成为能连接客户、产品、技术与结果的 FDE。</p></div></div>
            <div className="bio-facts bio-content-v2"><div className="fact"><strong>08</strong><span>PUBLIC<br />BUILDS</span></div><div className="fact"><strong>04</strong><span>CAREER<br />LEVELS</span></div><div className="fact"><strong>06</strong><span>LIFE<br />INTERESTS</span></div></div>
            <div className="scene-progress bio-progress bio-content-v2"><span>02 / 03</span><i /><span>SCROLL FOR MENU</span></div>
          </div>
          <div className="scene nav-scene">
            <div className="nav-heading"><span>NAVIGATION / 03</span><span>从作品开始，或沿着软陶路线认识我</span></div>
            <nav className="clay-nav-canvas" aria-label="网站章节导航">
              <Image
                className="nav-route-map"
                src="/assets/cartoon-clay-v2/navigation-system/04-route-without-stops.webp"
                width={1672}
                height={941}
                alt=""
                aria-hidden="true"
                priority
                unoptimized
              />
              <div className="nav-route-stops" aria-hidden="true">
                {navItems.map((item, index) => (
                  <span className={`nav-route-stop nav-route-stop-${index + 1}`} key={`route-stop-${item.index}`}>
                    <Image
                      src="/assets/cartoon-clay-v2/navigation-system/05-route-stop-disc.webp"
                      width={420}
                      height={420}
                      alt=""
                      aria-hidden="true"
                      unoptimized
                    />
                  </span>
                ))}
              </div>
              {navItems.map((item, index) => (
                <span className={`clay-nav-anchor clay-nav-anchor-${index + 1}`} key={item.index}>
                  <a
                    className={`nav-card-inner clay-nav-link clay-nav-link-${index + 1}`}
                    href={item.href}
                    aria-label={`前往${item.label}`}
                    data-cursor-label={`OPEN ${item.english}`}
                  >
                    <span className="clay-nav-sprite"><Image src={item.image} width={item.width} height={item.height} alt="" aria-hidden="true" priority={index < 3} unoptimized /></span>
                    <span className="sr-only">{item.index} · {item.label} · {item.english}</span>
                  </a>
                </span>
              ))}
            </nav>
            <div className="nav-footer"><span id="preview-note">建议从作品开始：完整案例、实时 Demo 与代码都已开放。</span><span>© 2026</span></div>
          </div>
          <div className="avatar-anchor" aria-label="谢子涵软陶风个人肖像">
            <div className="story-avatar">
              <div className="avatar-orbit orbit-a" />
              <div className="avatar-orbit orbit-b" />
              <div className="avatar-portrait">
                <Image className="avatar-portrait-image" src="/assets/portrait/violet-clay-portrait-3d-cutout.webp" width={1254} height={1254} alt="谢子涵立体软陶风个人肖像" priority unoptimized />
              </div>
              <span className="avatar-tag">VIOLET XIE · CLAY SELF</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="work-canvas-v2"
        id="work"
        aria-labelledby="work-title"
        data-active-work={selectedWork.id}
      >
        <h2 className="sr-only" id="work-title">AI 辅助构建作品展示</h2>

        <div
          className="work-stage-v3"
          data-active-work={selectedWork.id}
        >
          <article
            className="work-feature-v3 work-feature-embed-v3"
            id="work-feature-stage"
            role="tabpanel"
            aria-labelledby={`work-tab-${selectedWork.id}`}
            aria-live="polite"
            key={selectedWork.id}
          >
            <div className="work-embed-shell-v3">
              <a
                className="work-embed-open-v3"
                href={selectedWork.caseHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`全屏打开${selectedWork.title}案例`}
                data-cursor-label={`OPEN ${selectedWork.english}`}
              >
                <span aria-hidden="true">↗</span>
              </a>
              <div className="work-embed-viewport-v3">
                <div className="work-embed-preview-v3">
                  <iframe
                    className="work-embed-frame-v3"
                    src={`${selectedWork.caseHref}?embed=1`}
                    title={`${selectedWork.title}完整作品展示`}
                    loading="eager"
                    allow="fullscreen"
                    onPointerEnter={() => window.dispatchEvent(new CustomEvent('violet-cursor-visibility', { detail: false }))}
                    onPointerLeave={() => window.dispatchEvent(new CustomEvent('violet-cursor-visibility', { detail: true }))}
                  />
                </div>
              </div>
            </div>
          </article>

          <div className="work-dock-v3">
            <Image
              className="work-dock-image-v3"
              src="/assets/cartoon-clay-v2/work-buttons-v3/web/work-rail-wave-v5.avif"
              alt=""
              fill
              sizes="(max-width: 820px) 1px, 106vw"
              aria-hidden="true"
              unoptimized
            />
            <div className="work-project-tabs-v3" role="tablist" aria-label="选择作品">
              {workProjects.map((project) => {
                const selected = activeWork === project.id;
                return (
                  <button
                    type="button"
                    role="tab"
                    id={`work-tab-${project.id}`}
                    aria-selected={selected}
                    aria-controls="work-feature-stage"
                    tabIndex={selected ? 0 : -1}
                    className="work-project-button-v3"
                    data-work-project-button
                    data-selected={selected ? 'true' : 'false'}
                    key={project.id}
                    onClick={() => activateWork(project.id)}
                    onKeyDown={(event) => {
                      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                      event.preventDefault();
                      let nextIndex = selectedWorkIndex;
                      if (event.key === 'ArrowLeft') nextIndex = (selectedWorkIndex - 1 + workProjects.length) % workProjects.length;
                      if (event.key === 'ArrowRight') nextIndex = (selectedWorkIndex + 1) % workProjects.length;
                      if (event.key === 'Home') nextIndex = 0;
                      if (event.key === 'End') nextIndex = workProjects.length - 1;
                      activateWork(workProjects[nextIndex].id);
                      window.requestAnimationFrame(() => {
                        pageRef.current?.querySelectorAll<HTMLButtonElement>('[data-work-project-button]')[nextIndex]?.focus();
                      });
                    }}
                    data-cursor-label={`OPEN ${project.english}`}
                  >
                    <span className="work-project-halo-v3" aria-hidden="true" />
                    <span className="work-project-sparkles-v3" aria-hidden="true">
                      {Array.from({ length: 6 }, (_, sparkleIndex) => <i key={sparkleIndex} />)}
                    </span>
                    <span className="work-project-hit-v3" aria-hidden="true" />
                    <Image className="work-project-art" src={project.image} alt="" fill sizes="(max-width: 820px) 30vw, 186px" unoptimized />
                    <span className="work-project-label-v3">{project.title}</span>
                    <span className="sr-only">{project.index} · {project.title} · {project.english}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <footer className="work-controls-v3" aria-live="polite">
            <div className="work-counter-v3" aria-hidden="true"><strong>{selectedWork.index}</strong><span>/ 06</span></div>
            <p><b>{selectedWork.title}</b> · 已选中。点击上方入口查看案例，或继续选择下一件作品。</p>
            <a href={selectedWork.caseHref}>{selectedWork.caseLabel}<span aria-hidden="true">→</span></a>
          </footer>
        </div>

        <p className="work-hint-v2">点击软陶切换作品；方向键、Home 与 End 可连续浏览。内容不会自动跳走。</p>
      </section>

      <section className="career-canvas-v2" id="career" aria-labelledby="career-title">
        <header className="career-heading-v2">
          <span>02 / CAREER LEVELS</span>
          <p>企业软件交付 2023—2026<br />FDE 方案实践 NOW</p>
        </header>

        <div className="career-stage-v2">
          <div className="career-focus-stage" aria-live="polite">
            <article
              className="career-focus-detail"
              id="career-focus-stage"
              role="tabpanel"
              aria-labelledby={`career-tab-${selectedCareer.id}`}
              key={selectedCareer.id}
            >
              <div className="career-focus-copy">
                <div className="career-focus-eyebrow"><span>{selectedCareer.level}</span><i>{selectedCareer.company}</i></div>
                <p className="career-focus-meta">{selectedCareer.period} · {selectedCareer.type} · {selectedCareer.location}</p>
                <h3>{selectedCareer.quest}</h3>
                <strong>{selectedCareer.metric}</strong>
                <p>{selectedCareer.summary}</p>
                <div className="career-evidence-grid">
                  {selectedCareer.evidence.map((item) => <span key={item.label}><b>{item.value}</b><small>{item.label}</small></span>)}
                </div>
                <div className="career-skill-list" aria-label="该阶段形成的能力">
                  {selectedCareer.skills.map((item) => <small key={item}>{item}</small>)}
                  {'credential' in selectedCareer && selectedCareer.credential ? (
                    <span className="career-stage-credential"><b>PMP</b>{selectedCareer.credential}</span>
                  ) : null}
                </div>
                {'honor' in selectedCareer && selectedCareer.honor ? (
                  <p className="career-stage-honor"><span>HONOR</span>{selectedCareer.honor}</p>
                ) : null}
              </div>

              <aside className="career-mission-browser" aria-label={`${selectedCareer.role}代表任务`}>
                <div className="career-mission-head">
                  <span>REPRESENTATIVE MISSIONS</span>
                  <p>{selectedCareer.stories.length} 条可切换经历</p>
                </div>
                <div className="career-mission-tabs" role="tablist" aria-label="选择该阶段的代表任务">
                  {selectedCareer.stories.map((story, index) => {
                    const selected = selectedCareerStory.id === story.id;
                    return (
                      <button
                        type="button"
                        role="tab"
                        id={`career-mission-tab-${selectedCareer.id}-${story.id}`}
                        aria-selected={selected}
                        aria-controls={`career-mission-panel-${selectedCareer.id}`}
                        tabIndex={selected ? 0 : -1}
                        key={story.id}
                        onClick={() => activateCareerStory(story.id)}
                        onKeyDown={(event) => {
                          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                          event.preventDefault();
                          const tabs = Array.from(event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
                          const nextIndex = event.key === 'Home'
                            ? 0
                            : event.key === 'End'
                              ? tabs.length - 1
                              : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
                          const nextStory = selectedCareer.stories[nextIndex];
                          const nextTab = tabs[nextIndex];
                          if (nextStory && nextTab) {
                            nextTab.focus();
                            activateCareerStory(nextStory.id);
                          }
                        }}
                      >
                        <small>{String(index + 1).padStart(2, '0')}</small>
                        <span>{story.label}</span>
                      </button>
                    );
                  })}
                </div>
                <article
                  className="career-mission-detail"
                  id={`career-mission-panel-${selectedCareer.id}`}
                  role="tabpanel"
                  aria-labelledby={`career-mission-tab-${selectedCareer.id}-${selectedCareerStory.id}`}
                  key={`${selectedCareer.id}-${selectedCareerStory.id}`}
                >
                  <div className="career-mission-copy">
                    <span>{selectedCareerStory.eyebrow}</span>
                    <h4>{selectedCareerStory.title}</h4>
                    <p>{selectedCareerStory.summary}</p>
                    <ul>
                      {selectedCareerStory.proof.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <figure className={`career-mission-media ${'kind' in selectedCareerStory.media && selectedCareerStory.media.kind === 'feedback-summary' ? 'is-feedback-summary' : selectedCareerGallery ? 'is-gallery' : selectedCareer.id === 'vibe-coding' && selectedCareerStory.id !== 'fde-course' ? 'is-illustration' : 'is-proof'}`}>
                    {'kind' in selectedCareerStory.media && selectedCareerStory.media.kind === 'feedback-summary' ? (
                      <div className="career-feedback-summary" aria-label="使用者反馈摘要">
                        {selectedCareerStory.media.items.map((item) => (
                          <article key={item.product}>
                            <span aria-hidden="true">{item.product === '跨境经营舱' ? 'CO' : 'TL'}</span>
                            <div><small>{item.product} · {item.role}</small><p>{item.summary}</p></div>
                          </article>
                        ))}
                        <em>根据使用者口头反馈整理</em>
                      </div>
                    ) : selectedCareerGallery && selectedCareerGalleryItem ? (
                      <>
                        <button
                          type="button"
                          className="career-media-switcher"
                          onClick={() => advanceCareerMedia(selectedCareerStory.id, selectedCareerGallery.items.length)}
                          aria-label={selectedCareerGallery.items.length > 1
                            ? `切换到下一张${selectedCareerStory.label}图片；当前第 ${selectedCareerMediaIndex + 1} 张，共 ${selectedCareerGallery.items.length} 张`
                            : `${selectedCareerStory.label}图片，共 1 张`}
                        >
                          <Image key={selectedCareerGalleryItem.src} src={selectedCareerGalleryItem.src} alt={selectedCareerGalleryItem.alt} fill sizes="(max-width: 800px) 100vw, 300px" loading="lazy" unoptimized />
                        </button>
                        <span className="career-media-status" aria-hidden="true">
                          {selectedCareerMediaIndex + 1} / {selectedCareerGallery.items.length}{selectedCareerGallery.items.length > 1 ? ' · 点击图片切换' : ''}
                        </span>
                        <nav className="career-media-pages" aria-label={`${selectedCareerStory.label}图片页码`}>
                          {selectedCareerGallery.items.map((item, index) => (
                            <button
                              type="button"
                              className={index === selectedCareerMediaIndex ? 'is-active' : ''}
                              aria-label={`查看第 ${index + 1} 张：${item.label}`}
                              aria-current={index === selectedCareerMediaIndex ? 'true' : undefined}
                              onClick={() => selectCareerMedia(selectedCareerStory.id, index)}
                              key={item.src}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </button>
                          ))}
                        </nav>
                      </>
                    ) : (
                      null
                    )}
                    <figcaption>{selectedCareerGalleryItem?.label ?? selectedCareerStory.media.label}</figcaption>
                  </figure>
                </article>
              </aside>
            </article>
          </div>

          <div className="career-ladder-deck">
            <div className="career-ladder-wrap">
              <div className="career-stage-list" role="tablist" aria-label="选择职业阶段">
                {careerStages.map((stage, index) => {
                  const selected = activeCareer === stage.id;
                  return (
                    <div className={`career-ladder-step career-ladder-step-${index + 1} ${selected ? 'is-active' : ''}`} key={stage.id}>
                      <button
                        type="button"
                        role="tab"
                        id={`career-tab-${stage.id}`}
                        aria-selected={selected}
                        aria-controls="career-focus-stage"
                        tabIndex={selected ? 0 : -1}
                        className={`career-stage-node career-stage-${index + 1}`}
                        onClick={(event) => activateCareer(stage.id, event.currentTarget)}
                        onKeyDown={(event) => {
                          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                          event.preventDefault();
                          const tabs = Array.from(event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []);
                          const nextIndex = event.key === 'Home'
                            ? 0
                            : event.key === 'End'
                              ? tabs.length - 1
                              : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
                          const nextStage = careerStages[nextIndex];
                          const nextTab = tabs[nextIndex];
                          if (nextStage && nextTab) {
                            nextTab.focus();
                            activateCareer(nextStage.id, nextTab);
                          }
                        }}
                        data-cursor-label={`OPEN ${stage.level}`}
                      >
                        <span className="career-stage-sprite" aria-hidden="true">
                          <Image src={stage.image} alt="" width={1122} height={1402} sizes="(max-width: 800px) 25vw, 150px" loading="lazy" unoptimized />
                        </span>
                        <span className="career-stage-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        <span className="career-stage-label"><small>{stage.level}</small><strong>{stage.tabLabel}</strong><i>{stage.altitude}</i></span>
                        <span className="career-stage-selected" aria-hidden="true">正在展示</span>
                      </button>
                      <span className="career-step-period" aria-hidden="true">{stage.period}</span>
                    </div>
                  );
                })}
              </div>
              <div className="career-quest-title">
                <h2 id="career-title"><b>打怪</b><em>升级。</em></h2>
              </div>
              <button
                type="button"
                className={`career-persona-stage ${shiftedCareerPersona === selectedCareerStory.id ? 'is-shifted' : ''}`}
                key={`${selectedCareer.id}-${selectedCareerStory.id}`}
                aria-label={shiftedCareerPersona === selectedCareerStory.id ? '让粘土小人移动回原位' : '让粘土小人移动一段距离'}
                aria-pressed={shiftedCareerPersona === selectedCareerStory.id}
                onClick={() => toggleCareerPersona(selectedCareerStory.id)}
                data-cursor-label={shiftedCareerPersona === selectedCareerStory.id ? 'RETURN' : 'MOVE'}
                title={shiftedCareerPersona === selectedCareerStory.id ? '再次点击，回到原位' : '点击，让小人移动'}
              >
                <span className="career-persona-motion" aria-hidden="true">
                  <Image
                    src={selectedCareerPersona}
                    alt=""
                    fill
                    style={{ objectFit: 'contain', objectPosition: '50% 100%' }}
                    sizes="(max-width: 800px) 62vw, 300px"
                    loading="eager"
                    unoptimized
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="education-canvas" id="education" aria-labelledby="education-title" onClick={resetEducationFromBlank} onKeyDown={resetEducationFromKeyboard}>
        <h2 className="sr-only" id="education-title">{educationPage.title}</h2>
        <header className="education-heading">
          <span>{educationPage.sectionIndex}</span>
          <p>{educationPage.intro}</p>
        </header>
        <div
          className={`education-stage education-stage-v2 ${selectedEducation || selectedEducationSchool ? 'has-focus' : ''} ${selectedEducationSchool ? 'has-school-focus' : ''} ${selectedEducation || activeEducationSchool === 'university' ? 'has-university-paths-open' : ''}`}
          data-education-focus={activeEducation ?? activeEducationSchool ?? 'none'}
        >
          <div className="education-campus-field" aria-hidden="true" />
          <svg className="education-growth-routes" viewBox="0 0 1000 540" preserveAspectRatio="none" aria-hidden="true">
            <path className="education-route-backbone" d="M94 82 C258 142 382 222 520 330 C650 430 722 474 806 476" />
            <path className="education-route-branch education-route-collapsed education-route-activities" d="M806 476 C716 478 624 485 526 492" />
            <path className="education-route-branch education-route-collapsed education-route-leadership" d="M806 476 C759 412 718 352 677 293" />
            <path className="education-route-branch education-route-collapsed education-route-honors" d="M806 476 C844 420 868 365 892 310" />
            <path className="education-route-branch education-route-expanded education-route-activities" d="M806 476 C682 480 566 488 443 492" />
            <path className="education-route-branch education-route-expanded education-route-leadership" d="M806 476 C744 397 690 322 630 255" />
            <path className="education-route-branch education-route-expanded education-route-honors" d="M806 476 C857 405 888 334 912 272" />
            <circle className="education-route-hub" cx="806" cy="476" r="8" />
          </svg>
          <p className="education-campus-caption" aria-hidden="true"><span>{educationPage.universityCaptionEyebrow}</span><strong>{educationPage.universityCaption}</strong></p>

          <button
            type="button"
            className="education-school-mark education-school-high"
            aria-pressed={activeEducationSchool === educationSchools[0].id}
            aria-controls="education-detail"
            onClick={(event) => activateEducationSchool(educationSchools[0].id, event.currentTarget)}
            data-cursor-label="OPEN HIGH SCHOOL"
          >
            <span className="education-school-radiance" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></span>
            <span className="education-school-flash" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="education-school-sprite">
              <Image src={educationSchools[0].image} width={educationSchools[0].width} height={educationSchools[0].height} alt="" aria-hidden="true" loading="lazy" unoptimized />
            </span>
            <span className="education-school-cue"><small>{educationPage.meetSchool}</small><strong>{educationSchools[0].cue}</strong></span>
            <span className="sr-only">{educationSchools[0].english} · {educationSchools[0].label}</span>
          </button>

          <button
            type="button"
            className="education-school-mark education-school-university"
            aria-pressed={activeEducationSchool === educationSchools[1].id}
            aria-controls="education-detail"
            onClick={(event) => activateEducationSchool(educationSchools[1].id, event.currentTarget)}
            data-cursor-label="OPEN UNIVERSITY"
          >
            <span className="education-school-radiance" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></span>
            <span className="education-school-flash" aria-hidden="true"><i /><i /><i /><i /></span>
            <span className="education-school-sprite">
              <Image src={educationSchools[1].image} width={educationSchools[1].width} height={educationSchools[1].height} alt="" aria-hidden="true" loading="lazy" unoptimized />
            </span>
            <span className="education-school-cue"><small>{educationPage.meetSchool}</small><strong>{educationSchools[1].cue}</strong></span>
            <span className="sr-only">{educationSchools[1].english} · {educationSchools[1].label}</span>
          </button>

          {educationSchools.filter((school) => school.character && school.id !== 'university').map((school) => {
            const character = school.character;
            if (!character) return null;
            const isVisible = activeEducationSchool === school.id;
            return (
              <figure
                className={`education-school-character education-school-character-${school.id}`}
                data-visible={isVisible}
                aria-hidden={!isVisible}
                key={school.id}
              >
                <Image
                  src={character.src}
                  width={character.width}
                  height={character.height}
                  alt={character.alt}
                  loading="lazy"
                  unoptimized
                />
              </figure>
            );
          })}

          <div className="education-topic-cluster" role="tablist" aria-label="大学经历入口">
            {educationTopics.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeEducation === item.id}
                aria-controls="education-detail"
                className={`education-topic-node education-topic-${index + 1}`}
                key={item.id}
                onClick={(event) => activateEducation(item.id, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return;
                  event.preventDefault();
                  activateEducation(item.id, event.currentTarget);
                }}
                data-cursor-label={`OPEN ${item.english}`}
              >
                <span className="education-topic-pedestal" aria-hidden="true" />
                <span className="education-topic-flash" aria-hidden="true"><i /><i /><i /><i /></span>
                <span className="education-topic-sprite"><Image className="education-topic-art" src={item.image} width={item.width} height={item.height} alt="" aria-hidden="true" loading="lazy" unoptimized /></span>
                <span className="education-topic-cue" aria-hidden="true">
                  <small>0{index + 1}</small>
                  <strong>{activeEducation === item.id ? educationPage.topicViewing : activeEducationSchool === 'university' ? educationPage.topicOpen : activeEducation ? educationPage.topicSwitch : educationPage.topicOpen}</strong>
                </span>
                <span className="sr-only">{item.label}</span>
              </button>
            ))}
          </div>

          {educationTopics.filter((topic) => topic.character).map((topic) => {
            const character = topic.character;
            if (!character) return null;
            const isVisible = activeEducation === topic.id;
            return (
              <figure
                className={`education-topic-character education-topic-character-${topic.id}`}
                data-visible={isVisible}
                aria-hidden={!isVisible}
                key={topic.id}
              >
                <Image
                  src={character.src}
                  width={character.width}
                  height={character.height}
                  alt={character.alt}
                  loading="lazy"
                  unoptimized
                />
              </figure>
            );
          })}

          {selectedEducation && (
            <div className="education-detail-shell" id="education-detail" role="tabpanel" aria-label={selectedEducation.label} aria-live="polite" key={selectedEducation.id}>
              <div className="education-detail-copy">
                <span>{selectedEducation.english}</span>
                <h3 className="sr-only">{selectedEducation.label}</h3>
                <p>{selectedEducation.lead}</p>
                <ul>{selectedEducation.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              {selectedEducationMedia && (
                <figure className="education-detail-media education-detail-gallery" aria-label={`${selectedEducation.label}照片`}>
                  <button
                    type="button"
                    className="education-media-switcher"
                    onClick={() => advanceEducationMedia(selectedEducation.id, selectedEducation.details.length)}
                    aria-label={`切换到下一张${selectedEducation.label}照片；当前第 ${selectedEducationMediaIndex + 1} 张，共 ${selectedEducation.details.length} 张`}
                  >
                    <Image
                      key={selectedEducationMedia.src}
                      src={selectedEducationMedia.src}
                      alt={selectedEducationMedia.alt}
                      fill
                      sizes="(max-width: 800px) 100vw, 560px"
                      loading="lazy"
                      unoptimized
                    />
                  </button>
                  <span className="education-media-status" aria-live="polite" aria-atomic="true">
                    {selectedEducationMediaIndex + 1} / {selectedEducation.details.length} · 点击图片切换
                  </span>
                  <nav className="education-media-pages" aria-label={`${selectedEducation.label}照片页码`}>
                    {selectedEducation.details.map((detail, index) => (
                      <button
                        type="button"
                        className={index === selectedEducationMediaIndex ? 'is-active' : ''}
                        aria-label={`查看第 ${index + 1} 张：${detail.label ?? detail.alt}`}
                        aria-current={index === selectedEducationMediaIndex ? 'true' : undefined}
                        onClick={() => selectEducationMedia(selectedEducation.id, index)}
                        key={detail.src}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </nav>
                  <figcaption>{selectedEducationMedia.label ?? selectedEducationMedia.alt}</figcaption>
                </figure>
              )}
            </div>
          )}

          {selectedEducationSchool && (
            <div className={`education-detail-shell education-school-story education-school-story-${selectedEducationSchool.id}`} id="education-detail" role="region" aria-label={selectedEducationSchool.label} aria-live="polite" key={selectedEducationSchool.id}>
              <div className="education-detail-copy">
                <span>{selectedEducationSchool.english}</span>
                <h3>{selectedEducationSchool.title}</h3>
                <strong className="education-school-meta">{selectedEducationSchool.meta}</strong>
                <p>{selectedEducationSchool.lead}</p>
                <ul>{selectedEducationSchool.notes.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              {selectedEducationSchool.id === 'university' && selectedEducationSchool.character && (
                <figure className="education-school-story-character">
                  <Image
                    src={selectedEducationSchool.character.src}
                    width={selectedEducationSchool.character.width}
                    height={selectedEducationSchool.character.height}
                    alt={selectedEducationSchool.character.alt}
                    loading="lazy"
                    unoptimized
                  />
                </figure>
              )}
              {selectedEducationSchool.details.length > 0 && (
                <div className="education-detail-media education-school-story-media" aria-label={`${selectedEducationSchool.title}补充素材`}>
                  {selectedEducationSchool.details.map((detail) => (
                    <span className="education-detail-card" key={detail.src}>
                      <Image src={detail.src} width={detail.width} height={detail.height} alt={detail.alt} loading="lazy" unoptimized />
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <p className="education-hint">{selectedEducation ? educationPage.topicHint : activeEducationSchool === 'university' ? educationPage.universityHint : selectedEducationSchool ? educationPage.schoolHint : educationPage.initialHint}</p>
      </section>

      <section className={`life-canvas-v2 ${selectedLife ? 'is-illuminated' : 'is-dormant'}`} id="life" aria-labelledby="life-title">
        <span className="life-ambient-light" aria-hidden="true" />
        <span className="life-light-scrim" aria-hidden="true" />
        <div className="life-vine-frame" aria-hidden="true">
          <Image className="life-vine-image" src="/assets/cartoon-clay-v2/life-garden-v1/frame/00-vine-frame-open-v3.png" width={1920} height={1080} alt="" loading="lazy" unoptimized />
        </div>

        <header className="life-heading-v2">
          <span>04 / LIFE &amp; INTERESTS</span>
          <h2 className="sr-only" id="life-title">生活与兴趣</h2>
          <p>五朵生活花，各自收着一组真实记忆。点开一朵，记忆会在中央亮起。</p>
        </header>

        <div className={`life-stage-v2 ${selectedLife ? 'has-memory' : ''}`}>
          <div className="life-interest-orbit" role="tablist" aria-label="生活兴趣入口">
            {lifeInterestLayout.map(({ interest, positionClass }) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeLife === interest.id}
                aria-controls="life-focus-stage"
                className={`life-interest-button ${positionClass}`}
                key={interest.id}
                onClick={(event) => activateLife(interest.id, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return;
                  event.preventDefault();
                  activateLife(interest.id, event.currentTarget);
                }}
                data-life-interest={interest.id}
                data-cursor-label={`OPEN ${interest.english}`}
              >
                <span className="life-interest-sprite">
                  <span className="life-flower-picture" aria-hidden="true">
                    <Image className="life-interest-art life-flower-bud" src={interest.budImage} width={interest.width} height={interest.height} alt="" loading="lazy" unoptimized />
                    <Image className="life-interest-art life-flower-bloom" src={interest.bloomImage} width={interest.width} height={interest.height} alt="" loading="lazy" unoptimized />
                    <span className="life-flower-sparkles">
                      <i /><i /><i /><i /><i /><i />
                    </span>
                  </span>
                  <span className="life-flower-label">
                    <Image className="life-flower-title-art" src={interest.titleImage} width={1200} height={360} alt="" loading="lazy" unoptimized />
                    <span className="sr-only">{interest.index} · {interest.title} · {interest.english}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="life-focus-stage" id="life-focus-stage" aria-live="polite">
            {selectedLife && (
              <article className="life-focus-content" role="tabpanel" aria-label={selectedLife.title} key={selectedLife.id}>
                <div className="life-focus-copy">
                  <span>{selectedLife.index} / {selectedLife.english}</span>
                  <h3 className="sr-only">{selectedLife.title}</h3>
                  <p>{selectedLife.note}</p>
                  <div className="life-keyword-cloud" aria-label={`${selectedLife.title}关键词`}>
                    {selectedLife.tags.map((tag) => <small key={tag}>{tag}</small>)}
                  </div>
                </div>
                <div
                  className="life-memory-gallery"
                  data-columns={selectedLifeGalleryColumns}
                  data-count={selectedLifeMedia.length}
                  data-interest={selectedLife.id}
                  data-portrait-phase={lifePortraitPhase}
                  data-portrait-instant={instantLifePortrait === null ? 'false' : 'true'}
                  aria-label={`${selectedLife.title}的全部 ${selectedLifeMedia.length} 项风格化视觉记忆`}
                >
                  {selectedLifeMedia.map((media, index) => {
                    const portraitKey = `${selectedLife.id}-${index}`;
                    const isPortrait = media.kind === 'portrait';
                    const isHolding = isPortrait && holdingLifePortrait === portraitKey;
                    const isRevealed = isPortrait && Boolean(revealedLifePortraits[selectedLife.id]);
                    const isInstant = isPortrait && instantLifePortrait !== null;
                    return (
                      <span className={`life-memory-card ${isPortrait ? 'is-portrait' : 'is-evidence'}`} key={media.src}>
                        <span className="life-memory-visual">
                          {media.kind === 'portrait' ? (
                            <button
                              type="button"
                              className={`life-portrait-reveal ${isHolding ? 'is-holding' : ''} ${isRevealed ? 'is-revealed' : ''} ${isInstant ? 'is-instant' : ''}`}
                              aria-label={isRevealed ? `正在显示${selectedLife.title}全组光影效果` : `长按 1.5 秒，查看${selectedLife.title}全组光影效果：${media.alt}`}
                              aria-pressed={isRevealed}
                              data-cursor-label={isRevealed ? 'MEMORY GLOW' : 'HOLD 1.5S'}
                              onPointerDown={(event) => beginLifePortraitHold(portraitKey, selectedLife.id, event)}
                              onPointerUp={() => cancelLifePortraitHold(portraitKey)}
                              onPointerCancel={() => cancelLifePortraitHold(portraitKey)}
                              onPointerLeave={() => cancelLifePortraitHold(portraitKey)}
                              onBlur={() => cancelLifePortraitHold(portraitKey)}
                              onKeyDown={(event) => revealLifePortraitFromKeyboard(portraitKey, selectedLife.id, event)}
                              onContextMenu={(event) => event.preventDefault()}
                            >
                              <span className="life-clay-motion" aria-hidden="true">
                                <Image className="life-portrait-layer life-memory-clay" src={media.src} alt="" sizes="(max-width: 800px) 36vw, 13vw" loading="lazy" draggable={false} fill unoptimized />
                              </span>
                              <Image className="life-portrait-layer life-memory-real" src={media.realSrc} alt="" aria-hidden="true" sizes="(max-width: 800px) 36vw, 13vw" loading="lazy" draggable={false} fill unoptimized />
                              <span className="life-portrait-transform-ring" aria-hidden="true" />
                              <span className="life-portrait-hold-progress" aria-hidden="true" />
                            </button>
                          ) : (
                            <Image className="life-memory-evidence" src={media.src} alt={media.alt} sizes="(max-width: 800px) 36vw, 13vw" loading="lazy" fill unoptimized />
                          )}
                        </span>
                        {media.kind === 'evidence' && <small>{media.label}</small>}
                      </span>
                    );
                  })}
                </div>
              </article>
            )}
          </div>
        </div>

        <p className="life-hint-v2">{selectedLife ? `已收录全部 ${selectedLifeMedia.length} 项风格化素材；长按任意人像 1.5 秒可触发整组光影效果。` : '选择一朵花，让它在中央唤醒这组记忆。'}</p>
      </section>

      <section className="contact-canvas-v2" id="contact" aria-labelledby="contact-title">
        <header className="contact-heading-v2">
          <span>05 / CONTACT</span>
          <h2 id="contact-title">寻找 FDE 机会，<br /><em>欢迎直接联系。</em></h2>
          <p>目前在深圳，可异地、出差与驻场；邮箱是最直接的联系入口。</p>
        </header>

        <div className={`contact-stage-v2 ${selectedContact ? 'has-contact-focus' : ''}`}>
          <div className="contact-entry-list" role="tablist" aria-label="联系 Violet 的方式">
            {contactEntries.map((entry, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeContact === entry.id}
                aria-controls="contact-focus-stage"
                className={`contact-entry-button contact-entry-${index + 1}`}
                key={entry.id}
                onClick={(event) => activateContact(entry.id, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return;
                  event.preventDefault();
                  activateContact(entry.id, event.currentTarget, false);
                }}
                data-cursor-label={`OPEN ${entry.english}`}
              >
                <span className="contact-entry-sprite"><Image src={entry.image} width={entry.width} height={entry.height} alt="" aria-hidden="true" loading="lazy" unoptimized /></span>
                <span className="sr-only">{entry.index} · {entry.label} · {entry.english}</span>
              </button>
            ))}
          </div>

          <div className="contact-focus-stage" id="contact-focus-stage" aria-live="polite">
            {selectedContact ? (
              <article className="contact-focus-detail" role="tabpanel" aria-label={selectedContact.label} key={selectedContact.id}>
                <span>{selectedContact.index} / {selectedContact.english}</span>
                <h3>{selectedContact.value}</h3>
                <p>{selectedContact.note}</p>
                {selectedContact.href ? (
                  <a href={selectedContact.href} target={selectedContact.id === 'github' ? '_blank' : undefined} rel={selectedContact.id === 'github' ? 'noreferrer' : undefined}>
                    {selectedContact.id === 'email' ? '写一封邮件' : '打开 GitHub'} <i aria-hidden="true">↗</i>
                  </a>
                ) : selectedContact.id === 'resume' ? (
                  <button ref={resumeTriggerRef} type="button" aria-haspopup="dialog" aria-expanded={downloadOpen} aria-controls="resume-download-dialog" onClick={openResume}>
                    查看简历选项 <i aria-hidden="true">↗</i>
                  </button>
                ) : (
                  <button type="button" aria-disabled="true" onClick={(event) => event.preventDefault()}>微信沟通后提供</button>
                )}
              </article>
            ) : (
              <div className="contact-focus-idle" aria-hidden="true"><span>+</span><strong>CHOOSE A WAY<br />TO SAY HELLO</strong></div>
            )}
          </div>
        </div>

        <p className="contact-hint-v2">所有入口均可点击或用键盘打开；尚未确认的信息会明确显示“准备中”。</p>
      </section>

      {downloadOpen && (
        <div className="resume-modal-backdrop" role="presentation" onMouseDown={() => closeResume(false)}>
          <section
            className="resume-modal"
            id="resume-download-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            aria-describedby="resume-modal-note"
            onKeyDown={trapDownloadFocus}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="resume-modal-head">
              <div><span>DOWNLOAD CENTER</span><h2 id="resume-modal-title">按需了解 Violet</h2></div>
              <button type="button" onClick={() => closeResume(false)} aria-label="关闭简历选项" data-cursor-label="CLOSE">CLOSE ×</button>
            </div>
            <div className="resume-download-list">
              {downloads.map((item, index) => (
                <button
                  ref={index === 0 ? firstDownloadOptionRef : undefined}
                  className="resume-download-option"
                  type="button"
                  aria-disabled="true"
                  aria-label={`${item.name}，${item.meta}，文件准备中`}
                  key={item.name}
                  onClick={(event) => event.preventDefault()}
                >
                  <Image src={item.image} width={2172} height={724} alt="" aria-hidden="true" loading="lazy" unoptimized />
                  <span><strong>{item.name}</strong><small>{item.meta}</small></span>
                  <i>准备中</i>
                </button>
              ))}
            </div>
            <p id="resume-modal-note">正式 PDF 尚未就绪；完成后会在这里接入真实下载文件。</p>
          </section>
        </div>
      )}
    </main>
  );
}
