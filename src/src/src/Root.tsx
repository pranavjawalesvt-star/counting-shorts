import React from "react";
import { Composition } from "remotion";
import { CountingShorts } from "./CountingShorts";
import { numbersData, FRAMES_PER_NUMBER, FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "./data";

const INTRO_FRAMES = 60;
const OUTRO_FRAMES = 90;

const TOTAL_FRAMES =
  INTRO_FRAMES + numbersData.length * FRAMES_PER_NUMBER + OUTRO_FRAMES;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="CountingShorts"
        component={CountingShorts}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
