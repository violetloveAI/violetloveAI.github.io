export type LifeInterestId = 'hiking' | 'creator' | 'think-build' | 'journey' | 'practice';

type LifeMediaMetadata = {
  id?: string;
  width?: number;
  height?: number;
  originalSrc?: string;
  topic?: string;
};

export type LifeMedia = LifeMediaMetadata & (
  | {
      kind: 'portrait';
      src: string;
      realSrc: string;
      alt: string;
    }
  | {
      kind: 'evidence' | 'decoration';
      src: string;
      alt: string;
      label: string;
    });

const galleryRoot = '/assets/cartoon-clay-v2/life-garden-v1/gallery';

// BEGIN GENERATED LIFE SUPPLEMENTS — run node scripts/sync-life-supplements.mjs
export const lifeSupplementalMediaByInterest: Record<LifeInterestId, readonly LifeMedia[]> = {
  "hiking": [
    {
      "kind": "decoration",
      "id": "01-huangshan",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/hiking/01-huangshan.webp",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/hiking/01-huangshan.webp",
      "width": 1224,
      "height": 1285,
      "topic": "mountain",
      "alt": "黄山迎客松与云海的透明黏土插画",
      "label": "黄山"
    },
    {
      "kind": "decoration",
      "id": "02-lushan",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/hiking/02-lushan.webp",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/hiking/02-lushan.webp",
      "width": 1024,
      "height": 1536,
      "topic": "mountain",
      "alt": "庐山山峰与瀑布的透明黏土插画",
      "label": "庐山"
    },
    {
      "kind": "decoration",
      "id": "03-hengshan",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/hiking/03-hengshan.webp",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/hiking/03-hengshan.webp",
      "width": 1214,
      "height": 1295,
      "topic": "mountain",
      "alt": "恒山山崖与寺庙的透明黏土插画",
      "label": "恒山"
    }
  ],
  "creator": [
    {
      "kind": "evidence",
      "id": "01-ai-cover-catalog",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/01-ai-cover-catalog.png",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/01-ai-cover-catalog.png",
      "width": 2012,
      "height": 1282,
      "topic": "ai-cover",
      "alt": "2023 年 AI 懒羊羊翻唱作品列表原始截图，包含作品封面、日期与播放反馈",
      "label": "2023 · AI 翻唱作品"
    },
    {
      "kind": "evidence",
      "id": "02-agent-account",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/02-agent-account.jpg",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/02-agent-account.jpg",
      "width": 1320,
      "height": 2418,
      "topic": "agent",
      "alt": "绿人漫游记 MBTI 账号的作品总览原始截图，包含图文、视频与播放反馈",
      "label": "2026 · 账号作品总览"
    },
    {
      "kind": "evidence",
      "id": "03-ai-cover-100k",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/03-ai-cover-100k.png",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/03-ai-cover-100k.png",
      "width": 750,
      "height": 1000,
      "topic": "ai-cover",
      "alt": "2023 年 9 月 AI 翻唱单稿播放首次突破十万的完整纪念图",
      "label": "单支播放 10 万"
    },
    {
      "kind": "evidence",
      "id": "04-ai-cover-analytics",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/04-ai-cover-analytics.jpg",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/04-ai-cover-analytics.jpg",
      "width": 994,
      "height": 686,
      "topic": "ai-cover",
      "alt": "2023 年 AI 翻唱账号后台原始截图，显示累计播放 1054586 及互动数据",
      "label": "累计播放 105 万+"
    },
    {
      "kind": "evidence",
      "id": "05-agent-video-catalog",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/05-agent-video-catalog.png",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/05-agent-video-catalog.png",
      "width": 2008,
      "height": 1296,
      "topic": "agent",
      "alt": "2026 年 MBTI 内容创作视频列表原始截图，包含选题、封面与观看反馈",
      "label": "2026 · MBTI 视频作品"
    },
    {
      "kind": "evidence",
      "id": "06-ai-cover-cover-study",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/06-ai-cover-cover-study.jpg",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/06-ai-cover-cover-study.jpg",
      "width": 2688,
      "height": 1656,
      "topic": "ai-cover",
      "alt": "2023 年个人制作的视频封面完整拼图",
      "label": "封面与视觉表达"
    }
  ],
  "think-build": [],
  "journey": [
    {
      "kind": "decoration",
      "id": "01-photography",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/journey/01-photography.webp",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/journey/01-photography.webp",
      "width": 1214,
      "height": 1295,
      "topic": "photography",
      "alt": "相机、镜头与照片组成的透明黏土摄影插画",
      "label": "摄影记录"
    },
    {
      "kind": "decoration",
      "id": "02-travel",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/journey/02-travel.webp",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/journey/02-travel.webp",
      "width": 1192,
      "height": 1320,
      "topic": "travel",
      "alt": "车票、行李箱与地图组成的透明黏土旅行插画",
      "label": "旅行见闻"
    }
  ],
  "practice": [
    {
      "kind": "decoration",
      "id": "01-vocabulary-decoration",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/01-vocabulary-decoration.webp",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/01-vocabulary-decoration.webp",
      "width": 1300,
      "height": 1210,
      "topic": "vocabulary",
      "alt": "单词卡片、词典与打卡日历组成的透明黏土插画",
      "label": "单词练习"
    },
    {
      "kind": "decoration",
      "id": "02-running-decoration",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/02-running-decoration.webp",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/02-running-decoration.webp",
      "width": 1312,
      "height": 1199,
      "topic": "running",
      "alt": "晨跑主题的透明黏土插画",
      "label": "晨跑"
    },
    {
      "kind": "evidence",
      "id": "03-fitness-year",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/03-fitness-year.png",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/03-fitness-year.png",
      "width": 728,
      "height": 1292,
      "topic": "fitness",
      "alt": "2025 年 Keep 运动年报原始截图，显示全年运动 214 天、598 次",
      "label": "2025 · 214 天运动"
    },
    {
      "kind": "evidence",
      "id": "04-running-reflection",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/04-running-reflection.jpg",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/04-running-reflection.jpg",
      "width": 1320,
      "height": 981,
      "topic": "running",
      "alt": "2026 年 5 月连续晨跑 21 天后的个人小结完整截图",
      "label": "21 天晨跑小结"
    },
    {
      "kind": "evidence",
      "id": "05-vocabulary-streak",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/05-vocabulary-streak.jpg",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/05-vocabulary-streak.jpg",
      "width": 1320,
      "height": 2043,
      "topic": "vocabulary",
      "alt": "2026 年 8 月单词学习累计打卡 3752 天的完整截图",
      "label": "3752 天累计打卡"
    },
    {
      "kind": "evidence",
      "id": "06-fitness-month",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/06-fitness-month.jpg",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/06-fitness-month.jpg",
      "width": 1320,
      "height": 2844,
      "topic": "fitness",
      "alt": "2026 年 8 月训练月报完整截图，记录 1530 分钟、21 次训练及训练日历",
      "label": "2026.08 · 训练记录"
    },
    {
      "kind": "evidence",
      "id": "07-running-log",
      "src": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/07-running-log.jpg",
      "originalSrc": "/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/07-running-log.jpg",
      "width": 8780,
      "height": 9096,
      "topic": "running",
      "alt": "完整晨跑记录原图拼图，保留每次路线、里程及配速",
      "label": "晨跑记录"
    }
  ]
};
// END GENERATED LIFE SUPPLEMENTS

