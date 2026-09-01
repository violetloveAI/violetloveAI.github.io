import type { Metadata } from 'next';
import { EnterpriseSupportCase } from './EnterpriseSupportCase';

export const metadata: Metadata = {
  title: '企服智诊 · ERP 故障诊断助手 | Violet Xie',
  description: '基于企业软件支持经验设计的模拟 POC，用合成数据验证 ERP 诊断流程、证据展示与风险边界。',
};

export default function EnterpriseSupportPage() {
  return <EnterpriseSupportCase />;
}
