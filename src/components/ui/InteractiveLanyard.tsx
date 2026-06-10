"use client";

import { useEffect, useRef } from "react";

import { useLanguage } from "@/src/context/LanguageContext";

type Point = {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  pinned: boolean;
};

const SEGMENTS = 10;
const CONSTRAINT_ITERATIONS = 52;
const GRAVITY = 0.34;
const DAMPING = 0.995;
const BEND_STIFFNESS = 0.22;
const MAX_STRETCH = 1.08;

export function InteractiveLanyard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { t } = useLanguage();
  const role = t("hero.role");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    let width = 0;
    let height = 0;
    let strapLength = 0;
    let segmentLength = 0;
    let cardWidth = 0;
    let cardHeight = 0;
    let stretch = 1;
    let animationFrame = 0;
    let dragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let points: Point[] = [];
    const profileImage = new window.Image();

    profileImage.src = "/profile.png";

    const cardPoint = () => points[points.length - 1];

    const getAnchorX = () => {
      if (width <= 768) {
        return width * 0.56;
      }

      return Math.min(470, Math.max(300, width * 0.32));
    };

    const resetPoints = () => {
      const anchorX = getAnchorX();
      cardWidth =
        width <= 768
          ? Math.min(282, Math.max(242, width * 0.7))
          : 332;
      cardHeight = cardWidth * 1.34;
      strapLength = Math.min(
        Math.max(height * 0.34, 190),
        Math.min(290, height - cardHeight - 42),
      );
      segmentLength = strapLength / SEGMENTS;

      points = Array.from({ length: SEGMENTS + 1 }, (_, index) => {
        const y = index * segmentLength;

        return {
          x: anchorX,
          y,
          previousX: anchorX - Math.sin(index * 0.3) * 0.15,
          previousY: y - 0.1,
          pinned: index === 0,
        };
      });
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      resetPoints();
    };

    const getPointerPosition = (event: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const pointer =
        "touches" in event ? event.touches[0] ?? event.changedTouches[0] : event;

      return {
        x: pointer.clientX - rect.left,
        y: pointer.clientY - rect.top,
      };
    };

    const isBadgeHit = (x: number, y: number) => {
      const point = cardPoint();
      const badgeTop = point.y - 8;

      return (
        x >= point.x - cardWidth / 2 &&
        x <= point.x + cardWidth / 2 &&
        y >= badgeTop &&
        y <= badgeTop + cardHeight
      );
    };

    const startDragging = (event: MouseEvent | TouchEvent) => {
      const pointer = getPointerPosition(event);

      if (!isBadgeHit(pointer.x, pointer.y)) {
        return;
      }

      event.preventDefault();
      dragging = true;
      const point = cardPoint();
      dragOffsetX = pointer.x - point.x;
      dragOffsetY = pointer.y - point.y;
      canvas.classList.add("is-dragging");
    };

    const moveBadge = (event: MouseEvent | TouchEvent) => {
      if (!dragging) {
        return;
      }

      event.preventDefault();
      const pointer = getPointerPosition(event);
      const point = cardPoint();
      const horizontalLimit = cardWidth * 0.52;
      const anchorX = getAnchorX();
      const requestedX = Math.min(
        width - horizontalLimit,
        Math.max(horizontalLimit, pointer.x - dragOffsetX),
      );
      const requestedY = Math.min(
        height - cardHeight - 34,
        Math.max(90, pointer.y - dragOffsetY),
      );
      const deltaX = requestedX - anchorX;
      const deltaY = requestedY;
      const requestedDistance = Math.hypot(deltaX, deltaY) || 1;
      const maximumDistance = strapLength * MAX_STRETCH;
      const distanceScale = Math.min(1, maximumDistance / requestedDistance);

      // A small amount of stretch keeps the interaction physical without
      // making the woven strap behave like an elastic cord.
      stretch = Math.max(
        1,
        Math.min(MAX_STRETCH, requestedDistance / strapLength),
      );
      point.x = anchorX + deltaX * distanceScale;
      point.y = deltaY * distanceScale;
      point.previousX = point.x;
      point.previousY = point.y;
    };

    const stopDragging = () => {
      dragging = false;
      canvas.classList.remove("is-dragging");
    };

    const simulate = () => {
      const anchorX = getAnchorX();

      if (!dragging && stretch > 1) {
        stretch += (1 - stretch) * 0.18;

        if (stretch < 1.0005) {
          stretch = 1;
        }
      }

      for (const point of points) {
        if (point.pinned || (dragging && point === cardPoint())) {
          continue;
        }

        const velocityX = (point.x - point.previousX) * DAMPING;
        const velocityY = (point.y - point.previousY) * DAMPING;

        point.previousX = point.x;
        point.previousY = point.y;
        point.x += velocityX;
        point.y += velocityY + GRAVITY;
      }

      for (let iteration = 0; iteration < CONSTRAINT_ITERATIONS; iteration += 1) {
        for (let index = 0; index < points.length - 1; index += 1) {
          const current = points[index];
          const next = points[index + 1];
          const deltaX = next.x - current.x;
          const deltaY = next.y - current.y;
          const distance = Math.hypot(deltaX, deltaY) || 0.001;
          const activeSegmentLength = segmentLength * stretch;
          const correction = (distance - activeSegmentLength) / distance;

          if (!current.pinned) {
            current.x += deltaX * correction * 0.5;
            current.y += deltaY * correction * 0.5;
          }

          if (!next.pinned && !(dragging && next === cardPoint())) {
            next.x -= deltaX * correction * 0.5;
            next.y -= deltaY * correction * 0.5;
          }
        }

        if (iteration % 4 === 0) {
          for (let index = 1; index < points.length - 1; index += 1) {
            const previous = points[index - 1];
            const current = points[index];
            const next = points[index + 1];
            const midpointX = (previous.x + next.x) / 2;
            const midpointY = (previous.y + next.y) / 2;

            current.x += (midpointX - current.x) * BEND_STIFFNESS;
            current.y += (midpointY - current.y) * BEND_STIFFNESS;
          }
        }

        points[0].x = anchorX;
        points[0].y = 0;
      }
    };

    const drawRoundedRect = (
      x: number,
      y: number,
      rectWidth: number,
      rectHeight: number,
      radius: number,
    ) => {
      context.beginPath();
      context.roundRect(x, y, rectWidth, rectHeight, radius);
    };

    const drawCoverImage = (
      image: HTMLImageElement,
      x: number,
      y: number,
      targetWidth: number,
      targetHeight: number,
    ) => {
      if (!image.complete || !image.naturalWidth) {
        return;
      }

      const scale = Math.max(
        targetWidth / image.naturalWidth,
        targetHeight / image.naturalHeight,
      );
      const sourceWidth = targetWidth / scale;
      const sourceHeight = targetHeight / scale;
      const sourceX = (image.naturalWidth - sourceWidth) / 2;
      const sourceY = Math.max(
        0,
        (image.naturalHeight - sourceHeight) * 0.16,
      );

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        targetWidth,
        targetHeight,
      );
    };

    const drawStrapLabel = () => {
      const label = "MARCIO CARVALHO";
      const cumulativeLengths = [0];

      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const current = points[index];
        const length = Math.hypot(
          current.x - previous.x,
          current.y - previous.y,
        );

        cumulativeLengths.push(cumulativeLengths[index - 1] + length);
      }

      const totalLength = cumulativeLengths[cumulativeLengths.length - 1];
      const labelSpacing = 118;
      const firstLabelPosition = 58;
      const endClearance = 88;
      const stretchOffset = Math.max(0, totalLength - strapLength);
      const labelCount = Math.max(
        0,
        Math.floor(
          (strapLength - endClearance - firstLabelPosition) / labelSpacing,
        ) + 1,
      );

      context.save();
      context.fillStyle = "rgba(232, 240, 226, 0.9)";
      context.font = '700 8px "DM Mono", monospace';
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let labelIndex = 0; labelIndex < labelCount; labelIndex += 1) {
        const nominalPosition =
          firstLabelPosition + labelIndex * labelSpacing;
        // Stretch moves the existing print down as one set. The lower end
        // stays intentionally blank, so no new label appears near the clip.
        const targetLength = nominalPosition + stretchOffset;
        let segmentIndex = 1;

        while (
          segmentIndex < cumulativeLengths.length - 1 &&
          cumulativeLengths[segmentIndex] < targetLength
        ) {
          segmentIndex += 1;
        }

        const start = points[segmentIndex - 1];
        const end = points[segmentIndex];
        const segmentStart = cumulativeLengths[segmentIndex - 1];
        const segmentDistance =
          cumulativeLengths[segmentIndex] - segmentStart || 1;
        const progress = (targetLength - segmentStart) / segmentDistance;
        const x = start.x + (end.x - start.x) * progress;
        const y = start.y + (end.y - start.y) * progress;
        const angle = Math.atan2(end.y - start.y, end.x - start.x);

        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.fillText(label, 0, 0);
        context.restore();
      }

      context.restore();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const lastPoint = cardPoint();
      const badgeTop = lastPoint.y - 8;

      // Layered strokes give the cord the width and depth of a woven shoulder strap.
      context.lineCap = "butt";
      context.lineJoin = "round";
      context.strokeStyle = "#142c1d";
      context.lineWidth = 28;
      context.beginPath();
      context.moveTo(points[0].x, -32);

      for (let index = 1; index < points.length; index += 1) {
        context.lineTo(points[index].x, points[index].y);
      }

      context.stroke();
      context.strokeStyle = "#315f3c";
      context.lineWidth = 23;
      context.stroke();
      context.strokeStyle = "rgba(166, 199, 151, 0.2)";
      context.lineWidth = 18;
      context.stroke();
      drawStrapLabel();

      context.save();
      context.shadowColor = "rgba(64, 112, 72, 0.38)";
      context.shadowBlur = 38;
      context.shadowOffsetY = 18;
      context.fillStyle = "#e5e8e4";
      drawRoundedRect(
        lastPoint.x - cardWidth / 2,
        badgeTop,
        cardWidth,
        cardHeight,
        9,
      );
      context.fill();
      context.restore();

      const cardLeft = lastPoint.x - cardWidth / 2;
      const cardRadius = 8;

      // Static, light-gray version of the Hero's geometric tile language.
      context.save();
      drawRoundedRect(cardLeft, badgeTop, cardWidth, cardHeight, cardRadius);
      context.clip();
      context.fillStyle = "rgba(174, 183, 173, 0.28)";
      context.beginPath();
      context.arc(
        cardLeft + cardWidth * 0.82,
        badgeTop + cardHeight * 0.16,
        cardWidth * 0.3,
        0,
        Math.PI * 2,
      );
      context.fill();
      context.fillStyle = "rgba(193, 199, 191, 0.48)";
      context.beginPath();
      context.arc(
        cardLeft + cardWidth * 0.68,
        badgeTop + cardHeight,
        cardWidth * 0.42,
        Math.PI,
        Math.PI * 2,
      );
      context.fill();
      context.fillStyle = "rgba(153, 164, 153, 0.14)";
      context.fillRect(
        cardLeft + cardWidth * 0.5,
        badgeTop,
        1,
        cardHeight,
      );
      context.fillRect(
        cardLeft,
        badgeTop + cardHeight * 0.5,
        cardWidth,
        1,
      );

      const surfaceLight = context.createLinearGradient(
        cardLeft,
        badgeTop,
        cardLeft + cardWidth,
        badgeTop + cardHeight,
      );
      surfaceLight.addColorStop(0, "rgba(255, 255, 255, 0.62)");
      surfaceLight.addColorStop(0.32, "rgba(255, 255, 255, 0.08)");
      surfaceLight.addColorStop(0.68, "rgba(105, 131, 105, 0.04)");
      surfaceLight.addColorStop(1, "rgba(255, 255, 255, 0.3)");
      context.fillStyle = surfaceLight;
      context.fillRect(cardLeft, badgeTop, cardWidth, cardHeight);

      const glow = context.createRadialGradient(
        cardLeft + cardWidth * 0.14,
        badgeTop + cardHeight * 0.08,
        0,
        cardLeft + cardWidth * 0.14,
        badgeTop + cardHeight * 0.08,
        cardWidth * 0.72,
      );
      glow.addColorStop(0, "rgba(255, 255, 255, 0.72)");
      glow.addColorStop(0.34, "rgba(216, 230, 211, 0.2)");
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = glow;
      context.fillRect(cardLeft, badgeTop, cardWidth, cardHeight);
      context.restore();

      context.strokeStyle = "rgba(55, 72, 58, 0.28)";
      context.lineWidth = 1;
      drawRoundedRect(
        cardLeft,
        badgeTop,
        cardWidth,
        cardHeight,
        cardRadius,
      );
      context.stroke();

      // Narrow specular highlight gives the card a polished acrylic edge.
      context.save();
      drawRoundedRect(
        cardLeft + 2,
        badgeTop + 2,
        cardWidth - 4,
        cardHeight - 4,
        cardRadius - 1,
      );
      context.clip();
      const edgeLight = context.createLinearGradient(
        cardLeft,
        badgeTop,
        cardLeft + cardWidth * 0.45,
        badgeTop + cardHeight * 0.22,
      );
      edgeLight.addColorStop(0, "rgba(255, 255, 255, 0.72)");
      edgeLight.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.strokeStyle = edgeLight;
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(cardLeft + 12, badgeTop + 3);
      context.lineTo(cardLeft + cardWidth * 0.58, badgeTop + 3);
      context.stroke();
      context.restore();

      const innerPadding = cardWidth * 0.07;
      const photoWidth = cardWidth * 0.64;
      const photoHeight = photoWidth * (4 / 3);
      const photoX = lastPoint.x - photoWidth / 2;
      const photoY = badgeTop + innerPadding;

      context.save();
      drawRoundedRect(photoX, photoY, photoWidth, photoHeight, 6);
      context.clip();
      context.fillStyle = "#cbd1ca";
      context.fillRect(photoX, photoY, photoWidth, photoHeight);
      drawCoverImage(
        profileImage,
        photoX,
        photoY,
        photoWidth,
        photoHeight,
      );
      context.restore();

      context.strokeStyle = "rgba(55, 72, 58, 0.18)";
      context.lineWidth = 1;
      drawRoundedRect(photoX, photoY, photoWidth, photoHeight, 6);
      context.stroke();

      const textX = lastPoint.x;
      const textY = photoY + photoHeight + cardHeight * 0.07;
      context.textAlign = "center";
      context.fillStyle = "#1c281f";
      context.font = `700 ${Math.max(20, cardWidth * 0.095)}px "Space Grotesk", sans-serif`;
      context.fillText("Marcio", textX, textY);
      context.fillText("Carvalho", textX, textY + cardWidth * 0.105);
      context.fillStyle = "rgba(28, 40, 31, 0.62)";
      context.font = `600 ${Math.max(9, cardWidth * 0.04)}px "DM Mono", monospace`;
      context.fillText(
        role.toUpperCase(),
        textX,
        textY + cardWidth * 0.19,
      );

      context.fillStyle = "#315f3c";
      context.fillRect(
        lastPoint.x - cardWidth * 0.09,
        badgeTop + cardHeight - innerPadding - 4,
        cardWidth * 0.18,
        3,
      );
    };

    const loop = () => {
      simulate();
      draw();
      animationFrame = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);
    resizeCanvas();
    loop();

    canvas.addEventListener("mousedown", startDragging);
    window.addEventListener("mousemove", moveBadge);
    window.addEventListener("mouseup", stopDragging);
    canvas.addEventListener("touchstart", startDragging, { passive: false });
    canvas.addEventListener("touchmove", moveBadge, { passive: false });
    canvas.addEventListener("touchend", stopDragging);
    canvas.addEventListener("touchcancel", stopDragging);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousedown", startDragging);
      window.removeEventListener("mousemove", moveBadge);
      window.removeEventListener("mouseup", stopDragging);
      canvas.removeEventListener("touchstart", startDragging);
      canvas.removeEventListener("touchmove", moveBadge);
      canvas.removeEventListener("touchend", stopDragging);
      canvas.removeEventListener("touchcancel", stopDragging);
    };
  }, [role]);

  return (
    <div className="interactive-lanyard">
      <canvas
        ref={canvasRef}
        aria-label={t("about.lanyardLabel")}
      />
    </div>
  );
}
