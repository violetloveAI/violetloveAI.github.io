'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workProjects } from '../content/work-showcase';
import { LiquidCursor } from './LiquidCursor';
import { SensoryLayer } from './SensoryLayer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = [
  { index: '01', label: 'Vibe Coding 作品', english: 'WORKS', href: '#work', image: '/assets/cartoon-clay-v2/01-navigation/01-vibe-coding-works.webp', width: 2043, height: 770 },
  { index: '02', label: '工作 · 打怪升级', english: 'CAREER', href: '#career', image: '/assets/cartoon-clay-v2/01-navigation/02-career.webp', width: 1672, height: 941 },
  { index: '03', label: '教育经历', english: 'EDUCATION', href: '#education', image: '/assets/cartoon-clay-v2/01-navigation/03-education.webp', width: 1672, height: 941 },
  { index: '04', label: '生活与兴趣', english: 'LIFE', href: '#life', image: '/assets/cartoon-clay-v2/01-navigation/04-life-interests.webp', width: 1672, height: 941 },
  { index: '05', label: '联系我', english: 'CONTACT', href: '#contact', image: '/assets/cartoon-clay-v2/01-navigation/05-contact.webp', width: 1672, height: 941 },
] as const;

const contactEntries = [
  { id: 'email', index: '01', label: '邮箱', english: 'EMAIL', image: '/assets/cartoon-clay-v2/06-contact/01-email.webp', width: 1774, height: 887, value: '982928723@qq.com', note: '如果你想聊 FDE、企业 AI 场景或产品原型，邮件会是最稳妥的入口。', href: 'mailto:982928723@qq.com' },
  { id: 'wechat', index: '02', label: '微信', english: 'WECHAT', image: '/assets/cartoon-clay-v2/06-contact/02-wechat.webp', width: 1942, height: 809, value: '待补充', note: '微信信息仍在整理；正式确认后会直接在这里开放。', href: null },
  { id: 'github', index: '03', label: 'GitHub', english: 'GITHUB', image: '/assets/cartoon-clay-v2/06-contact/03-github.webp', width: 2043, height: 770, value: 'violetloveai', note: '查看持续迭代中的项目、代码与实验记录。', href: 'https://github.com/violetloveai' },
  { id: 'resume', index: '04', label: '简历', english: 'RESUME', image: '/assets/cartoon-clay-v2/06-contact/04-resume-download.webp', width: 2172, height: 724, value: '按需了解 Violet', note: '一页中文简历、完整求职简历和 FDE 项目作品集正在准备。', href: null },
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
    proof: ['累计数千人次在线观看', '承担主持、宣传、录制与复盘', '在讲师、学员与交付团队间协同'],
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
    proof: ['SQL 提取 EAS 与星瀚数据', '制定清洗规则并推进迁移验证', '维护跨模块问题、责任人与进度'],
    skills: ['数据治理', 'SQL · Python', '上线切换'],
    image: '/assets/cartoon-clay-v2/career-evidence/02-implementation-consultant.webp', alt: '实施顾问进行系统配置和数据治理的场景插画',
  },
  {
    id: 'application-support', level: 'LV.03', role: '应用支持', tabLabel: '应用支持', type: '全职', period: '2024.08—2026.01', altitude: '解决问题',
    company: '企业软件团队 · 大型集团综合业务项目', location: '深圳 · 项目现场',
    quest: '从解决单点问题，到对结果负责', metric: '不只关单，把反复出现的问题变成机制。',
    summary: '长期服务港口、金控两大业务板块后，我学会把一句“系统有问题”拆成业务、权限、配置、数据或产品问题，再带着证据协调多方闭环。高频一线问题，也开始被我沉淀成专项治理与长期可复用的知识。',
    evidence: [
      { value: '数千张', label: '持续检查业务单据' },
      { value: '显著下降', label: '月均审批问题' },
      { value: '多套', label: '系统可点击总手册' },
    ],
    proof: ['持续沉淀日报、风险记录与复盘', '提出动态审批优化方案', '覆盖财务共享、总账、报销、发票与主数据'],
    skills: ['问题诊断', '方案推动', '客户沟通'],
    image: '/assets/cartoon-clay-v2/career-evidence/03-application-support.webp', alt: '应用支持处理系统问题并沉淀手册的场景插画',
  },
  {
    id: 'vibe-coding', level: 'LV.04', role: 'AI 解决方案实践', tabLabel: 'Vibe Coding', type: '现在进行时', period: '2026—NOW', altitude: '创造方案',
    company: '个人项目 · FDE 转型实践', location: '深圳 · 需求验证 / 企业 POC / 黑客松',
    quest: '从交付系统，到亲自定义解决方案', metric: '把现场问题，做成能演示、能测试、能迭代的产品。',
    summary: '现在，我把 Agent、AI Coding、SQL、Python 与自动化工具放进真实业务场景。我的角色不是假装传统全栈开发者，而是理解用户、定义问题与范围，借助 Coding Agent 快速构建，并对测试、验收和最终体验负责。',
    evidence: [
      { value: '持续迭代', label: '用户场景产品' },
      { value: 'POC', label: '企业 AI 场景' },
      { value: '双奖', label: '黑客松作品' },
    ],
    proof: ['Commerce OS 与课时簿：从访谈到真实使用', '企服智诊与启衡智审：企业场景验证', 'Final Human：两人组队、构建与现场路演'],
    skills: ['需求澄清', 'AI 辅助构建', '测试与路演'],
    image: '/assets/cartoon-clay-v2/career-evidence/04-vibe-coding.webp', alt: '使用 AI 工具快速构建和验证产品原型的场景插画',
  },
] as const;

