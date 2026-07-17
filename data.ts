// This file defines the sequence of numbers shown in the short.
// A daily automation script (Groq-generated) can overwrite this file
// before render to change colors/labels without touching animation code.

export type NumberItem = {
  value: number;
  label: string; // e.g. "One", "Two"
  color: string; // hex color for the shape
};

export const numbersData: NumberItem[] = [
  { value: 1, label: "One", color: "#FF6B6B" },
  { value: 2, label: "Two", color: "#FFD93D" },
  { value: 3, label: "Three", color: "#6BCB77" },
  { value: 4, label: "Four", color: "#4D96FF" },
  { value: 5, label: "Five", color: "#B983FF" },
  { value: 6, label: "Six", color: "#FF922B" },
  { value: 7, label: "Seven", color: "#20C997" },
  { value: 8, label: "Eight", color: "#F06595" },
  { value: 9, label: "Nine", color: "#22B8CF" },
  { value: 10, label: "Ten", color: "#845EF7" },
];

// How many frames (at 30fps) each number is shown on screen.
// 90 frames = 3 seconds per number.
export const FRAMES_PER_NUMBER = 90;
export const FPS = 30;
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
