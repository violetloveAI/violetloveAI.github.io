import type { Metadata } from 'next';
import { QihengAuditCase } from './QihengAuditCase';

export const metadata: Metadata = {
  title: '启衡智审 · AI 报销审核工作台 | Violet Xie',
  description: '独立完成 AI 报销审核工作台，以四金额业务模型串起大模型预审、ERP 意见回写与飞书协同，300 张模拟单据通过写入与回读验证。',
};

export default function QihengAuditPage() {
  return <QihengAuditCase />;
}