const educationSchools = [
  {
    id: 'high-school', label: '深圳实验学校（高中部）', english: 'HIGH SCHOOL / 起点',
    image: '/assets/cartoon-clay-v2/02-education/00-shenzhen-experimental-school.webp', width: 1536, height: 1024,
  },
  {
    id: 'university', label: '汕头大学｜会计学本科｜2020.10—2024.06', english: 'UNIVERSITY',
    image: '/assets/cartoon-clay-v2/02-education/00-shantou-university.webp', width: 1672, height: 941,
  },
] as const;

const educationTopics = [
  {
    id: 'activities', label: '校园活动', english: 'CAMPUS LIFE',
    image: '/assets/cartoon-clay-v2/02-education/01-campus-activities.webp', width: 2048, height: 768,
    lead: '我喜欢把自己放进真实的人群、舞台和行动里。',
    items: ['辩论赛：在交锋中训练结构化表达', '校运会：在集体目标里找到自己的位置', '义教与志愿服务：让行动真正抵达他人', '十佳与文明宿舍：把共同生活也经营成作品', '省级大创：从问题出发，完成一次小型实践'],
    details: [
      { src: '/assets/cartoon-clay-v2/education-details/campus/01-debate.webp', width: 1536, height: 1024, alt: '校园活动：辩论赛' },
      { src: '/assets/cartoon-clay-v2/education-details/campus/02-sports-day.webp', width: 1536, height: 1024, alt: '校园活动：校运会' },
      { src: '/assets/cartoon-clay-v2/education-details/campus/03-volunteer-innovation.webp', width: 1672, height: 941, alt: '校园活动：义教、志愿与大创' },
    ],
    focusX: '-27vw', focusY: '-23vh', detailX: -110, detailY: 40,
  },
  {
    id: 'leadership', label: '学生骨干', english: 'LEADERSHIP',
    image: '/assets/cartoon-clay-v2/02-education/02-student-leadership.webp', width: 1942, height: 809,
    lead: '比“做过什么”更重要的，是如何让一群人一起把事情做好。',
    items: ['商学院辩论队队长', '商学院学生会主席', '明德书院导生长'],
    details: [
      { src: '/assets/cartoon-clay-v2/education-details/leadership/01-debate-team-captain.webp', width: 1536, height: 1024, alt: '学生骨干：商学院辩论队队长' },
      { src: '/assets/cartoon-clay-v2/education-details/leadership/02-student-union-president.webp', width: 1536, height: 1024, alt: '学生骨干：商学院学生会主席' },
      { src: '/assets/cartoon-clay-v2/education-details/leadership/03-mentor-lead.webp', width: 1536, height: 1024, alt: '学生骨干：明德书院导生长' },
    ],
    focusX: '-20vw', focusY: '-28vh', detailX: 0, detailY: 96,
  },
  {
    id: 'honors', label: '在校荣誉', english: 'HONORS',
    image: '/assets/cartoon-clay-v2/02-education/03-honors.webp', width: 1964, height: 801,
    lead: '荣誉不是终点，是对长期投入、稳定输出与责任感的阶段性证明。',
    items: ['绩点：待补充', '累计获得 30+ 项奖状与荣誉', '奖状与证明材料正在整理'],
    details: [
      { src: '/assets/cartoon-clay-v2/education-details/honors/01-gpa-record.webp', width: 1536, height: 1024, alt: '在校荣誉：绩点记录' },
      { src: '/assets/cartoon-clay-v2/education-details/honors/02-30plus-honors.webp', width: 1536, height: 1024, alt: '在校荣誉：三十多项荣誉' },
      { src: '/assets/cartoon-clay-v2/education-details/honors/03-certificate-archive.webp', width: 1536, height: 1024, alt: '在校荣誉：奖状档案' },
    ],
    focusX: '-30vw', focusY: '-17vh', detailX: 120, detailY: 42,
  },
] as const;

