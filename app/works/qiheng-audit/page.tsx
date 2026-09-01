import type { Metadata } from 'next';
import { QihengAuditCase } from './QihengAuditCase';

export const metadata: Metadata = {
  title: '启衡智审 · AI 报销审核工作台 | Violet Xie',
  description: '观猹 FDE 课程个人项目：在模拟 ERP 环境中完成大模型预审、意见回写、飞书协同与人工复核。',
};

export default function QihengAuditPage() {
  return <QihengAuditCase />;
}
