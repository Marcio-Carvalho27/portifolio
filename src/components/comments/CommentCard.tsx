"use client";

import { useState } from "react";
import { Comment } from "@/src/data/comments";

interface Props {
  comment: Comment;
  index: number;
}

export function CommentCard({ comment, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid rgba(73,100,67,0.12)",
        borderRadius: "20px",
        padding: "24px 28px",
        boxShadow: "0 4px 24px rgba(73,100,67,0.08)",
        animation: `fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s both`,
        width: "100%",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
        <img
          src={comment.avatar}
          alt={comment.name}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
            border: "2px solid rgba(73,100,67,0.15)",
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#2d3b2c", margin: "0 0 3px" }}>
            {comment.name}
          </p>
          <p style={{ fontSize: "12px", color: "rgba(73,100,67,0.50)", margin: 0 }}>
            {comment.handle}
          </p>
        </div>

        <span
          style={{
            fontSize: "10px",
            background: "rgba(73,100,67,0.08)",
            color: "#496443",
            border: "1px solid rgba(73,100,67,0.15)",
            padding: "3px 10px",
            borderRadius: "999px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {comment.country}
        </span>
      </div>

      {/* Texto com collapse */}
      <div
        style={{
          fontSize: "13px",
          color: "rgba(73,100,67,0.68)",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
          overflow: "hidden",
          maxHeight: expanded ? "1000px" : "160px",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
          maskImage: expanded
            ? "none"
            : "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage: expanded
            ? "none"
            : "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      >
        "{comment.text}"
      </div>

      {/* Toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          marginTop: "12px",
          background: "none",
          border: "none",
          padding: 0,
          fontSize: "12px",
          color: "#496443",
          fontWeight: 600,
          cursor: "pointer",
          opacity: 0.8,
        }}
      >
        {expanded ? "Ver menos ↑" : "Ver mais ↓"}
      </button>
    </div>
  );
}