import type { Metadata } from 'next';
import { CommerceOSCase } from './CommerceOSCase';

export const metadata: Metadata = {
  title: '跨境经营舱 · Commerce OS | Violet Xie',
  description: '基于匿名经营场景构建的移动经营系统，连接销售、商品、库存、货源与补货决策。',
};

export default function CommerceOSPage() {
  return <CommerceOSCase />;
}
