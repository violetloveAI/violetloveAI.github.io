import type { Metadata } from 'next';
import OtherBuildsCase from './OtherBuildsCase';

export const metadata: Metadata = {
  title: '更多实验 · Other Builds | Violet Xie',
  description: '求职情报终端、此刻生活记录 App 与 Codex macOS 语音桌宠。',
};

export default function OtherBuildsPage() {
  return <OtherBuildsCase />;
}
