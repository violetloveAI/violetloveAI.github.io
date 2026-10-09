import type { Metadata } from 'next';
import { CommerceOSCase } from './CommerceOSCase';

export const metadata: Metadata = {
  title: '跨境经营舱 · Commerce OS | Violet Xie',
  description: '为 Depop 垂类头部卖家定制的移动经营工作台：管理 335 款商品，整合销售报表、库存状态与补货建议，展示从业务建模到产品交付的完整实践。',
};

export default function CommerceOSPage() {
  return <CommerceOSCase />;
}
