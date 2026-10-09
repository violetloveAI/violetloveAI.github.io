import type { CSSProperties } from 'react';
import type { LifeMedia } from './life-media';

export const lifeStoryCopy = {
  hiking: { note: '在山野里找回自己的节奏，\n也享受一步一步抵达的过程。', tags: ['走进山野', '山顶远眺', '沿途风景', '一步步抵达'] },
  'think-build': { note: '在辩论里听懂不同观点，\n在黑客松里把想法一起做出来。', tags: ['理解分歧', '清楚表达', '组队共创', '动手实现'] },
  journey: { note: '去没到过的地方，\n用镜头留下自己的观察。', tags: ['旅行见闻', '构图与光线', '不同视角', '镜头记录'] },
  creator: { note: '把喜欢做成作品，\n也把创作变成持续迭代的练习。', tags: ['审美表达', '受众反馈', 'Agent 工作流', '持续迭代'] },
  practice: { note: '让单词成为每天的积累，\n让运动成为照顾自己的方式。', tags: ['单词积累', '力量训练', '清晨慢跑', '日常记录'] },
} as const;

export type LifeSceneId = keyof typeof lifeStoryCopy;

const themeRoot = '/assets/cartoon-clay-v2/life-garden-v1/themes-2026-09';
const theme = (file: string, alt: string, topic: string): LifeMedia => ({
  kind: 'decoration', src: `${themeRoot}/${file}.webp`, alt, label: alt, topic, width: 1254, height: 1254,
});

export const lifeThemeMedia: Record<LifeSceneId, readonly LifeMedia[]> = {
  hiking: [],
  journey: [],
  creator: [theme('01-ai-cover-2023', '2023 AI翻唱', 'ai-cover'), theme('02-agent-2026', '2026 Agent自动化', 'agent')],
  'think-build': [theme('06-debate', '辩论', 'debate'), theme('07-hackathon', '黑客松', 'hackathon')],
  practice: [theme('03-fitness', '健身', 'fitness'), theme('04-vocabulary', '单词', 'vocabulary'), theme('05-morning-run', '晨跑', 'running')],
};

// Bounds reserve space for the full original photograph, not only the clay silhouette.
// x/y are the centre of each freely placed item in the safe area inside the vine.
type Placement = [x: number, y: number, width: number, height: number, rotation?: number];
const portraitPlacements: Record<LifeSceneId, Placement[]> = {
  hiking: [[10, 27, 24, 40, -2], [34, 54, 25, 38, 1], [90, 27, 22, 40, 2], [13, 77, 25, 40, -2], [58, 77, 31, 42, 0], [87, 77, 28, 41, 1]],
  // Three debate moments on the left, three hackathon moments on the right.
  'think-build': [[12, 49, 22, 34, -2], [37, 49, 22, 34, 1], [25, 73, 29, 34, -1], [63, 49, 22, 34, -1], [88, 49, 22, 34, 2], [75, 73, 27, 34, 1]],
  journey: [[14, 41, 24, 33, -2], [39, 44, 24, 31, -1], [66, 43, 24, 37, -1], [85, 42, 22, 34, 2], [9, 79, 19, 31, -1], [28, 80, 20, 32, 1], [49, 71, 20, 29, 1], [69, 79, 19, 32, 2], [89, 79, 23, 31, -1]],
  creator: [],
  practice: [],
};

const supplementalPlacements: Record<string, Placement> = {
  '01-huangshan.webp': [27, 28, 20, 32, -3],
  '02-lushan.webp': [63, 37, 21, 34, 3],
  '03-hengshan.webp': [75, 52, 18.5, 30, 2],
  '01-photography.webp': [22, 10, 14, 21, -3],
  '02-travel.webp': [80, 10, 14, 21, 3],
  '01-ai-cover-2023.webp': [20, 9, 22, 30, -3],
  '02-agent-2026.webp': [80, 9, 22, 30, 3],
  '01-ai-cover-catalog.png': [17, 61, 28, 28, -2],
  '03-ai-cover-100k.png': [39, 70, 17, 47, 1],
  '04-ai-cover-analytics.jpg': [17, 85, 27, 18, 1],
  '02-agent-account.jpg': [61, 70, 17, 47, -1],
  '05-agent-video-catalog.png': [84, 70, 29, 44, 1],
  '06-debate.webp': [12, 18, 24, 28, -3],
  '07-hackathon.webp': [88, 18, 24, 28, 3],
  '03-fitness.webp': [19, 30, 22, 27, -3],
  '04-vocabulary.webp': [50, 32, 21, 26, 1],
  '05-morning-run.webp': [83, 28, 22, 26, 3],
  // Keep the fitness records left, with the matching clay badge beside them.
  '03-fitness-year.png': [11, 68, 12, 39, 2],
  '06-fitness-month.jpg': [23, 63, 11, 42, -1],
  '05-vocabulary-streak.jpg': [51, 67, 17, 43, -1],
  '04-running-reflection.jpg': [82, 52, 30, 20, 2],
  '07-running-log.jpg': [83, 79, 26, 30, -2],
  '01-vocabulary-decoration.webp': [62, 63, 15, 21, 2],
  '02-running-decoration.webp': [88.5, 62, 15, 23, -3],
  '08-fitness-decoration.png': [35.5, 64, 12.5, 21, -2],
};

export function lifeMediaPlacement(interest: LifeSceneId, media: LifeMedia, index: number): CSSProperties {
  const file = media.src.split('/').pop() ?? '';
  const position = media.kind === 'portrait'
    ? portraitPlacements[interest][index]
    : supplementalPlacements[file];
  const [x, y, width, height, rotation = 0] = position ?? [16 + (index % 4) * 23, 48 + Math.floor(index / 4) * 23, 18, 22, index % 2 ? 2 : -2];
  return { '--item-x': `${x}%`, '--item-y': `${y}%`, '--item-w': `${width}%`, '--item-h': `${height}%`, '--item-turn': `${rotation}deg` } as CSSProperties;
}