// Keep later screenshot replacements outside the generated archive. Matching
// filenames preserve the existing scene placement and survive archive resyncs.
const creatorScreenshotRoot = '/assets/cartoon-clay-v2/life-garden-v1/supplements/creator/updated-20261009';

export const lifeMediaByInterest: Record<LifeInterestId, readonly LifeMedia[]> = {
  hiking: [
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/01-summit-flag.webp`, realSrc: `${galleryRoot}/01-hiking/01-summit-flag-real.webp`, alt: '在山顶与旗帜留影' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/02-mountain-sunset.webp`, realSrc: `${galleryRoot}/01-hiking/02-mountain-sunset-real.webp`, alt: '在山野日落前留影' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/05-snow-mountain.webp`, realSrc: `${galleryRoot}/01-hiking/05-snow-mountain-real.webp`, alt: '在雪山旅途中留影' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/03-summit-hike.webp`, realSrc: `${galleryRoot}/01-hiking/03-summit-hike-real.webp`, alt: '在山顶完成徒步' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/04-summit-overlook.webp`, realSrc: `${galleryRoot}/01-hiking/04-summit-overlook-real.webp`, alt: '背着登山包在山顶远眺' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/06-anchor-overlook.webp`, realSrc: `${galleryRoot}/01-hiking/06-anchor-overlook-real.webp`, alt: '在巨大船锚旁远望' },
    ...lifeSupplementalMediaByInterest.hiking,
  ],
  creator: [
    ...lifeSupplementalMediaByInterest.creator
      .filter((media) => media.id !== '06-ai-cover-cover-study')
      .map((media): LifeMedia => {
        if (media.kind !== 'evidence') return media;
        if (media.id === '02-agent-account') {
          const src = `${creatorScreenshotRoot}/02-agent-account.jpg`;
          return { ...media, src, originalSrc: src, width: 1320, height: 2434 };
        }
        if (media.id === '05-agent-video-catalog') {
          const src = `${creatorScreenshotRoot}/05-agent-video-catalog.png`;
          return {
            ...media, src, originalSrc: src, width: 2006, height: 1142,
            alt: '绿人漫游记城市旅行视频作品列表，包含洛阳、长沙、广州等城市的作品封面与观看反馈',
            label: '2026 · 城市旅行视频作品',
          };
        }
        return media;
      }),
  ],
  'think-build': [
    { kind: 'portrait', topic: 'debate', src: `${galleryRoot}/03-think-build/01-debate.webp`, realSrc: `${galleryRoot}/03-think-build/01-debate-real.webp`, alt: '在辩论赛场表达观点' },
    { kind: 'portrait', topic: 'debate', src: `${galleryRoot}/03-think-build/02-stage-expression.webp`, realSrc: `${galleryRoot}/03-think-build/02-stage-expression-real.webp`, alt: '在舞台上进行公开表达' },
    { kind: 'portrait', topic: 'debate', src: `${galleryRoot}/03-think-build/05-debate-award.webp`, realSrc: `${galleryRoot}/03-think-build/05-debate-award-real.webp`, alt: '穿黑色西装，手持辩论赛奖杯与自行车奖品牌留影' },
    { kind: 'portrait', topic: 'hackathon', src: `${galleryRoot}/03-think-build/04-hackathon-award.webp`, realSrc: `${galleryRoot}/03-think-build/04-hackathon-award-real.webp`, alt: '展示黑客松获奖成果' },
    { kind: 'portrait', topic: 'hackathon', src: `${galleryRoot}/03-think-build/06-baytech-award.webp`, realSrc: `${galleryRoot}/03-think-build/06-baytech-award-real.webp`, alt: '穿绿色上衣，手持 Baytech 黑客松的两块获奖牌留影' },
    { kind: 'portrait', topic: 'hackathon', src: `${galleryRoot}/03-think-build/07-evotavern.webp`, realSrc: `${galleryRoot}/03-think-build/07-evotavern-real.webp`, alt: '穿橙色上衣、佩戴活动证件，在 EvoTavern 活动现场比出胜利手势' },
    ...lifeSupplementalMediaByInterest['think-build'],
  ],
  journey: [
    { kind: 'portrait', src: `${galleryRoot}/04-journey/01-rock-city.webp`, realSrc: `${galleryRoot}/04-journey/01-rock-city-real.webp`, alt: '在岩石古城留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/03-rock-overlook.webp`, realSrc: `${galleryRoot}/04-journey/03-rock-overlook-real.webp`, alt: '在岩石古城高处远眺' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/02-lakeside-tower.webp`, realSrc: `${galleryRoot}/04-journey/02-lakeside-tower-real.webp`, alt: '在湖畔古塔前留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/05-dome-journey.webp`, realSrc: `${galleryRoot}/04-journey/05-dome-journey-real.webp`, alt: '在穹顶建筑前留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/10-skiing.webp`, realSrc: `${galleryRoot}/04-journey/10-skiing-real.webp`, alt: '在雪道上练习滑雪' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/06-temple-of-heaven.webp`, realSrc: `${galleryRoot}/04-journey/06-temple-of-heaven-real.webp`, alt: '在天坛旅行留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/07-balloon-dawn.webp`, realSrc: `${galleryRoot}/04-journey/07-balloon-dawn-real.webp`, alt: '在热气球晨曦中留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/08-old-tower.webp`, realSrc: `${galleryRoot}/04-journey/08-old-tower-real.webp`, alt: '在古楼高处远眺' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/09-snow-landmark.webp`, realSrc: `${galleryRoot}/04-journey/09-snow-landmark-real.webp`, alt: '在雪地地标前留影' },
    ...lifeSupplementalMediaByInterest.journey,
  ],
  practice: [
    ...lifeSupplementalMediaByInterest.practice,
    {
      kind: 'decoration',
      id: '08-fitness-decoration',
      src: '/assets/cartoon-clay-v2/life-garden-v1/supplements/practice/08-fitness-decoration.png',
      width: 1254,
      height: 1254,
      topic: 'fitness',
      alt: '全年运动&健身200+天：哑铃、打卡日历、水壶和毛巾组成的透明软陶按钮',
      label: '全年运动&健身200+天',
    },
  ],
};
