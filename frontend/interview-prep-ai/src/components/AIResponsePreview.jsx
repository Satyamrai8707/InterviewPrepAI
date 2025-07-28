import React, { useState } from "react";
// import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import { FiCopy, FiCheck, FiCode } from "react-icons/fi";

import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-sm prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkDown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !className;
              return !isInline ? (
                <Codeblock code={String(children).replace(/\n$/, "")} language={language} />
              ) : (
                <code
                  className="px-1 py-0.5 bg-gray-200 text-gray-800 rounded text-xs font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 bg-gray-50 py-2 px-3 rounded">
                {children}
              </blockquote>
            ),
            h1: ({ children }) => <h1 className="text-3xl font-bold mt-6 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>,
            h4: ({ children }) => <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>,
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-4 rounded border border-gray-200">
                <table className="min-w-full divide-y divide-gray-300">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
            tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
            tr: ({ children }) => <tr>{children}</tr>,
            th: ({ children }) => (
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-800">{children}</td>
            ),
            hr: () => <hr className="my-6 border-gray-300" />,
            img: ({ src, alt }) => (
              <img src={src} alt={alt} className="my-4 max-w-full rounded-lg shadow-sm" />
            ),
          }}
        >
          {content}
        </ReactMarkDown>
      </div>
    </div>
  );
};


function Codeblock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-gray-600 text-sm font-medium">
          <FiCode size={16} />
          <span className="uppercase tracking-wide">{language || "Code"}</span>
        </div>
        <button
          onClick={copyCode}
          disabled={copied}
          className="relative flex items-center space-x-1 text-gray-500 hover:text-black transition duration-200 group"
          aria-label="Copy code"
        >
          {copied ? <FiCheck size={16} className="text-green-600" /> : <FiCopy size={16} />}
          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: 13,
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}


export default AIResponsePreview;
