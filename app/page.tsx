'use client';

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lifeMediaByInterest, type LifeMedia } from '../content/life-media';
import { lifeMediaPlacement, lifeStoryCopy, lifeThemeMedia } from '../content/life-scenes';
import { LifeImageViewer, type LifeFullImage } from './LifeImageViewer';
import './life-curated.css';
import educationContent from '../public/education-page/content.json';
import { LiquidCursor } from './LiquidCursor';
import { SensoryLayer } from './SensoryLayer';
import { FdeTriptychIntro } from './FdeTriptychIntro';
import { WorkShowcase } from './WorkShowcase';
import { CareerImageLightbox, type CareerLightboxImage } from './CareerImageLightbox';
import { playUISound } from './lib/ui-sound';
import navigationStyles from './NavigationIntro.module.css';

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
  { id: 'wechat', index: '02', label: '微信', english: 'WECHAT', image: '/assets/cartoon-clay-v2/06-contact/02-wechat.webp', width: 1942, height: 809, value: 'xiezihan1234', note: '微信号已公开，可直接添加；添加时请备注来意。', href: null },
  { id: 'github', index: '03', label: 'GitHub', english: 'GITHUB', image: '/assets/cartoon-clay-v2/06-contact/03-github.webp', width: 2043, height: 770, value: 'violetloveai', note: '查看项目源码、实现思路与持续迭代记录。', href: 'https://github.com/violetloveai' },
  { id: 'resume', index: '04', label: '简历', english: 'RESUME', image: '/assets/cartoon-clay-v2/06-contact/04-resume-download.webp', width: 2172, height: 724, value: 'FDE 求职材料', note: '一页中文简历与 FDE 项目作品集可按岗位需要提供。', href: null },
] as const;

const downloads = [
  { name: '一页中文简历', meta: '快速了解 · 1 PAGE', image: '/assets/cartoon-clay-v2/resume-buttons/01-one-page-chinese-resume.webp', href: '/downloads/xie-zihan-fde-resume-one-page.pdf', filename: '谢子涵_FDE一页中文简历_20261009.pdf' },
  { name: 'FDE 项目作品集', meta: '项目证据 · CASEBOOK', image: '/assets/cartoon-clay-v2/resume-buttons/03-fde-project-portfolio.webp', href: '/downloads/xie-zihan-fde-portfolio.pdf', filename: '谢子涵_FDE个人作品集.pdf' },
] as const;

