// haiku-debugging-20261124 — writes one 5-7-5 haiku about debugging to /output/entry.txt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

if (text.trim().length === 0 || text.length > 200) {
  console.error("entry.txt must be 1 to 200 characters of non-whitespace text");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Read back what we wrote so a partial write is never silent.
if (readFileSync(outPath, "utf8") !== text) {
  console.error("entry.txt was not written byte-identically");
  process.exit(1);
}
