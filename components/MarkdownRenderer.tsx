import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  return (
    <div className="prose prose-invert max-w-none prose-headings:text-slate-50 prose-p:text-slate-100 prose-strong:text-slate-50 prose-li:marker:text-slate-400">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

