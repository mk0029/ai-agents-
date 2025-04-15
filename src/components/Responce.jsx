import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";

const Response = ({ responsesList, darkMode }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return responsesList.map((item, idx) => (
    <div
      key={idx}
      className={`p-6 rounded-lg shadow-lg transition-all duration-500 ${
        darkMode
          ? "bg-gray-800 text-gray-100"
          : "bg-white text-gray-800 border border-gray-300"
      }`}>
      <div className="mb-2 border-b pb-1 font-semibold text-purple-500">
        — {item.model}
      </div>

      <div className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const codeString = String(children).replace(/\n$/, "");
              const codeId = `code-${idx}-${language}-${codeString.length}`;

              return !inline ? (
                <div className="relative group my-8">
                  <div className="absolute -top-5 left-0 right-0 px-4 py-1 bg-gray-700 text-gray-300 text-xs rounded-t-lg flex items-center justify-between">
                    <span>{language || "plaintext"}</span>
                    <button
                      onClick={() => handleCopy(codeString, codeId)}
                      className="flex items-center text-gray-300 hover:text-white"
                      aria-label="Copy code">
                      {copiedId === codeId ? (
                        <>
                          <FiCheck className="mr-1" /> Copied
                        </>
                      ) : (
                        <>
                          <FiCopy className="mr-1" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <SyntaxHighlighter
                    language={language || "text"}
                    style={vscDarkPlus}
                    customStyle={{
                      marginTop: 0,
                      borderRadius: "0 0 0.5rem 0.5rem",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      marginBottom: 0,
                    }}
                    codeTagProps={{ className: "font-mono" }}
                    showLineNumbers={true}
                    wrapLines={true}>
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code
                  className={`${className} ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  } p-1 rounded`}
                  {...props}>
                  {children}
                </code>
              );
            },
            // Add custom handling for paragraphs to improve spacing around code blocks
            p({ node, children }) {
              return <p className="my-4">{children}</p>;
            },
            // Add custom handling for headings to improve spacing
            h1({ node, children }) {
              return <h1 className="mt-8 mb-4">{children}</h1>;
            },
            h2({ node, children }) {
              return <h2 className="mt-6 mb-3">{children}</h2>;
            },
            h3({ node, children }) {
              return <h3 className="mt-5 mb-2">{children}</h3>;
            },
            // Improve list spacing
            ul({ node, children }) {
              return <ul className="my-4 ml-6">{children}</ul>;
            },
            ol({ node, children }) {
              return <ol className="my-4 ml-6">{children}</ol>;
            },
            // Add spacing around blockquotes
            blockquote({ node, children }) {
              return (
                <blockquote className="my-6 pl-4 border-l-4 border-gray-300 italic">
                  {children}
                </blockquote>
              );
            },
          }}>
          {item.response}
        </ReactMarkdown>
      </div>
    </div>
  ));
};

export default Response;
