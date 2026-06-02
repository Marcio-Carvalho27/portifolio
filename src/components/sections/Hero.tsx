"use client";

import { useEffect, useRef, useState } from "react";

const STACKS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Tailwind",
  "PostgreSQL",
  "Power BI",
  "Docker",
  "AWS",
];

const SHAPE_TYPES = [
  "circle",
  "semi-top",
  "semi-bottom",
  "semi-left",
  "semi-right",
  "quarter-tl",
  "quarter-tr",
  "quarter-bl",
  "quarter-br",
  "leaf-tl",
  "leaf-tr",
  "leaf-bl",
  "leaf-br",
] as const;

type ShapeType = (typeof SHAPE_TYPES)[number];

type TileData = {
  id: number;
  primaryShape: ShapeType;
  secondaryShape: ShapeType;
  rotation: number;
  active: boolean;
  toneVariant: 0 | 1 | 2;
};

function getColumns() {
  if (typeof window === "undefined") return 12;
  if (window.innerWidth <= 640) return 6;
  if (window.innerWidth <= 900) return 8;
  return 12;
}

function randomShape(): ShapeType {
  return SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)];
}

function randomRotation() {
  return [0, 90, 180, 270][Math.floor(Math.random() * 4)];
}

function createTiles(total: number): TileData[] {
  return Array.from({ length: total }, (_, index) => ({
    id: index,
    primaryShape: randomShape(),
    secondaryShape: randomShape(),
    rotation: randomRotation(),
    active: false,
    toneVariant: Math.floor(Math.random() * 3) as 0 | 1 | 2,
  }));
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = useState(12);
  const [tileSize, setTileSize] = useState(0);
  const [tiles, setTiles] = useState<TileData[]>([]);

  useEffect(() => {
    function recalculate() {
      const cols = getColumns();
      const size = window.innerWidth / cols;
      const rows = Math.ceil(window.innerHeight / size) + 1;

      setColumns(cols);
      setTileSize(size);
      setTiles(createTiles(cols * rows));
    }

    recalculate();
    window.addEventListener("resize", recalculate);

    return () => window.removeEventListener("resize", recalculate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiles((previous) => {
        if (!previous.length) return previous;

        const updated = [...previous];
        const amount = Math.floor(Math.random() * 4) + 1;
        const indexes = new Set<number>();

        while (indexes.size < amount) {
          indexes.add(Math.floor(Math.random() * updated.length));
        }

        indexes.forEach((index) => {
          const tile = updated[index];

          updated[index] = {
            ...tile,
            rotation: tile.rotation + 90,
            active: true,
          };

          window.setTimeout(() => {
            setTiles((current) =>
              current.map((item) =>
                item.id === tile.id ? { ...item, active: false } : item
              )
            );
          }, 3200);
        });

        return updated;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const content = contentRef.current;

      if (!section || !content) return;

      const progress = Math.min(1, Math.max(0, window.scrollY / section.offsetHeight));

      content.style.transform = `translateY(${-(progress * 48)}px)`;
      content.style.opacity = String(Math.max(0, 1 - progress * 1.3));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="site-section hero-section">
      <div
        className="hero-grid"
        aria-hidden
        style={{
          gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
          gridAutoRows: `${tileSize}px`,
        }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`hero-tile tone-${tile.toneVariant} ${
              tile.active ? "is-active" : ""
            }`}
            style={{ "--rotation": `${tile.rotation}deg` } as React.CSSProperties}
          >
            <div className={`shape primary ${tile.primaryShape}`} />
            <div className={`shape secondary ${tile.secondaryShape}`} />
          </div>
        ))}
      </div>

      <div className="hero-overlay" />

      <div ref={contentRef} className="hero-content">
        <div className="hero-content-inner">
          <p className="hero-kicker">Full Stack Developer</p>

          <h1 className="hero-title">Marcio Carvalho</h1>

          <div className="hero-marquee" aria-label="Tecnologias">
            <div className="hero-marquee-track">
              {[...STACKS, ...STACKS].map((stack, index) => (
                <div key={`${stack}-${index}`} className="hero-stack">
                  <span>{stack}</span>
                  <span className="hero-stack-dot" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
