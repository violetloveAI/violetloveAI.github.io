import type { Metadata } from 'next';
import { QihengAuditCase } from './QihengAuditCase';

export const metadata: Metadata = {
  title: '启衡智审 · AI 财务审核工作台 | Violet Xie',
  description: '在模拟企业 ERP 环境中，把 AI 预审核、意见回写、飞书协同与人工复核串成可追踪闭环。',
};

export default function QihengAuditPage() {
  return <QihengAuditCase />;
}
