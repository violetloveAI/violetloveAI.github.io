import type { Metadata } from 'next';
import { CommerceOSCase } from './CommerceOSCase';

export const metadata: Metadata = {
  title: '跨境经营舱 · Commerce OS | Violet Xie',
  description: '基于匿名经营场景：导入脱敏文件生成经营报表，货源与补货链路仍在验证。',
};

export default function CommerceOSPage() {
  return <CommerceOSCase />;
}
