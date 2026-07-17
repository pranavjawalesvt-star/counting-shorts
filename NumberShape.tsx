import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate } from "remotion";
import { NumberItem } from "./data";

export const NumberShape: React.FC<{ item: NumberItem }> = ({ item }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 8,
      stiffness: 120,
      mass: 0.6,
    },
  });

  const bob = Math.sin(frame / 8) * 6;

  const opacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111827",
        opacity,
      }}
    >
      <div
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          backgroundColor: item.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${bob}px) scale(${scale})`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <span
          style={{
            fontSize: 220,
            fontWeight: 800,
            color: "white",
            fontFamily: "Arial, sans-serif",
            textShadow: "0 6px 0 rgba(0,0,0,0.15)",
          }}
        >
          {item.value}
        </span>
      </div>

      <div
        style={{
          marginTop: 60,
          fontSize: 90,
          fontWeight: 900,
          color: "white",
          fontFamily: "Arial, sans-serif",
          transform: `scale(${scale})`,
          letterSpacing: 2,
        }}
      >
        {item.label}
      </div>
    </div>
  );
};