const careerStages = [
  {
    id: 'delivery-management', level: 'LV.01', role: '交付管理', tabLabel: '交付管理', type: '实习', period: '2023.09—2023.12', altitude: '理解交付',
    company: '金蝶软件 · 大项目交付部', location: '深圳 · 总部知识赋能',
    quest: '第一次站到交付的中间', metric: '知识被理解、被采用，交付才算发生。',
    summary: '在总部协调讲师、学员与交付团队，独立支撑七城培训，承担直播主持、宣传、录制与复盘。',
    evidence: [
      { value: '7 城', label: '线下培训独立支撑' },
      { value: '37 场', label: '线上直播全流程' },
      { value: '9.9 / 10', label: '会务满意度' },
    ],
    stories: [
      {
        id: 'training-tour', label: '线下交付', eyebrow: '01 / OFFLINE DELIVERY',
        title: '把培训真正送到七座城市',
        summary: '独立支撑七城培训，协调讲师与场地，整理报名、签到、住宿和抵达指引，完成会务组织。',
        proof: ['7 城独立支撑', '会务满意度 9.9 / 10', '讲师 · 学员 · 场地 · 会务协同'],
        media: {
          kind: 'gallery',
          label: '培训交付 · 3 张工作记录',
          items: [
            { src: '/assets/career-proof/gallery/training-tour/01-training-scenes-0a568f4dd6.webp', alt: '三场金蝶线下培训的集体合影拼图', label: '培训交付 · 多场线下培训现场' },
            { src: '/assets/career-proof/gallery/training-tour/02-event-materials-7b5716d347.webp', alt: '培训报名签到等会务资料目录，以及抵达和停车指引', label: '培训交付 · 会务资料与抵达指引' },
            { src: '/assets/career-proof/gallery/training-tour/03-event-badges-f627fad921.webp', alt: '七城线下培训期间使用的多张会务工作证', label: '培训交付 · 七城会务工作证' },
          ],
        },
      },
      {
        id: 'live-operations', label: '线上赋能', eyebrow: '02 / LIVE OPERATIONS',
        title: '让 37 场直播稳定抵达 5,000+ 人次',
        summary: '负责主持、宣传、录制与复盘，形成可重复执行的直播流程，方便学员观看和回看。',
        proof: ['37 场线上直播', '累计观看 5,000+ 人次', '主持 · 宣传 · 录制 · 复盘'],
        media: {
          kind: 'gallery',
          label: '直播运营 · 2 张工作记录',
          items: [
            { src: '/assets/career-proof/gallery/live-operations/01-live-poster-ee8c442753.webp', alt: '通用技术集团合并报表解决方案分享的直播宣传海报', label: '直播运营 · 合并报表方案直播海报' },
            { src: '/assets/career-proof/gallery/live-operations/02-campaign-archive-5d577b0436.webp', alt: '蜀道集团合并报表案例直播海报与宣传素材归档目录', label: '直播运营 · 案例海报与宣传素材归档' },
          ],
        },
      },
    ],
    skills: ['活动运营', '结构化表达', '多方协作'],
    image: '/assets/cartoon-clay-v2/career-evidence/01-delivery-management.webp', alt: '交付管理中的培训组织与直播协作场景插画',
  },
  {
    id: 'implementation-consultant', level: 'LV.02', role: '实施顾问', tabLabel: '实施顾问', type: '实习', period: '2024.01—2024.08', altitude: '进入系统',
    company: '金蝶软件 · 中金岭南共享融合项目', location: '韶关 · 全程驻场',
    quest: '第一次进入大型企业系统建设', metric: '整理数据、完成配置，跟进问题与上线。',
    summary: '驻场参与千万级财务共享融合项目，处理主数据、总账、审批流与测试，推进上线和验收。',
    evidence: [
      { value: '20,000+', label: '客户与供应商主数据' },
      { value: '1,100+', label: '凭证异常报告' },
      { value: '千万级', label: '财务共享融合项目' },
    ],
    stories: [
      {
        id: 'master-data', label: '主数据治理', eyebrow: '01 / DATA MIGRATION',
        title: '让 20,000+ 条主数据可导入、可验收',
        summary: '用 SQL、Excel 与 Python 清洗主数据、统一社会信用代码，完成导入与信息部验收。',
        proof: ['20,000+ 客户与供应商数据', 'SQL · Excel · Python 联合处理', '完成系统导入与信息部验收'],
        media: {
          kind: 'gallery',
          label: '主数据治理 · 2 张工作记录',
          items: [
            { src: '/assets/career-proof/gallery/master-data/01-cleaning-plan-b7ff9250ce.webp', alt: '主数据清洗专题会议后的处理方案与阶段进度表', label: '主数据治理 · 主数据清洗方案与进度' },
            { src: '/assets/career-proof/gallery/master-data/02-supplier-data-f3e798e991.webp', alt: '供应商主数据清洗与字段核对工作表', label: '主数据治理 · 供应商主数据清洗工作表' },
          ],
        },
      },
      {
        id: 'go-live', label: '驻场上线', eyebrow: '02 / GO-LIVE',
        title: '从需求澄清到多公司上线切换',
        summary: '驻场支持多家子公司，跟进需求、配置与上线切换，用问题清单、周会纪要和交接手册跟踪进展。',
        proof: ['多家子公司并行推进', '1,100+ 条凭证异常报告', '问题 · 责任人 · 进度持续闭环'],
        media: {
          kind: 'gallery',
          label: '驻场上线 · 4 张工作记录',
          items: [
            { src: '/assets/career-proof/gallery/go-live/01-issue-progress-52ea792415.webp', alt: '截至 2024 年 5 月 31 日的多公司问题处理进度统计', label: '驻场上线 · 问题处理进度 · 2024.05.31' },
            { src: '/assets/career-proof/gallery/go-live/02-project-communication-be68394aa0.webp', alt: '多个项目业务群中的上线沟通与问题响应记录', label: '驻场上线 · 多公司沟通与问题响应' },
            { src: '/assets/career-proof/gallery/go-live/03-project-meetings-c31a4a1051.webp', alt: '项目周会纪要归档目录及会议记录示例', label: '驻场上线 · 项目周会纪要与跟进记录' },
            { src: '/assets/career-proof/gallery/go-live/04-handover-manual-0913a7cb0d.webp', alt: '驻场项目工作交接手册中的任务、操作步骤与注意事项', label: '驻场上线 · 驻场工作交接手册' },
          ],
        },
      },
    ],
    skills: ['数据治理', 'SQL · Python', '上线切换'],
    image: '/assets/cartoon-clay-v2/career-evidence/02-implementation-consultant.webp', alt: '实施顾问进行系统配置和数据治理的场景插画',
  },
  {
    id: 'application-support', level: 'LV.03', role: '应用支持', tabLabel: '应用支持', type: '全职', period: '2024.08—2026.01', altitude: '解决问题',
    company: '金蝶软件 · 招商局港口及金控项目', location: '深圳 · 全程驻场',
    quest: '从解决问题，到建立机制', metric: '处理日常问题，改进检查机制、知识与工具。',
    summary: '驻场服务招商局港口、金控两大板块，负责系统支持，并推进审批治理、知识整理和自动化。',
    evidence: [
      { value: '3,100+', label: '5 个月检查单据' },
      { value: '22 → 2.5', label: '月均审批问题' },
      { value: '13 套', label: '总手册覆盖系统' },
    ],
    honor: '纯金训练营唯一双优：优秀个人 + 优秀小组（组长）',
    credential: '在职期间考取项目管理专业人士认证',
    stories: [
      {
        id: 'operations-delivery', label: '现场诊断', eyebrow: '01 / FIELD DIAGNOSIS',
        title: '把模糊诉求拆成可闭环的问题',
        summary: '先澄清流程，再复现问题，通过 SQL、权限、配置和接口检查定位原因；整理证据，协调实施、开发与产品处理。',
        proof: ['两大业务板块长期驻场', '日常运营 · 月结 · 新需求 · 上线', '形成 80+ 篇日报与 90+ 封风险邮件'],
        media: {
          kind: 'gallery',
          label: '现场诊断 · 4 张工作记录',
          items: [
            { src: '/assets/career-proof/gallery/operations-delivery/01-diagnosis-overview-9d5672a158.webp', alt: '现场问题诊断的工作分类、处理方法与成果说明', label: '现场诊断 · 现场问题诊断方法' },
            { src: '/assets/career-proof/gallery/operations-delivery/02-diagnostic-sql-2efbaa654f.webp', alt: '按用途和系统整理的 SQL 排障语句与使用说明', label: '现场诊断 · SQL 排障语句与说明' },
            { src: '/assets/career-proof/gallery/operations-delivery/03-monthly-operations-8f11995859.webp', alt: '退单率、差旅云等月度运营指标的统计表与文件归档', label: '现场诊断 · 月度运营指标与统计记录' },
            { src: '/assets/career-proof/gallery/operations-delivery/04-certificates-honors-fa5a07a7ec.webp', alt: '金蝶财务与供应链认证证书以及训练营优秀小组荣誉拼图', label: '现场诊断 · 财务与供应链认证、团队荣誉' },
          ],
        },
      },
      {
        id: 'approval-governance', label: '审批治理', eyebrow: '02 / APPROVAL GOVERNANCE',
        title: '把反复故障做成审批治理机制',
        summary: '用 SQL 批量检查，跟踪主数据变更和在途单据；提出“部门编码＋职务”方案，协同开发落地。',
        proof: ['5 个月检查 3,100+ 张单据', '提前识别 17 张异常单据', '月均问题 22 → 2.5'],
        media: {
          kind: 'gallery',
          label: '审批治理 · 3 张工作记录',
          items: [
            { src: '/assets/career-proof/gallery/approval-governance/01-governance-results-cb9c15a89d.webp', alt: '港口总部 2024 年 6 至 9 月审批流程问题整改前后统计', label: '审批治理 · 整改前后统计 · 2024.06—09' },
            { src: '/assets/career-proof/gallery/approval-governance/02-review-mechanism-775c391778.webp', alt: '审批流整改阶段安排及人工监控检查机制', label: '审批治理 · 审批整改与人工检查机制' },
            { src: '/assets/career-proof/gallery/approval-governance/03-ongoing-review-4d655ac3e4.webp', alt: '2025 年在途审批单据的例行检查表与检查记录归档', label: '审批治理 · 在途审批例行检查 · 2025' },
          ],
        },
      },
      {
        id: 'system-manual', label: '知识与带教', eyebrow: '03 / KNOWLEDGE ENABLEMENT',
        title: '把 13 套系统的知识整理成可用指南',
        summary: '协同模块负责人整理 13 套系统的操作手册和单据流转图，发布可点击指南，并带教 2 名新人。',
        proof: ['覆盖 13 套主要系统', '发布至官方系统指南', '带教 2 名项目新人'],
        media: {
          kind: 'gallery',
          label: '知识与带教 · 3 张工作记录',
          items: [
            { src: '/assets/career-proof/gallery/system-manual/01-knowledge-overview-c27b1c1b90.webp', alt: '覆盖 13 套系统的操作手册与流程串联专项总览', label: '知识与带教 · 手册与流程串联专项总览' },
            { src: '/assets/career-proof/gallery/system-manual/02-manual-navigation-1617e3e321.webp', alt: '13 套系统手册的可点击导航表及分类归档目录', label: '知识与带教 · 13 套系统手册导航与归档' },
            { src: '/assets/career-proof/gallery/system-manual/03-system-flows-68e4c1735b.webp', alt: '财务系统架构、单据关系与业务流转图的页面总览', label: '知识与带教 · 财务系统与单据流转图' },
          ],
        },
      },
      {
        id: 'receipt-automation', label: '数据与 AI', eyebrow: '04 / DATA & AI AUTOMATION',
        title: '把重复整理交给数据与 AI',
        summary: '用 SQL 与 Excel 优化月度统计，沉淀自动化方案；用 Python 与大模型提取 300+ 份银行回单，输出标准表格。',
        proof: ['月度统计耗时降低约 40%', '处理 300+ 份 PDF 回单', 'SQL · Excel · Python + LLM'],
        media: {
          kind: 'gallery',
          label: '数据与 AI · 5 张工作记录',
          items: [
            { src: '/assets/career-proof/gallery/receipt-automation/01-reporting-efficiency-a208f7e980.webp', alt: '集团例行统计的指标分类、SQL 与表格成果及效率改进说明', label: '数据与 AI · 集团例行统计与效率改进' },
            { src: '/assets/career-proof/gallery/receipt-automation/02-reporting-sql-9d6d991182.webp', alt: '例行统计指标对应的查询 SQL、计算口径和备注', label: '数据与 AI · 统计 SQL 与计算口径' },
            { src: '/assets/career-proof/gallery/receipt-automation/03-automation-opportunities-b8c1074a0d.webp', alt: '自动化与 RPA 已替代工作及后续应用机会说明', label: '数据与 AI · 重复工作的自动化机会' },
            { src: '/assets/career-proof/gallery/receipt-automation/04-structured-matrix-a0fe7a207d.webp', alt: '基于部门、岗位及工作流分类的系统结构化矩阵方案', label: '数据与 AI · 系统结构化矩阵方案' },
            { src: '/assets/career-proof/gallery/receipt-automation/05-approval-node-plugin-ef5a975a34.webp', alt: '通过部门编码与领导职务匹配审批节点人员的插件演示', label: '数据与 AI · 审批节点自动匹配插件' },
          ],
        },
      },
    ],
    skills: ['问题诊断', '机制治理', '知识与自动化'],
    image: '/assets/cartoon-clay-v2/career-evidence/03-application-support.webp', alt: '应用支持处理系统问题并沉淀手册的场景插画',
  },
  {
    id: 'vibe-coding', level: 'LV.04', role: 'FDE 方案实践', tabLabel: 'FDE 实践', type: '现在进行时', period: '2026—NOW', altitude: '独立交付',
    company: '企业交付经验 × AI 实践', location: '深圳 · 全职求职 / 接受异地与驻场',
    quest: '把企业经验，延伸到 AI 实践', metric: '理解业务、持续学习，把想法推进到可用。',
    summary: '把企业实施与应用支持经验带入 AI 实践：通过课程学习拓展能力，在比赛中练习独立交付与团队协作，为真实使用者构建工具并持续改进。',
    evidence: [
      { value: '2 项', label: 'FDE 课程学习 · 均已结课' },
      { value: '多次获奖', label: '黑客松 · 独立与协作实践' },
      { value: '已交付', label: '真实用户工具 · 按反馈迭代' },
    ],
    stories: [
      {
        id: 'fde-course', label: '主动学习', eyebrow: '01 / CONTINUOUS LEARNING',
        title: '带着业务经验，学习 AI 交付',
        summary: '完成观猹 FDE 共学营与 OpenBuild 实战公开课，结合业务经验练习方案构建与验证，把需求理解延伸到产品实现。',
        proof: ['观猹 FDE 共学营 · 完成课程与实践', 'OpenBuild · 第 1—8 期全部完课'],
        media: {
          kind: 'gallery',
          label: '主动学习 · 2 份结课证书',
          items: [
            { src: '/assets/career-proof/gallery/fde-course/01-fde-certificate.webp', alt: '谢子涵的观猹 FDE 共学营结课证书，2026 年 7 月', label: '观猹 FDE 共学营 · 结课证书' },
            { src: '/assets/career-proof/gallery/fde-course/02-openbuild-fde-certificate.webp', alt: '谢子涵的 OpenBuild FDE 实战公开课完课证书，完成第 1—8 期全部课程，2026 年 9 月 16 日颁发', label: 'OpenBuild FDE 实战公开课 · 完课证书' },
          ],
        },
      },
      {
        id: 'hackathon-build', label: '赛场实践', eyebrow: '02 / BUILD UNDER CONSTRAINTS',
        title: '抓住核心需求，快速交付产品',
        summary: '快速识别需求、确定核心功能，用 AI 辅助开发完成可演示的产品；既能独立推进，也能与队友协作，在有限时间内做出取舍，并通过路演讲清产品价值。',
        proof: ['家里话 · BAYTECH 赛道冠军', 'Final Human · 黑客松双奖作品', '抖音 AI 创变者计划 · 三等奖'],
        media: {
          kind: 'gallery',
          label: '赛场实践 · 3 场比赛的获奖记录',
          items: [
            { src: '/assets/career-proof/gallery/hackathon-awards/01-baytech-champion.webp', alt: '谢子涵在 BAYTECH 2026 现场手持 AI 应用与工程赛道冠军奖牌', label: 'BAYTECH · AI 应用与工程赛道冠军' },
            { src: '/assets/career-proof/gallery/hackathon-awards/03-final-human-dual-awards.webp', alt: '特种兵黑客松游戏开发赛道亚军与跨赛道一发入魂奖的奖牌及证书', label: 'Final Human · 亚军与一发入魂奖' },
            { src: '/assets/career-proof/gallery/hackathon-build/02-hackathon-photo.webp', alt: '谢子涵与队友在抖音 AI 创变者计划 2026 三等奖奖牌前合影', label: '抖音 AI 创变者计划 · 三等奖现场' },
          ],
        },
      },
      {
        id: 'real-user-products', label: '真实交付', eyebrow: '03 / REAL USER DELIVERY',
        title: '把个性化需求，做成提效工具',
        summary: '已为多位用户定制并上线软件，帮助提升工作与学习效率；从需求梳理、功能取舍到开发测试独立推进，再根据真实使用反馈持续改进。',
        proof: ['跨境经营舱 · 真实文件导入与报表验证', '课时簿 · 教师私人 iPhone 版已交付', '英语搭子团 · 多位投资者看好，已有真实用户测试使用'],
        media: {
          kind: 'gallery',
          label: '真实交付 · 3 张使用与反馈记录',
          items: [
            { src: '/assets/career-proof/gallery/real-user-products/20261009/01-app-usage.jpg', alt: '定制软件测试后台的使用记录截图，展示 App 使用次数 323 次与 20 次', label: '定制工具 · 用户使用记录' },
            { src: '/assets/career-proof/gallery/real-user-products/20261009/02-teacher-feedback.jpg', alt: '杨老师对课时簿的使用反馈及课程收款功能建议', label: '课时簿 · 用户反馈与迭代' },
            { src: '/assets/career-proof/gallery/real-user-products/20261009/03-demo-connections.jpg', alt: '英语搭子团路演后的联系人添加记录，部分头像和姓名已在原图中打码', label: '英语搭子团 · 路演交流记录' },
          ],
        },
      },
    ],
    skills: ['业务理解', '快速学习', '协作交付'],
    awards: ['BAYTECH国际湾区科创节黑客松冠军', '深圳爱拼特种兵黑客松双奖'],
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
    ...lifeStoryCopy.hiking,
    originX: -350, originY: 220,
    media: lifeMediaByInterest.hiking,
  },
  {
    id: 'creator', index: '04', title: '内容创作', english: 'CREATIVE SIGNALS',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/02-content-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/02-content-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/02-content-bloom.webp',
    width: 1254, height: 1254,
    ...lifeStoryCopy.creator,
    originX: 240, originY: 300,
    media: lifeMediaByInterest.creator,
  },
  {
    id: 'think-build', index: '02', title: '思辨与共创', english: 'THINK & BUILD',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/03-thinking-cocreation-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/03-thinking-cocreation-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/03-thinking-cocreation-bloom.webp',
    width: 1254, height: 1254,
    ...lifeStoryCopy['think-build'],
    originX: -240, originY: 300,
    media: lifeMediaByInterest['think-build'],
  },
  {
    id: 'journey', index: '03', title: '镜头与远行', english: 'LENS & JOURNEY',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/04-camera-travel-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/04-camera-travel-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/04-camera-travel-bloom.webp',
    width: 1254, height: 1254,
    ...lifeStoryCopy.journey,
    originX: 0, originY: 320,
    media: lifeMediaByInterest.journey,
  },
  {
    id: 'practice', index: '05', title: '长期练习', english: 'DAILY PRACTICE',
    titleImage: '/assets/cartoon-clay-v2/life-garden-v1/titles/05-long-practice-title.webp',
    budImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/05-long-practice-bud.webp',
    bloomImage: '/assets/cartoon-clay-v2/life-garden-v1/flowers/05-long-practice-bloom.webp',
    width: 1254, height: 1254,
    ...lifeStoryCopy.practice,
    originX: 350, originY: 220,
    media: lifeMediaByInterest.practice,
  },
] as const;

