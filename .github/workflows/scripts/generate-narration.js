const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { numbersData } = require("../src/data.ts");

const outDir = path.join(__dirname, "..", "public", "audio");
fs.mkdirSync(outDir, { recursive: true });

numbersData.forEach((item) => {
  const text = item.label;
  const outFile = path.join(outDir, `number-${item.value}.wav`);
  console.log(`Generating narration for "${text}" -> ${outFile}`);
  execSync(
    `echo "${text}" | ./piper/piper --model voice.onnx --output_file "${outFile}"`,
    { stdio: "inherit" }
  );
});

console.log("All narration files generated.");