const lifeInterests = [
  {
    id: 'hiking', index: '01', title: '徒步爬山', english: 'HIKING',
    image: '/assets/cartoon-clay-v2/05-interests/01-hiking.webp', width: 1672, height: 941,
    note: '去更高、更远的地方，也练习一步一步抵达。', tags: ['黄山', '庐山', '恒山', '丹霞山', '徒步爱好者'],
    originX: -300, originY: -220,
    media: [
      { src: '/assets/cartoon-clay-v2/05-interests/hiking/01-huangshan.webp', width: 1224, height: 1285, label: '黄山' },
      { src: '/assets/cartoon-clay-v2/05-interests/hiking/02-lushan.webp', width: 1024, height: 1536, label: '庐山' },
      { src: '/assets/cartoon-clay-v2/05-interests/hiking/03-hengshan.webp', width: 1214, height: 1295, label: '恒山' },
    ],
  },
  {
    id: 'creator', index: '02', title: '自媒体', english: 'CREATOR',
    image: '/assets/cartoon-clay-v2/05-interests/02-creator.webp', width: 1332, height: 1181,
    note: '用内容测试洞察，也用表达连接陌生的人。', tags: ['2个月100W+播放', '懒羊羊 AI 音创', '绿人漫游记', '推文海报剪辑全能'],
    originX: 0, originY: -270,
    media: [
      { src: '/assets/cartoon-clay-v2/05-interests/details/creator/01-100w-views.webp', width: 1164, height: 1351, label: '100W+ 播放' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/creator/02-ai-music.webp', width: 1159, height: 1358, label: '懒羊羊 AI 音创' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/creator/03-green-traveler.webp', width: 1296, height: 1213, label: '绿人漫游记' },
    ],
  },
  {
    id: 'debate', index: '03', title: '辩论', english: 'DEBATE',
    image: '/assets/cartoon-clay-v2/05-interests/03-debate.webp', width: 1448, height: 1086,
    note: '倾听、拆解、回应；把复杂观点说得清楚。', tags: ['结辩', '在校取得4次冠军', '最佳辩手', '质询'],
    originX: 300, originY: -210,
    media: [
      { src: '/assets/cartoon-clay-v2/05-interests/details/debate/01-closing-speech.webp', width: 1312, height: 1199, label: '辩论结辩' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/debate/02-cross-examination.webp', width: 1199, height: 1312, label: '辩论质询' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/debate/03-champion-best-debater.webp', width: 1200, height: 1311, label: '四次冠军与最佳辩手' },
    ],
  },
  {
    id: 'hackathon', index: '04', title: '黑客松', english: 'HACKATHON',
    image: '/assets/cartoon-clay-v2/05-interests/04-hackathon.webp', width: 1536, height: 1024,
    note: '在极短时间里组队、定义问题、做出原型并讲清价值。', tags: ['抖音 AI 创变者计划', '黑马黑客松', '百度秒哒审美黑客松', '蛇口公益黑客松', '知乎黑客松'],
    originX: 300, originY: 220,
    media: [
      { src: '/assets/cartoon-clay-v2/05-interests/details/hackathon/01-douyin-ai.webp', width: 1214, height: 1295, label: '抖音 AI 创变者计划' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/hackathon/02-heima-baidu.webp', width: 1312, height: 1199, label: '黑马 × 百度秒哒' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/hackathon/03-shekou-zhihu.webp', width: 1536, height: 1024, label: '蛇口公益 × 知乎' },
    ],
  },
  {
    id: 'streaks', index: '05', title: '坚持打卡', english: 'DAILY STREAKS',
    image: '/assets/cartoon-clay-v2/05-interests/05-streaks.webp', width: 2017, height: 780,
    note: '相信复利，也享受每天完成一点点的确定感。', tags: ['扇贝单词', '单词打卡3700+天', '坚持晨跑21天', '晨跑3KM', '争取一周六练'],
    originX: 0, originY: 270,
    media: [
      { src: '/assets/cartoon-clay-v2/05-interests/details/streaks/01-vocabulary-streak.webp', width: 1300, height: 1210, label: '3700+ 天单词打卡' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/streaks/02-morning-run.webp', width: 1312, height: 1199, label: '21 天晨跑 · 3KM' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/streaks/03-six-workouts.webp', width: 1199, height: 1312, label: '一周六练' },
    ],
  },
  {
    id: 'more', index: '06', title: '其他', english: 'MORE OF ME',
    image: '/assets/cartoon-clay-v2/05-interests/06-more.webp', width: 1672, height: 940,
    note: '摄影、旅行和策略游戏，让我不断积累新的观察方式。', tags: ['积累审美见闻', '随手记录生活', '照片占320G / 512G', '文明6', '策略游戏爱好者'],
    originX: -300, originY: 220,
    media: [
      { src: '/assets/cartoon-clay-v2/05-interests/details/more/01-photography.webp', width: 1214, height: 1295, label: '摄影记录生活' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/more/02-travel.webp', width: 1192, height: 1320, label: '旅行见闻' },
      { src: '/assets/cartoon-clay-v2/05-interests/details/more/03-strategy-game.webp', width: 1199, height: 1312, label: '文明 6 · 策略游戏' },
    ],
  },
] as const;

type EducationTopicId = (typeof educationTopics)[number]['id'];
type LifeInterestId = (typeof lifeInterests)[number]['id'];
type WorkSelectionId = (typeof workProjects)[number]['id'];
type CareerStageId = (typeof careerStages)[number]['id'];
type ContactEntryId = (typeof contactEntries)[number]['id'];

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const resumeTriggerRef = useRef<HTMLButtonElement>(null);
  const firstDownloadOptionRef = useRef<HTMLButtonElement>(null);
  const downloadWasOpenRef = useRef(false);
  const resumeOpenedWithKeyboardRef = useRef(false);
  const [activeWork, setActiveWork] = useState<WorkSelectionId>('commerce-os');
  const [activeCareer, setActiveCareer] = useState<CareerStageId>('application-support');
  const [activeEducation, setActiveEducation] = useState<EducationTopicId | null>(null);
  const [activeLife, setActiveLife] = useState<LifeInterestId | null>(null);
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
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 800px)').matches;
    const nodes = gsap.utils.toArray<HTMLElement>('.education-topic-node');

    const highSchool = pageRef.current?.querySelector<HTMLElement>('.education-school-high .education-school-sprite');
    const university = pageRef.current?.querySelector<HTMLElement>('.education-school-university .education-school-sprite');
    if (highSchool) {
      gsap.to(highSchool, {
        x: selected && !compact && !reduce ? -18 : 0,
        y: selected && !compact && !reduce ? -16 : 0,
        scale: selected ? (compact ? 0.78 : 0.54) : 1,
        opacity: selected ? 0.48 : 1,
        duration: reduce ? 0.12 : 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    if (university) {
      gsap.to(university, {
        x: selected && !compact && !reduce ? 28 : 0,
        y: selected && !compact && !reduce ? 24 : 0,
        scale: selected ? 1.02 : 1,
        opacity: selected ? 0.86 : 1,
        duration: reduce ? 0.12 : 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }

    nodes.forEach((node, index) => {
      const sprite = node.querySelector<HTMLElement>('.education-topic-sprite');
      if (!sprite) return;
      const isActive = index === activeIndex;
      const distance = selected ? index - activeIndex : 0;
      gsap.to(sprite, {
        x: !selected || reduce || compact ? 0 : isActive ? selected.focusX : Math.sign(distance || 1) * (48 + Math.abs(distance) * 18),
        y: !selected || reduce || compact ? 0 : isActive ? selected.focusY : (index % 2 === 0 ? 20 : -18),
        scale: !selected ? 1 : isActive ? 1.04 : compact ? 0.68 : 0.38,
        rotation: reduce || !selected ? 0 : isActive ? (activeIndex % 2 === 0 ? -2 : 2) : distance * 3,
        opacity: !selected || isActive ? 1 : 0.46,
        duration: reduce ? 0.12 : 0.28,
        ease: isActive ? 'back.out(1.4)' : 'power3.out',
        overwrite: 'auto',
      });
    });

    const detail = pageRef.current?.querySelector<HTMLElement>('.education-detail-shell');
    if (detail && selected) {
      gsap.fromTo(
        detail,
        { autoAlpha: 0, x: reduce || compact ? 0 : selected.detailX, y: reduce || compact ? 0 : selected.detailY, scale: reduce ? 1 : 0.96 },
        { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: reduce ? 0.15 : 0.28, ease: 'power3.out', clearProps: 'transform' },
      );
      const detailCards = gsap.utils.toArray<HTMLElement>('.education-detail-card');
      gsap.fromTo(
        detailCards,
        {
          autoAlpha: 0,
          x: reduce || compact ? 0 : selected.detailX * 0.7,
          y: reduce || compact ? 0 : selected.detailY * 0.6,
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
  }, { dependencies: [activeEducation], scope: pageRef, revertOnUpdate: true });

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chapters = gsap.utils.toArray<HTMLElement>(
      '.work-canvas-v2, .career-canvas-v2, .education-canvas, .life-canvas-v2, .contact-canvas-v2',
    );

    chapters.forEach((chapter) => {
      const content = Array.from(chapter.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
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
    const selectedIndex = lifeInterests.findIndex((item) => item.id === activeLife);
    const selected = selectedIndex >= 0 ? lifeInterests[selectedIndex] : null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 800px)').matches;
    const buttons = gsap.utils.toArray<HTMLElement>('.life-interest-button');

    buttons.forEach((button, index) => {
      const sprite = button.querySelector<HTMLElement>('.life-interest-sprite');
      if (!sprite) return;
      const isActive = index === selectedIndex;
      gsap.to(sprite, {
        x: selected && !isActive && !compact && !reduce ? (index < 3 ? 0 : (index % 2 === 0 ? -16 : 16)) : 0,
        y: selected && !isActive && !compact && !reduce ? (index < 3 ? -14 : 14) : 0,
        scale: !selected ? 1 : isActive ? 1.05 : compact ? 0.78 : 0.72,
        opacity: !selected || isActive ? 1 : 0.58,
        rotation: reduce ? 0 : isActive ? (index % 2 === 0 ? -2 : 2) : 0,
        duration: reduce ? 0.12 : 0.28,
        ease: isActive ? 'back.out(1.4)' : 'power3.out',
        overwrite: 'auto',
      });
    });

    if (!selected) return;
    const originX = reduce ? 0 : compact ? 0 : selected.originX;
    const originY = reduce ? 0 : compact ? (selected.originY > 0 ? 90 : -90) : selected.originY;
    const copy = pageRef.current?.querySelector<HTMLElement>('.life-focus-copy');
    const visuals = gsap.utils.toArray<HTMLElement>('.life-memory-visual');
    const keywords = gsap.utils.toArray<HTMLElement>('.life-keyword-cloud small');
    if (copy) {
      gsap.fromTo(copy, { autoAlpha: 0, x: originX * 0.25, y: originY * 0.2 }, { autoAlpha: 1, x: 0, y: 0, duration: reduce ? 0.15 : 0.28, ease: 'power3.out' });
    }
    gsap.fromTo(
      visuals,
      { autoAlpha: 0, x: originX, y: originY, scale: reduce ? 1 : 0.92, rotation: reduce ? 0 : selected.originX > 0 ? 5 : -5 },
      { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: (index) => [-7, 2, 8][index] ?? 0, duration: reduce ? 0.15 : 0.28, stagger: reduce ? 0 : 0.05, ease: 'power3.out' },
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

    if (workReduceMotion) {
      gsap.set(projectButtons, { clearProps: 'transform,opacity,visibility' });
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
            xPercent: compact ? 0 : -50,
            yPercent: compact ? 0 : -88,
            autoAlpha: isActive ? 1 : compact ? 0.76 : 0.72,
            scale: isActive ? (compact ? 1.05 : 1.08) : compact ? 0.92 : 0.94,
            y: isActive ? (compact ? -8 : -12) : 0,
            rotation: isActive ? 0 : index % 2 === 0 ? -2 : 2,
            duration: 0.28,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        });
      },
    );

    if (feature) {
      gsap.fromTo(
        feature,
        { autoAlpha: 0, y: 16, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.46, ease: 'power3.out', overwrite: 'auto' },
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
        x: compact || reduce ? 0 : isActive ? 0 : index < selectedIndex ? -10 : 10,
        y: compact || reduce ? 0 : isActive ? -8 : index % 2 === 0 ? 6 : -2,
        scale: isActive ? 1.05 : compact ? 0.9 : 0.72,
        opacity: isActive ? 1 : 0.56,
        rotation: reduce ? 0 : isActive ? 0 : index % 2 === 0 ? -2 : 2,
        duration: reduce ? 0.12 : 0.28,
        ease: isActive ? 'back.out(1.4)' : 'power3.out',
        overwrite: 'auto',
      });
    });

    const detail = pageRef.current?.querySelector<HTMLElement>('.career-focus-detail');
    const art = pageRef.current?.querySelector<HTMLElement>('.career-focus-art');
    if (detail) {
      gsap.fromTo(detail, { autoAlpha: 0, x: reduce || compact ? 0 : selectedIndex < 2 ? -70 : 70, y: reduce ? 0 : 22 }, { autoAlpha: 1, x: 0, y: 0, duration: reduce ? 0.15 : 0.28, ease: 'power3.out' });
    }
    if (art) {
      gsap.fromTo(art, { autoAlpha: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.92, rotation: reduce ? 0 : selectedIndex % 2 === 0 ? -3 : 3 }, { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: reduce ? 0.15 : 0.34, ease: 'back.out(1.32)' });
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

  const activateWork = contextSafe((id: WorkSelectionId, button: HTMLButtonElement, shouldAnimate = true) => {
    setActiveWork(id);
    const art = button.querySelector<HTMLElement>('.work-project-art');
    if (!shouldAnimate || !art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(art, { scale: 0.96, duration: 0.1, ease: 'power2.out' })
      .to(art, { scale: 1, duration: 0.18, ease: 'power3.out' });
  });

  const activateCareer = contextSafe((id: CareerStageId, button: HTMLButtonElement) => {
    setActiveCareer(id);
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

  const activateEducation = contextSafe((id: EducationTopicId, button: HTMLButtonElement) => {
    setActiveEducation(id);
    const art = button.querySelector<HTMLElement>('.education-topic-art');
    if (!art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(art, { scale: 0.94, duration: 0.12, ease: 'power2.out' })
      .to(art, { scale: 1, duration: 0.28, ease: 'back.out(1.7)' });
  });

  const activateLife = contextSafe((id: LifeInterestId, button: HTMLButtonElement) => {
    setActiveLife((current) => current === id ? null : id);
    const art = button.querySelector<HTMLElement>('.life-interest-art');
    if (!art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .to(art, { scale: 0.94, duration: 0.12, ease: 'power2.out' })
      .to(art, { scale: 1, duration: 0.28, ease: 'back.out(1.7)' });
  });

  const selectedContact = contactEntries.find((item) => item.id === activeContact) ?? null;
  const selectedCareer = careerStages.find((item) => item.id === activeCareer) ?? careerStages[0];
  const selectedEducation = educationTopics.find((item) => item.id === activeEducation) ?? null;
  const selectedLife = lifeInterests.find((item) => item.id === activeLife) ?? null;
  const selectedLifeMedia = (selectedLife?.media ?? []) as readonly { src: string; width: number; height: number; label: string }[];

  return (
    <main ref={pageRef}>
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
            <div className="scene-top hero-small"><span>HELLO, I&apos;M VIOLET</span><span>FDE · AI PRODUCT BUILDER</span></div>
            <h1 className="intro-title fde-title" aria-label="FDE"><span className="word-mask">{'FDE'.split('').map((char, index) => <i className={`intro-char ${index === 1 ? 'outline-char' : ''}`} key={`${char}-${index}`}>{char}</i>)}</span></h1>
            <div className="hero-caption hero-small"><p>你好，我是谢子涵。<br />你也可以叫我 Violet。</p><span>把复杂业务做成可验证的 AI 产品</span></div>
            <span className="hero-handwrite" aria-hidden="true">nice to meet you</span>
            <div className="scene-progress hero-small"><span>01 / 03</span><i /><span>SCROLL TO ENTER</span></div>
          </div>
          <div className="scene bio-scene" id="profile">
            <div className="bio-label bio-content-v2">NICE TO MEET YOU · 02</div>
            <div className="bio-copy bio-content-v2"><div className="line-mask"><h2>很高兴</h2></div><div className="line-mask"><h2 className="accent-type">认识你。</h2></div><div className="line-mask bio-paragraph-mask"><p>我从企业交付现场出发，把模糊需求拆成可验证的问题，再做成能被真实用户试用的 AI 产品。这里有 9 个持续生长的构建、4 段能力升级路径，也有让我保持好奇的生活。</p></div></div>
            <div className="bio-facts bio-content-v2"><div className="fact"><strong>09</strong><span>PRODUCT<br />BUILDS</span></div><div className="fact"><strong>04</strong><span>CAREER<br />LEVELS</span></div><div className="fact"><strong>06</strong><span>LIFE<br />INTERESTS</span></div></div>
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
      >
        <header className="work-heading-v2">
          <span>01 / VIBE CODING WORKS</span>
          <h2 id="work-title">先看我<br /><em>做出了什么。</em></h2>
          <p>从真实经营、企业 Agent 到获奖游戏：先看证据，再进入完整案例或实时 Demo。</p>
        </header>

        <div className="work-stage-v3">
          <article
            className="work-feature-v3 work-feature-embed-v3"
            id="work-feature-stage"
            role="tabpanel"
            aria-labelledby={`work-tab-${selectedWork.id}`}
            aria-live="polite"
            key={selectedWork.id}
          >
            <div className="work-embed-shell-v3">
              <header className="work-embed-toolbar-v3">
                <span><b>{selectedWork.index}</b> / 06 · {selectedWork.title}</span>
                <i>完整作品展示已嵌入</i>
                <a href={selectedWork.caseHref} target="_blank" rel="noreferrer">
                  全屏打开<span aria-hidden="true">↗</span>
                </a>
              </header>
              <div className="work-embed-viewport-v3">
                <iframe
                  className="work-embed-frame-v3"
                  src={selectedWork.caseHref}
                  title={`${selectedWork.title}完整作品展示`}
                  loading="eager"
                  allow="fullscreen"
                />
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
                    onClick={(event) => activateWork(project.id, event.currentTarget, event.detail > 0)}
                    onKeyDown={(event) => {
                      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                      event.preventDefault();
                      let nextIndex = selectedWorkIndex;
                      if (event.key === 'ArrowLeft') nextIndex = (selectedWorkIndex - 1 + workProjects.length) % workProjects.length;
                      if (event.key === 'ArrowRight') nextIndex = (selectedWorkIndex + 1) % workProjects.length;
                      if (event.key === 'Home') nextIndex = 0;
                      if (event.key === 'End') nextIndex = workProjects.length - 1;
                      activateWork(workProjects[nextIndex].id, event.currentTarget, false);
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
                    <Image className="work-project-art" src={project.image} alt="" fill sizes="(max-width: 820px) 30vw, 186px" unoptimized />
                    <span className="work-project-label-v3">{project.title}</span>
                    <span className="work-project-selected-v3" aria-hidden="true">正在展示</span>
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
          <p>企业软件交付 2023—2026<br />AI 解决方案实践 NOW</p>
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
                <ul className="career-proof-list">
                  {selectedCareer.proof.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="career-skill-list" aria-label="该阶段形成的能力">
                  {selectedCareer.skills.map((item) => <small key={item}>{item}</small>)}
                </div>
              </div>
              <figure className="career-focus-art">
                <Image src={selectedCareer.image} width={1122} height={1402} alt={selectedCareer.alt} loading="lazy" unoptimized />
                <figcaption><span>{selectedCareer.role}</span><small>{selectedCareer.altitude}</small></figcaption>
              </figure>
            </article>
          </div>

          <div className="career-ladder-deck">
            <div className="career-ladder-wrap">
              <div className="career-stage-list" role="tablist" aria-label="选择职业阶段">
                {careerStages.map((stage, index) => {
                  const selected = activeCareer === stage.id;
                  return (
                    <div className={`career-ladder-step career-ladder-step-${index + 1}`} key={stage.id}>
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
                        <span className="career-stage-sprite" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        <span className="career-stage-label"><small>{stage.level}</small><strong>{stage.tabLabel}</strong><i>{stage.altitude}</i></span>
                      </button>
                      <span className="career-step-period" aria-hidden="true">{stage.period}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="career-quest-title">
              <span>工作经历 / CAREER QUEST</span>
              <h2 id="career-title">打怪<br /><em>升级。</em></h2>
              <p>{selectedCareer.level} / {selectedCareer.altitude}</p>
            </div>
          </div>
        </div>

        <p className="career-hint-v2">点击阶梯切换阶段 · 键盘可用方向键、Home 与 End 连续浏览</p>
      </section>

      <section className="education-canvas" id="education" aria-labelledby="education-title">
        <header className="education-heading">
          <span>03 / EDUCATION</span>
          <h2 id="education-title">学校之外，<br /><em>我也在长大。</em></h2>
          <p>左上是起点，右下是大学。三条支线贴着大学生长，等你亲手打开。</p>
        </header>
        <div className={`education-stage education-stage-v2 ${selectedEducation ? 'has-focus' : ''}`}>
          <figure className="education-school-mark education-school-high" aria-label={educationSchools[0].label}>
            <span className="education-school-sprite">
              <Image src={educationSchools[0].image} width={educationSchools[0].width} height={educationSchools[0].height} alt="" aria-hidden="true" loading="lazy" unoptimized />
            </span>
            <figcaption className="sr-only">{educationSchools[0].english} · {educationSchools[0].label}</figcaption>
          </figure>

          <figure className="education-school-mark education-school-university" aria-label={educationSchools[1].label}>
            <span className="education-school-sprite">
              <Image src={educationSchools[1].image} width={educationSchools[1].width} height={educationSchools[1].height} alt="" aria-hidden="true" loading="lazy" unoptimized />
            </span>
            <figcaption className="sr-only">{educationSchools[1].english} · {educationSchools[1].label}</figcaption>
          </figure>

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
                <span className="education-topic-sprite"><Image className="education-topic-art" src={item.image} width={item.width} height={item.height} alt="" aria-hidden="true" loading="lazy" unoptimized /></span>
                <span className="sr-only">{item.label}</span>
              </button>
            ))}
          </div>

          {selectedEducation && (
            <div className="education-detail-shell" id="education-detail" role="tabpanel" aria-label={selectedEducation.label} aria-live="polite" key={selectedEducation.id}>
              <div className="education-detail-copy">
                <span>{selectedEducation.english}</span>
                <h3 className="sr-only">{selectedEducation.label}</h3>
                <p>{selectedEducation.lead}</p>
                <ul>{selectedEducation.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="education-detail-media" aria-label={`${selectedEducation.label}详情卡`}>
                {selectedEducation.details.map((detail) => (
                  <span className="education-detail-card" key={detail.src}>
                    <Image src={detail.src} width={detail.width} height={detail.height} alt={detail.alt} loading="lazy" unoptimized />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="education-hint">{selectedEducation ? '再选择一条支线，中央舞台会立即接住它。' : '点击大学旁的一块软陶，中间才会展开对应经历。'}</p>
      </section>

      <section className="life-canvas-v2" id="life" aria-labelledby="life-title">
        <header className="life-heading-v2">
          <span>04 / LIFE &amp; INTERESTS</span>
          <h2 id="life-title">认真工作，<br /><em>也认真生活。</em></h2>
          <p>六个方向，各自藏着一组记忆。点开后，内容会从软陶入口所在的方向向中央聚拢。</p>
        </header>

        <div className={`life-stage-v2 ${selectedLife ? 'has-memory' : ''}`}>
          <div className="life-interest-orbit" role="tablist" aria-label="生活兴趣入口">
            {lifeInterests.map((interest, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeLife === interest.id}
                aria-controls="life-focus-stage"
                className={`life-interest-button life-interest-${index + 1}`}
                key={interest.id}
                onClick={(event) => activateLife(interest.id, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return;
                  event.preventDefault();
                  activateLife(interest.id, event.currentTarget);
                }}
                data-cursor-label={`OPEN ${interest.english}`}
              >
                <span className="life-interest-sprite">
                  <Image className="life-interest-art" src={interest.image} width={interest.width} height={interest.height} alt="" aria-hidden="true" loading="lazy" unoptimized />
                </span>
                <span className="sr-only">{interest.index} · {interest.title}</span>
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
                <div className="life-memory-three" aria-label={`${selectedLife.title}的三段视觉记忆`}>
                  {[0, 1, 2].map((slot) => {
                    const media = selectedLifeMedia[slot];
                    return (
                      <span className={`life-memory-card life-memory-card-${slot + 1}`} key={`${selectedLife.id}-${slot}`}>
                        <span className="life-memory-visual">
                          {media ? (
                            <Image src={media.src} width={media.width} height={media.height} alt={`${media.label}软陶插画`} loading="lazy" unoptimized />
                          ) : (
                            <span className="life-photo-space"><b>0{slot + 1}</b><small>PHOTO / 待补真实记忆</small></span>
                          )}
                        </span>
                        <small>{media?.label ?? `MEMORY 0${slot + 1}`}</small>
                      </span>
                    );
                  })}
                </div>
              </article>
            )}
          </div>
        </div>

        <p className="life-hint-v2">{selectedLife ? '再次点击当前入口可收起；也可以直接打开另一个方向。' : '选择一块软陶，让三段记忆从它的方向来到中央。'}</p>
      </section>

      <section className="contact-canvas-v2" id="contact" aria-labelledby="contact-title">
        <header className="contact-heading-v2">
          <span>05 / CONTACT</span>
          <h2 id="contact-title">如果方向相同，<br /><em>那就聊聊。</em></h2>
          <p>四块软陶分别通向邮箱、微信、GitHub 和简历。先选一个入口，再决定下一步。</p>
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
                  <button type="button" aria-disabled="true" onClick={(event) => event.preventDefault()}>微信号整理中</button>
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