const lifeInterestLayout = [
  { interest: lifeInterests[0], positionClass: 'life-interest-1' },
  { interest: lifeInterests[2], positionClass: 'life-interest-2' },
  { interest: lifeInterests[3], positionClass: 'life-interest-3' },
  { interest: lifeInterests[1], positionClass: 'life-interest-4' },
  { interest: lifeInterests[4], positionClass: 'life-interest-5' },
] as const;

type EducationTopicId = (typeof educationTopics)[number]['id'];
type EducationSchoolId = (typeof educationSchools)[number]['id'];
type LifeInterestId = (typeof lifeInterests)[number]['id'];
type CareerStageId = (typeof careerStages)[number]['id'];
type ContactEntryId = (typeof contactEntries)[number]['id'];
type LifePortraitPhase = 'idle' | 'revealing' | 'revealed' | 'returning';

const LIFE_PORTRAIT_HOLD_MS = 400;
const LIFE_PORTRAIT_VISIBLE_MS = 4000;
const LIFE_PORTRAIT_REVEAL_MS = 520;
const LIFE_PORTRAIT_RETURN_MS = 420;

type ChapterNameplateProps = {
  item: (typeof navItems)[number];
  variant: 'work' | 'career' | 'education' | 'life' | 'contact';
};

function ChapterNameplate({ item, variant }: ChapterNameplateProps) {
  return (
    <div className={`chapter-nameplate chapter-nameplate-${variant}`} aria-hidden="true">
      <Image
        src={item.image}
        width={item.width}
        height={item.height}
        alt=""
        sizes={variant === 'contact' ? '(max-width: 800px) 78vw, 520px' : '(max-width: 800px) 76vw, 540px'}
        loading="lazy"
        unoptimized
      />
    </div>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const lifePortraitHoldTimersRef = useRef<Record<string, number>>({});
  const lifePortraitReturnTimersRef = useRef<Record<string, number>>({});
  const lifePortraitInstantTimerRef = useRef<number | null>(null);
  const lifePortraitPhaseTimerRef = useRef<number | null>(null);
  const contactCopyTimerRef = useRef<number | null>(null);
  const contactAnimateRef = useRef(true);
  const [activeCareer, setActiveCareer] = useState<CareerStageId>('delivery-management');
  const [activeCareerStories, setActiveCareerStories] = useState<Record<CareerStageId, string>>({
    'delivery-management': 'training-tour',
    'implementation-consultant': 'master-data',
    'application-support': 'operations-delivery',
    'vibe-coding': 'fde-course',
  });
  const [activeCareerMediaIndexes, setActiveCareerMediaIndexes] = useState<Record<string, number>>({});
  const [careerLightboxImage, setCareerLightboxImage] = useState<CareerLightboxImage | null>(null);
  const [shiftedCareerPersona, setShiftedCareerPersona] = useState<string | null>(null);
  const [activeEducation, setActiveEducation] = useState<EducationTopicId | null>(null);
  const [activeEducationSchool, setActiveEducationSchool] = useState<EducationSchoolId | null>(null);
  const [activeEducationMediaIndexes, setActiveEducationMediaIndexes] = useState<Record<string, number>>({});
  const [activeLife, setActiveLife] = useState<LifeInterestId | null>(null);
  const [lifeFullImage, setLifeFullImage] = useState<LifeFullImage | null>(null);
  const [holdingLifePortrait, setHoldingLifePortrait] = useState<string | null>(null);
  const [instantLifePortrait, setInstantLifePortrait] = useState<string | null>(null);
  const [revealedLifePortraits, setRevealedLifePortraits] = useState<Record<string, boolean>>({});
  const [lifePortraitPhase, setLifePortraitPhase] = useState<LifePortraitPhase>('idle');
  const [activeContact, setActiveContact] = useState<ContactEntryId | null>(null);
  const [copiedContact, setCopiedContact] = useState<ContactEntryId | null>(null);
  const downloadOpen = activeContact === 'resume';
  useEffect(() => () => {
    Object.values(lifePortraitHoldTimersRef.current).forEach((timer) => window.clearTimeout(timer));
    Object.values(lifePortraitReturnTimersRef.current).forEach((timer) => window.clearTimeout(timer));
    if (lifePortraitInstantTimerRef.current !== null) window.clearTimeout(lifePortraitInstantTimerRef.current);
    if (lifePortraitPhaseTimerRef.current !== null) window.clearTimeout(lifePortraitPhaseTimerRef.current);
    if (contactCopyTimerRef.current !== null) window.clearTimeout(contactCopyTimerRef.current);
  }, []);

  useEffect(() => {
    const refreshFrame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(refreshFrame);
  }, [activeLife, activeEducation, activeEducationSchool, activeCareer, activeContact]);

  useEffect(() => {
    const career = pageRef.current?.querySelector<HTMLElement>('#career');
    if (!career) return;

    // Reset only on entry, so browsing within the career section keeps the selection.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        setActiveCareer('delivery-management');
        setShiftedCareerPersona(null);
      }
    }, { threshold: 0, rootMargin: '-1px 0px -1px 0px' });

    observer.observe(career);
    return () => observer.disconnect();
  }, []);

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
    const media = gsap.matchMedia();
    media.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
      const chapters = gsap.utils.toArray<HTMLElement>(
        '.work-canvas-v2, .career-canvas-v2, .education-canvas, .life-canvas-v2, .contact-canvas-v2',
      );

      chapters.forEach((chapter) => {
        const content = Array.from(chapter.children).filter((child): child is HTMLElement => (
          child instanceof HTMLElement
          && !child.matches('.life-ambient-light, .life-light-scrim, .chapter-nameplate')
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
    });
    return () => media.revert();
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
    const reduce = !contactAnimateRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 800px)').matches;
    const nodes = gsap.utils.toArray<HTMLElement>('.contact-entry-button');

    nodes.forEach((node, index) => {
      const sprite = node.querySelector<HTMLElement>('.contact-entry-sprite');
      if (!sprite) return;
      const isActive = index === selectedIndex;
      gsap.to(sprite, {
        x: reduce || compact || selectedIndex < 0 ? 0 : isActive ? 0 : index < selectedIndex ? -16 : 16,
        y: reduce || compact || selectedIndex < 0 ? 0 : isActive ? -8 : index % 2 === 0 ? -10 : 10,
        scale: selectedIndex < 0 ? 1 : isActive ? 1.08 : compact ? 0.88 : 0.66,
        opacity: selectedIndex < 0 || isActive ? 1 : 0.52,
        rotation: reduce || selectedIndex < 0 ? 0 : isActive ? 0 : index % 2 === 0 ? -2 : 2,
        duration: reduce ? 0 : 0.28,
        ease: isActive ? 'back.out(1.4)' : 'power3.out',
        overwrite: 'auto',
      });
    });

    const detail = pageRef.current?.querySelector<HTMLElement>('.contact-focus-detail');
    if (detail && selectedIndex >= 0) {
      gsap.fromTo(
        detail.children,
        { autoAlpha: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: reduce ? 0 : 0.28, stagger: reduce ? 0 : 0.05, ease: 'power3.out' },
      );
    }

    const resumeOptions = gsap.utils.toArray<HTMLElement>('.resume-download-option');
    if (resumeOptions.length && activeContact === 'resume') {
      gsap.fromTo(
        resumeOptions,
        { autoAlpha: 0, y: reduce ? 0 : 18, scale: reduce ? 1 : 0.93 },
        { autoAlpha: 1, y: 0, scale: 1, duration: reduce ? 0 : 0.28, stagger: reduce ? 0 : 0.05, ease: 'back.out(1.4)' },
      );
    }
  }, { dependencies: [activeContact], scope: pageRef, revertOnUpdate: true });

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

  const activateContact = (id: ContactEntryId, shouldAnimate: boolean) => {
    contactAnimateRef.current = shouldAnimate;
    setActiveContact((current) => current === id ? null : id);
    setCopiedContact(null);
    if (contactCopyTimerRef.current !== null) {
      window.clearTimeout(contactCopyTimerRef.current);
      contactCopyTimerRef.current = null;
    }
  };

  const copyContactValue = async (id: ContactEntryId, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedContact(id);
      playUISound('success');
      if (contactCopyTimerRef.current !== null) window.clearTimeout(contactCopyTimerRef.current);
      contactCopyTimerRef.current = window.setTimeout(() => setCopiedContact(null), 1800);
    } catch {
      setCopiedContact(null);
    }
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
      }, LIFE_PORTRAIT_REVEAL_MS);
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
        }, LIFE_PORTRAIT_RETURN_MS);
      }
      delete lifePortraitReturnTimersRef.current[groupKey];
    }, LIFE_PORTRAIT_VISIBLE_MS + (instant ? 0 : LIFE_PORTRAIT_REVEAL_MS));
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
    }, LIFE_PORTRAIT_HOLD_MS);
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
    }, LIFE_PORTRAIT_VISIBLE_MS + LIFE_PORTRAIT_RETURN_MS);
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
    setLifeFullImage(null);
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
  const selectedLifeMedia: readonly LifeMedia[] = selectedLife ? [...selectedLife.media, ...lifeThemeMedia[selectedLife.id]] : [];
  const selectedLifeHasPortraits = selectedLifeMedia.some((media) => media.kind === 'portrait');
  const selectedLifeShowsHoldHint = selectedLife !== null && ['hiking', 'think-build', 'journey'].includes(selectedLife.id);
  const selectedLifeCopy = selectedLife ? lifeStoryCopy[selectedLife.id] : null;

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
    <main ref={pageRef}>
      <FdeTriptychIntro />
      <SensoryLayer />
      <LiquidCursor />
      <section className="story" id="top">
        <nav className="mobile-entry-nav" aria-label="快速浏览作品集">
          <a href="#work">查看作品 <span aria-hidden="true">↗</span></a>
          <a href="#contact">联系与简历 <span aria-hidden="true">↓</span></a>
        </nav>
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
            <div className="bio-copy bio-content-v2">
              <div className="line-mask"><h2>欢迎</h2></div>
              <div className="line-mask"><h2 className="accent-type">了解我。</h2></div>
              <div className="line-mask bio-paragraph-mask"><p>我拥有 2 年+企业软件项目经历，曾在金蝶参与两个千万级央国企财务数字化项目，覆盖实施、数据治理与运维。现在，我把企业交付中积累的经验用在 AI 产品上，从真实需求出发，做能解决具体问题的产品。</p></div>
            </div>
            <div className="bio-facts bio-content-v2">
              <div className="fact"><strong>12</strong><small>个</small><span>公开作品</span></div>
              <div className="fact"><strong>4</strong><small>次</small><span>黑客松获奖</span></div>
              <ul className="bio-awards" aria-label="代表性黑客松奖项">
                <li><span>BAYTECH 国际湾区科创节黑客松</span><strong>冠军</strong></li>
                <li><span>深圳爱拼特种兵黑客松</span><strong>亚军</strong></li>
              </ul>
            </div>
            <div className="scene-progress bio-progress bio-content-v2"><span>02 / 03</span><i /><span>SCROLL FOR MENU</span></div>
          </div>
          <div className="scene nav-scene">
            <header className={navigationStyles.intro}>
              <p className={navigationStyles.eyebrow}>认识我 · 五个入口</p>
              <h2 className={navigationStyles.title} id="navigation-title">
                <span>你想先了解<wbr /><em>哪一面的我？</em></span>
                <span>选一个你感兴趣的地方。</span>
              </h2>
            </header>
            <nav className="clay-nav-canvas" aria-labelledby="navigation-title">
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
            <div className="nav-footer"><span id="preview-note">建议从「AI辅助构建」开始，查看作品案例、在线 Demo 与源代码。</span><span>© 2026</span></div>
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

      <WorkShowcase />

      <section className="career-canvas-v2" id="career" aria-labelledby="career-title">
        <header className="career-heading-v2">
          <span>02 / CAREER LEVELS</span>
          <p>金蝶软件 2023—2026<br />FDE 方案实践 NOW</p>
        </header>
        <ChapterNameplate item={navItems[1]} variant="career" />

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
                <div className="career-skill-list" aria-label="该阶段的能力与荣誉">
                  {selectedCareer.skills.map((item) => <small key={item}>{item}</small>)}
                  {'credential' in selectedCareer && selectedCareer.credential ? (
                    <span className="career-stage-credential"><b>PMP</b>{selectedCareer.credential}</span>
                  ) : null}
                  {'awards' in selectedCareer ? (
                    <span className="career-stage-awards" role="group" aria-label="黑客松获奖">
                      {selectedCareer.awards.map((award) => <span className="career-stage-credential career-stage-award" key={award}>{award}</span>)}
                    </span>
                  ) : null}
                </div>
                {'honor' in selectedCareer && selectedCareer.honor ? (
                  <span className="career-stage-credential career-stage-honor"><b>HONOR</b>{selectedCareer.honor}</span>
                ) : null}
              </div>

              <aside className="career-mission-browser" aria-label={`${selectedCareer.role}代表任务`}>
                <div className="career-mission-head">
                  <span>{selectedCareer.id === 'vibe-coding' ? 'FDE READINESS' : 'REPRESENTATIVE MISSIONS'}</span>
                  <p>{selectedCareer.id === 'vibe-coding' ? '主动学习 · 赛场实践 · 真实交付' : `${selectedCareer.stories.length} 条可切换经历`}</p>
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
                  className={`career-mission-detail ${selectedCareer.id === 'vibe-coding' ? 'is-fde-readiness' : ''}`}
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
                  <div className="career-mission-media-group">
                    <figure className={`career-mission-media ${selectedCareerGallery ? 'is-gallery' : selectedCareer.id === 'vibe-coding' && selectedCareerStory.id !== 'fde-course' ? 'is-illustration' : 'is-proof'}`}>
                      {selectedCareerGallery && selectedCareerGalleryItem ? (
                        <>
                          <button
                            type="button"
                            className="career-media-switcher"
                            onClick={() => advanceCareerMedia(selectedCareerStory.id, selectedCareerGallery.items.length)}
                            aria-label={selectedCareerGallery.items.length > 1
                              ? `切换到下一张${selectedCareerStory.label}图片；当前第 ${selectedCareerMediaIndex + 1} 张，共 ${selectedCareerGallery.items.length} 张`
                              : `${selectedCareerStory.label}图片，共 1 张`}
                          >
                            <Image key={selectedCareerGalleryItem.src} src={selectedCareerGalleryItem.src} alt={selectedCareerGalleryItem.alt} fill sizes="(max-width: 800px) 100vw, 300px" style={{ objectFit: 'cover' }} loading="lazy" unoptimized />
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
                    {selectedCareerGalleryItem && (
                      <button
                        type="button"
                        className="career-media-expand"
                        aria-label={`查看大图：${selectedCareerGalleryItem.label}`}
                        aria-haspopup="dialog"
                        onClick={() => setCareerLightboxImage(selectedCareerGalleryItem)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
                        </svg>
                        查看大图
                      </button>
                    )}
                  </div>
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
                        <span className="career-stage-index">Lv.{String(index + 1).padStart(2, '0')}</span>
                        <span className="career-stage-label"><strong>{stage.tabLabel}</strong><i>{stage.altitude}</i></span>
                        <span className="career-stage-selected" aria-hidden="true">正在展示</span>
                      </button>
                      <span className="career-step-period" aria-hidden="true">{stage.period}</span>
                    </div>
                  );
                })}
              </div>
              <div className="career-quest-title">
                <h2 id="career-title"><b>打怪</b><em>升级</em><b>之路</b></h2>
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
        </header>
        {!selectedEducation && !selectedEducationSchool && <ChapterNameplate item={navItems[2]} variant="education" />}
        <div
          className={`education-stage education-stage-v2 ${selectedEducation || selectedEducationSchool ? 'has-focus' : ''} ${selectedEducationSchool ? 'has-school-focus' : ''} ${selectedEducation || activeEducationSchool === 'university' ? 'has-university-paths-open' : ''}`}
          data-education-focus={activeEducation ?? activeEducationSchool ?? 'none'}
        >
          <div className="education-campus-field" aria-hidden="true" />
          {!selectedEducation && !selectedEducationSchool && (
            <div className="education-explore-guide" role="note" aria-label="教育经历浏览提示">
              <h3>{educationPage.exploreTitle}</h3>
              <p>{educationPage.exploreHint}</p>
            </div>
          )}
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
              {selectedEducationSchool.character && (
                <figure className={`education-school-story-character education-school-story-character-${selectedEducationSchool.id}`}>
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
      </section>

      <section className={`life-canvas-v2 life-curated ${selectedLife ? 'is-illuminated' : 'is-dormant'}`} id="life" aria-labelledby="life-title" data-life-scene={selectedLife?.id}>
        <span className="life-ambient-light" aria-hidden="true" />
        <span className="life-light-scrim" aria-hidden="true" />
        <div className="life-vine-frame" aria-hidden="true">
          <Image className="life-vine-image" src="/assets/cartoon-clay-v2/life-garden-v1/frame/00-vine-frame-open-v3.png" width={1920} height={1080} alt="" loading="lazy" unoptimized />
        </div>

        <header className="life-heading-v2">
          <span>04 / LIFE &amp; INTERESTS</span>
          <h2 className="sr-only" id="life-title">生活与兴趣</h2>
        </header>
        {!selectedLife && <ChapterNameplate item={navItems[3]} variant="life" />}

        <div className={`life-stage-v2 ${selectedLife ? 'has-memory' : ''}`}>
          {!selectedLife && (
            <div className="life-idle-copy">
              <p>五朵花，记录我的生活。</p>
              <p>选一朵，展开这段记忆。</p>
            </div>
          )}
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
                    {interest.id !== 'hiking' && interest.id !== 'practice' && (
                      <span className="life-flower-index-art" aria-hidden="true">{interest.index}</span>
                    )}
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
                  <p>{selectedLifeCopy?.note}</p>
                  <div className="life-keyword-cloud" aria-label={`${selectedLife.title}关键词`}>
                    {selectedLifeCopy?.tags.map((tag) => <small key={tag}>{tag}</small>)}
                  </div>
                </div>
                {selectedLife.id === 'creator' && (
                  <div className="life-creator-story" aria-label="两个出于兴趣的内容账号">
                    <div className="life-creator-chapter life-creator-earlier">
                      <h4><span className="life-creator-year">2023</span>AI 翻唱</h4>
                      <p>从懒羊羊 AI 翻唱开始，<br />在音乐、封面和剪辑里练习表达。</p>
                    </div>
                    <div className="life-creator-chapter life-creator-now">
                      <h4><span className="life-creator-year">2026</span>Agent 自动化</h4>
                      <p>用 Codex 串起 MBTI 内容创作，<br />选题、作图、视频、文案已自动化。</p>
                    </div>
                    <p className="life-creator-footnote"><strong>出于兴趣，持续输出</strong><span>Agent 跑流程，我把握审美、检查成品，<br />再根据受众反馈迭代。</span></p>
                  </div>
                )}
                <div
                  className="life-memory-gallery"
                  data-interest={selectedLife.id}
                  data-portrait-phase={lifePortraitPhase}
                  data-portrait-instant={instantLifePortrait === null ? 'false' : 'true'}
                  aria-label={`${selectedLife.title}的 ${selectedLifeMedia.length} 项视觉记忆${selectedLifeHasPortraits ? '，长按人像可查看真实照片' : ''}`}
                >
                  {selectedLifeMedia.map((media, index) => {
                    const portraitKey = `${selectedLife.id}-${index}`;
                    const isPortrait = media.kind === 'portrait';
                    const isHolding = isPortrait && holdingLifePortrait === portraitKey;
                    const isRevealed = isPortrait && Boolean(revealedLifePortraits[selectedLife.id]);
                    const isInstant = isPortrait && instantLifePortrait !== null;
                    return (
                      <span className={`life-collage-item is-${media.kind}`} key={media.src} data-media-id={media.id ?? media.src.split('/').pop()} data-topic={media.topic} style={lifeMediaPlacement(selectedLife.id, media, index)}>
                        <span className="life-memory-visual">
                          {media.kind === 'portrait' ? (
                            <button
                              type="button"
                              className={`life-portrait-reveal ${isHolding ? 'is-holding' : ''} ${isRevealed ? 'is-revealed' : ''} ${isInstant ? 'is-instant' : ''}`}
                              aria-label={isRevealed ? `正在显示${selectedLife.title}全组真实照片` : `长按 ${LIFE_PORTRAIT_HOLD_MS / 1000} 秒，同步查看${selectedLife.title}全组真实照片：${media.alt}`}
                              aria-pressed={isRevealed}
                              data-cursor-label={isRevealed ? '真实瞬间' : selectedLifeShowsHoldHint ? '长按查看真实瞬间' : undefined}
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
                          ) : media.kind === 'evidence' ? (
                            <button type="button" className="life-evidence-button" aria-label={`查看完整原图：${media.label}`} aria-haspopup="dialog" data-cursor-label="查看原图" onClick={() => setLifeFullImage({ src: media.originalSrc ?? media.src, alt: media.alt, label: media.label, width: media.width, height: media.height })}>
                              <Image className="life-evidence-image" src={media.src} alt={media.alt} width={media.width ?? 1000} height={media.height ?? 1000} loading="lazy" draggable={false} unoptimized />
                            </button>
                          ) : (
                            <Image className="life-decoration-image" src={media.src} alt={media.alt} width={media.width ?? 1024} height={media.height ?? 1024} loading="lazy" draggable={false} unoptimized />
                          )}
                        </span>
                        {media.kind === 'evidence' && <small className="sr-only">{media.label}</small>}
                      </span>
                    );
                  })}
                </div>
              </article>
            )}
          </div>
        </div>

        {selectedLife && selectedLifeShowsHoldHint && selectedLifeHasPortraits && (
          <p className="life-hint-v2" role="status" key={selectedLife.id}>
            <span>长按小人，查看真实瞬间</span>
          </p>
        )}
      </section>
      <LifeImageViewer image={lifeFullImage} onClose={() => setLifeFullImage(null)} />

      <section className="contact-canvas-v2" id="contact" aria-labelledby="contact-title">
        <header className="contact-heading-v2">
          <span>05 / CONTACT</span>
          <div className="contact-heading-main">
            <ChapterNameplate item={navItems[4]} variant="contact" />
            <h2 id="contact-title">寻找 FDE 机会，<em>欢迎直接联系。</em></h2>
          </div>
          <p>目前在深圳，接受异地、出差与驻场，欢迎邮件联系。</p>
        </header>

        <div className={`contact-stage-v2 ${selectedContact || downloadOpen ? 'has-contact-focus' : ''}`}>
          <div className="contact-entry-list" role="group" aria-label="联系 Violet 的方式">
            {contactEntries.map((entry, index) => (
              <button
                type="button"
                aria-pressed={activeContact === entry.id}
                aria-expanded={activeContact === entry.id}
                aria-controls="contact-focus-stage"
                className={`contact-entry-button contact-entry-${index + 1}`}
                key={entry.id}
                onClick={(event) => activateContact(entry.id, event.detail > 0)}
                data-cursor-label={activeContact === entry.id ? '再次点击 · 收起' : `点击查看 · ${entry.label}`}
              >
                <span className="contact-entry-sprite"><Image src={entry.image} width={entry.width} height={entry.height} alt="" aria-hidden="true" loading="lazy" unoptimized /></span>
                <span className="sr-only">{entry.index} · {entry.label} · {entry.english}</span>
              </button>
            ))}
          </div>

          <div className="contact-focus-stage" id="contact-focus-stage" aria-live="polite">
            {downloadOpen ? (
              <div className="contact-inline-downloads" role="group" aria-label="简历下载选项">
                {downloads.map((item) => (
                  <a
                    className="resume-download-option"
                    href={item.href}
                    download={item.filename}
                    aria-label={`下载${item.name}，${item.meta}`}
                    key={item.name}
                  >
                    <Image src={item.image} width={2172} height={724} alt="" aria-hidden="true" loading="lazy" unoptimized />
                    <span><strong>{item.name}</strong><small>{item.meta}</small></span>
                    <i>下载 PDF</i>
                  </a>
                ))}
              </div>
            ) : selectedContact ? (
              <article className="contact-focus-detail" role="region" aria-label={selectedContact.label} key={selectedContact.id}>
                <span>{selectedContact.index} / {selectedContact.english}</span>
                <h3>{selectedContact.value}</h3>
                <p>{selectedContact.note}</p>
                {selectedContact.id === 'github' && selectedContact.href ? (
                  <a href={selectedContact.href} target={selectedContact.id === 'github' ? '_blank' : undefined} rel={selectedContact.id === 'github' ? 'noreferrer' : undefined}>
                    打开 GitHub <i aria-hidden="true">↗</i>
                  </a>
                ) : (
                  <button type="button" onClick={() => copyContactValue(selectedContact.id, selectedContact.value)} aria-live="polite">
                    {selectedContact.id === 'email'
                      ? (copiedContact === 'email' ? '已复制邮箱' : '复制邮箱')
                      : (copiedContact === 'wechat' ? '已复制微信号' : '复制微信号')} <i aria-hidden="true">↗</i>
                  </button>
                )}
              </article>
            ) : (
              <div className="contact-focus-idle"><span aria-hidden="true">+</span><strong>点击四周按钮<br />选择联系方式</strong></div>
            )}
          </div>
        </div>

        <p className="contact-hint-v2">邮箱、微信与 GitHub 可直接联系；点击简历下载即可选择材料。</p>
      </section>
      <CareerImageLightbox image={careerLightboxImage} onClose={() => setCareerLightboxImage(null)} />
    </main>
  );
}
