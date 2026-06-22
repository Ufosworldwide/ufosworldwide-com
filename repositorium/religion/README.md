# 2026-05-29T005713.237Z

Bunch of religion full texts

Generated 2026-06-22T22:59:16.032Z from `religion scripts.min.json` (`__data__.documents`)

**Totals:** 53 chapters · 46,736,459 words · 9 flagged for review

## Structure

- Each chapter lives in its own folder: `Chapter NN - Title/`
- `chapter.json` — title, tags, word/char counts, a quality flag, a short excerpt, and the full extracted text
- `chapter.txt` — the same text as plain UTF-8, for direct ingestion
- `00 - Index/index.json` — machine-readable manifest of every chapter
- `00 - Index/MANIFEST.md` — skim this first: every chapter with title, tags, word count, and an excerpt
- `00 - Index/thematic-index.json` — chapters grouped by tag

## How extraction works

Chapter text is pulled by walking each source object and collecting every string field of meaningful length — not a fixed field name. This is deliberate: source entries in this corpus don't share one schema, and locking onto a single field name silently drops content from entries that use a different one. Numbering and titles still come from the fields you mapped.

## Tags

- Unclassified: 53 chapters

## Needs review

These chapters came in under the word-count threshold. A short flag can mean either a genuinely short source text or an extraction gap — worth a manual check before treating these as complete:

- Chapter 1 — "1525 Second Rabbinic Bible v.2 - The_Second_Rabbinic_Bible 2_text.pdf" (9 words) — `Chapter 01 - 1525 Second Rabbinic Bible v.2 - The_Second_Rabbinic_Bible 2_text.pdf/`
- Chapter 5 — "The Egyptian Book of the Dead.pdf" (7 words) — `Chapter 05 - The Egyptian Book of the Dead.pdf/`
- Chapter 13 — "Secret of the Golden Flower - The Secret of the Golden Flower.pdf" (13 words) — `Chapter 13 - Secret of the Golden Flower - The Secret of the Golden Flower.pdf/`
- Chapter 14 — "Bhagavata Purana Gita Press - Bhagavata Purana - Gita Press_text.pdf" (11 words) — `Chapter 14 - Bhagavata Purana Gita Press - Bhagavata Purana - Gita Press_text.pdf/`
- Chapter 17 — "Mulamadhayamakakarika of Nagarjuna. Philosophy of the Middle Way - David J. Kalupahana - Mulamadhyamakakarika of Nagarjuna.pdf" (17 words) — `Chapter 17 - Mulamadhayamakakarika of Nagarjuna. Philosophy of the Middle Way - David J. Kalu/`
- Chapter 43 — "The Apocrypha_ Hidden Books of the Bible - The Apocrypha.pdf" (11 words) — `Chapter 43 - The Apocrypha_ Hidden Books of the Bible - The Apocrypha.pdf/`
- Chapter 45 — "The Apocrypha - de-kuiper-1974-the-apocrypha.pdf" (5 words) — `Chapter 45 - The Apocrypha - de-kuiper-1974-the-apocrypha.pdf/`
- Chapter 49 — "zhr0a 1..78 - 4810_Front_Matter.pdf" (5 words) — `Chapter 49 - zhr0a 1..78 - 4810_Front_Matter.pdf/`
- Chapter 51 — "The Talmud.pdf" (3 words) — `Chapter 51 - The Talmud.pdf/`
