import React from "react";
import { Sequence, AbsoluteFill, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { numbersData, FRAMES_PER_NUMBER } from "./data";
import { NumberShape } from "./NumberShape";

const INTRO_FRAMES = 60; // 2 seconds
const OUTRO_FRAMES = 90; // 3 seconds

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 20], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 110,
          fontWeight: 900,
          color: "white",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          transform: `scale(${scale})`,
          padding: "0 60px",
        }}
      >
        Let's Count! 🔢
      </div>
    </AbsoluteFill>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 20], [0.7, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111827",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 90,
          fontWeight: 900,
          color: "white",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          transform: `scale(${scale})`,
          padding: "0 60px",
        }}
      >
        Can you count to 10? 🌟
      </div>
      <div
        style={{
          marginTop: 40,
          fontSize: 50,
          color: "#9CA3AF",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Subscribe for more! 🔔
      </div>
    </AbsoluteFill>
  );
};

export const CountingShorts: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111827" }}>
      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <Intro />
      </Sequence>

      {numbersData.map((item, i) => (
        <Sequence
          key={item.value}
          from={INTRO_FRAMES + i * FRAMES_PER_NUMBER}
          durationInFrames={FRAMES_PER_NUMBER}
        >
          <NumberShape item={item} />
          <Audio src={staticFile(`audio/number-${item.value}.wav`)} />
        </Sequence>
      ))}

      <Sequence
        from={INTRO_FRAMES + numbersData.length * FRAMES_PER_NUMBER}
        durationInFrames={OUTRO_FRAMES}
      >
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
