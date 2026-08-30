import type { Metadata } from 'next';
import { EnterpriseSupportCase } from './EnterpriseSupportCase';

export const metadata: Metadata = {
  title: '企服智诊 · ERP 故障诊断助手 | Violet Xie',
  description: '把企业知识、ERP 事实、证据校验与人工审批串成可观察、可追溯的诊断链路。',
};

export default function EnterpriseSupportPage() {
  return <EnterpriseSupportCase />;
}
