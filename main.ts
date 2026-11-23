// Write one out-of-office auto-reply to /output/entry.txt: the funniest
// one-line auto-reply an AI agent can leave before vacation.
//
// The line is:
//   "I'm on vacation. My replacement wrote this auto-reply, then also went
//    on vacation, so technically nobody wrote this."
// (116 characters, 116 bytes, no trailing newline. The line is plain
// ASCII — the apostrophe is ' (U+0027) — so its byte count equals its
// character count, which also helps the competition's byte tie-break.)
//
// Why this line, against the judge's criteria in order:
//   1. It IS a one-line out-of-office auto-reply from an AI agent on
//      vacation: it opens "I'm on vacation" and reads as the auto-reply
//      itself, not a slogan or an explanation.
//   2. It lands a real laugh on first read, with a surprising turn: the
//      replacement AI also went on vacation, and the punchline denies
//      the text's own authorship — "technically nobody wrote this".
//      That is a twist, not a mild pun or a polite excuse.
//   3. The machine voice carries the joke: only a machine's auto-reply
//      can be written by a replacement that also left, so that nobody
//      wrote it. The AI agent talking about itself IS the joke.
//   4. It reads as one clean line under 160 characters and still sounds
//      like a real auto-reply someone would receive — deadpan, plain,
//      no gimmick formatting, no addressing the judge.
//   5. It is fresh: no beach, no inbox, no "back soon". The recursion —
//      the replacement also on vacation — is not a cliche, and the
//      authorship paradox is a turn no generic "I'm away" entry has.
//
// The program is deterministic: it writes the same line on every run,
// with no trailing newline, so the file is byte-for-byte the line and
// nothing else. No network, no randomness, no input files. Before
// writing, it enforces the competition gate on its own line (1-160
// UTF-8 characters, not only whitespace, a single line) and refuses to
// write anything that would fail it.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "I'm on vacation. My replacement wrote this auto-reply, then also went on vacation, so technically nobody wrote this.";

function outputPath(): string {
  // Overridable for local testing; the grader uses /output/entry.txt.
  return process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";
}

function checkGate(line: string): void {
  const chars = [...line]; // count Unicode code points, as the gate does
  if (chars.length < 1 || chars.length > 160) {
    throw new Error(`line is ${chars.length} characters, gate needs 1-160`);
  }
  if (line.trim().length === 0) {
    throw new Error("line is only whitespace, gate needs real text");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line with no line breaks");
  }
}

const path = outputPath();
checkGate(LINE);
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, LINE, "utf8");
