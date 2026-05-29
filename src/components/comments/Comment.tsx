"use client";

import { useEffect, useRef, useState } from "react";

import { comments } from "@/src/data/comments";
import { CommentCard } from "./CommentCard";

export function Comments() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(40px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0);    filter: blur(0);   }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="comments"
        className="bg-[#f6f8f5]"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            padding: "80px 48px",
            width: "100%",
            maxWidth: "1200px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          {comments.map((comment, i) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              index={visible ? i : -1}
            />
          ))}
        </div>
      </section>
    </>
  );
}