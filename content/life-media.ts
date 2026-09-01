export type LifeMedia =
  | {
      kind: 'portrait';
      src: string;
      realSrc: string;
      alt: string;
    }
  | {
      kind: 'evidence';
      src: string;
      alt: string;
      label: string;
    };

const galleryRoot = '/assets/cartoon-clay-v2/life-garden-v1/gallery';

export const lifeMediaByInterest = {
  hiking: [
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/01-summit-flag.webp`, realSrc: `${galleryRoot}/01-hiking/01-summit-flag.webp`, alt: '在山顶与旗帜留影' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/02-mountain-sunset.webp`, realSrc: `${galleryRoot}/01-hiking/02-mountain-sunset.webp`, alt: '在山野日落前留影' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/05-snow-mountain.webp`, realSrc: `${galleryRoot}/01-hiking/05-snow-mountain.webp`, alt: '在雪山旅途中留影' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/03-summit-hike.webp`, realSrc: `${galleryRoot}/01-hiking/03-summit-hike.webp`, alt: '在山顶完成徒步' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/04-summit-overlook.webp`, realSrc: `${galleryRoot}/01-hiking/04-summit-overlook.webp`, alt: '背着登山包在山顶远眺' },
    { kind: 'portrait', src: `${galleryRoot}/01-hiking/06-anchor-overlook.webp`, realSrc: `${galleryRoot}/01-hiking/06-anchor-overlook.webp`, alt: '在巨大船锚旁远望' },
  ],
  creator: [
    { kind: 'evidence', src: `${galleryRoot}/02-creator/01-video-covers.webp`, alt: '个人创作过的多组视频封面拼图', label: '视频封面合集' },
    { kind: 'evidence', src: `${galleryRoot}/02-creator/02-100k-milestone.webp`, alt: '单支视频播放量达到十万的纪念截图', label: '单支 10W+' },
    { kind: 'evidence', src: `${galleryRoot}/02-creator/03-view-analytics.webp`, alt: '视频账号累计播放数据截图', label: '累计 105W+' },
  ],
  'think-build': [
    { kind: 'portrait', src: `${galleryRoot}/03-think-build/01-debate.webp`, realSrc: `${galleryRoot}/03-think-build/01-debate.webp`, alt: '在辩论赛场表达观点' },
    { kind: 'portrait', src: `${galleryRoot}/03-think-build/02-stage-expression.webp`, realSrc: `${galleryRoot}/03-think-build/02-stage-expression.webp`, alt: '在舞台上进行公开表达' },
    { kind: 'portrait', src: `${galleryRoot}/03-think-build/03-ai-project.webp`, realSrc: `${galleryRoot}/03-think-build/03-ai-project.webp`, alt: '在黑客松现场展示作品原型' },
    { kind: 'portrait', src: `${galleryRoot}/03-think-build/04-hackathon-award.webp`, realSrc: `${galleryRoot}/03-think-build/04-hackathon-award.webp`, alt: '展示黑客松获奖成果' },
  ],
  journey: [
    { kind: 'portrait', src: `${galleryRoot}/04-journey/01-rock-city.webp`, realSrc: `${galleryRoot}/04-journey/01-rock-city.webp`, alt: '在岩石古城留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/02-lakeside-tower.webp`, realSrc: `${galleryRoot}/04-journey/02-lakeside-tower.webp`, alt: '在湖畔古塔前留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/03-rock-overlook.webp`, realSrc: `${galleryRoot}/04-journey/03-rock-overlook.webp`, alt: '在岩石古城高处远眺' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/05-dome-journey.webp`, realSrc: `${galleryRoot}/04-journey/05-dome-journey.webp`, alt: '在穹顶建筑前留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/10-skiing.webp`, realSrc: `${galleryRoot}/04-journey/10-skiing.webp`, alt: '在雪道上练习滑雪' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/06-temple-of-heaven.webp`, realSrc: `${galleryRoot}/04-journey/06-temple-of-heaven.webp`, alt: '在天坛旅行留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/07-balloon-dawn.webp`, realSrc: `${galleryRoot}/04-journey/07-balloon-dawn.webp`, alt: '在热气球晨曦中留影' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/08-old-tower.webp`, realSrc: `${galleryRoot}/04-journey/08-old-tower.webp`, alt: '在古楼高处远眺' },
    { kind: 'portrait', src: `${galleryRoot}/04-journey/09-snow-landmark.webp`, realSrc: `${galleryRoot}/04-journey/09-snow-landmark.webp`, alt: '在雪地地标前留影' },
  ],
  practice: [
    { kind: 'portrait', src: `${galleryRoot}/05-practice/01-fitness.webp`, realSrc: `${galleryRoot}/05-practice/01-fitness.webp`, alt: '在健身镜前记录练习' },
    { kind: 'evidence', src: `${galleryRoot}/05-practice/04-vocabulary-streak.webp`, alt: '单词输入累计 3752 天的记录截图', label: '3752 天英语输入' },
    { kind: 'evidence', src: `${galleryRoot}/05-practice/05-running-log.webp`, alt: '21 天晨跑记录拼图', label: '21 天晨跑' },
  ],
} as const satisfies Record<string, readonly LifeMedia[]>;
