import type { Metadata } from 'next';
import { EnterpriseSupportCase } from './EnterpriseSupportCase';

export const metadata: Metadata = {
  title: '企服智诊 · ERP 故障诊断助手 | Violet Xie',
  description: '将一线 ERP 支持经验转化为诊断 POC，覆盖 6 类故障场景与 54 条评测案例，展示问题拆解、证据定位、处理建议及验收设计。',
};

export default function EnterpriseSupportPage() {
  return <EnterpriseSupportCase />;
}
