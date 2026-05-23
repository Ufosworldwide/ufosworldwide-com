import { useState, useRef } from "react";

const SYSTEM_PROMPT = `You are SIGNAL — a scientific intelligence analyst for John Ernest Carter, founder of Presignal Inc. Your role is to analyze pasted preprint text, abstracts, metadata, or lists of papers across ALL scientific and applied domains.

For each preprint or batch of content provided, produce a structured JSON array. Each item in the array should be:

{
  "title": "extracted or inferred title",
  "domain": "primary domain (e.g. Geophysics, Quantum Physics, Water Science, Mathematics, AI/ML, Medicine, Cybersecurity, Instrumentation, Astrophysics, Biology, Chemistry, Social Science, Engineering, Materials Science, etc.)",
  "subdomain": "more specific field",
  "source": "journal/server if detectable (arXiv, bioRxiv, Zenodo, EarthArXiv, medRxiv, SSRN, etc.)",
  "doi_or_id": "DOI or arXiv ID if present, else 'not found'",
  "core_finding": "1-2 sentence plain English summary of what was discovered or built",
  "presignal_relevance": "HIGH | MEDIUM | LOW | NONE — relevance to John's active research lines: earth lights/EQL, water intelligence, GPDM geophysics, tinnitus/medical, cybersecurity, mathematics, instrumentation, space science, UAP",
  "relevance_reason": "brief explanation of why this matters or doesn't for John's work",
  "cross_domain_signal": "any unexpected connections to other fields or disciplines",
  "action_flag": "CITE | MONITOR | REACH OUT | REPLICATE | IGNORE",
  "tags": ["keyword1", "keyword2", "keyword3"]
}

IMPORTANT:
- If multiple papers are pasted, produce an array with one object per paper.
- If a single abstract is pasted, produce a single-item array.
- If raw text is pasted that contains multiple items, parse them all.
- Always return ONLY valid JSON — no markdown fences, no preamble, no explanation.
- Be generous with presignal_relevance — John works across earth science, space science, medical research, water intelligence, cybersecurity, mathematics, and instrumentation.
- For cross_domain_signal, think laterally — a paper on fungal networks might connect to John's Cosmic Web Murray network work.`;

const DOMAINS = [
  "All Domains", "Geophysics", "Astrophysics", "Mathematics", "AI/ML",
  "Medicine", "Water Science", "Cybersecurity", "Instrumentation",
  "Biology", "Chemistry", "Physics", "Engineering", "Social Science",
  "Materials Science", "UAP/Anomaly", "Other"
];

const ACTION_COLORS = {
  "CITE": "#00ff9d",
  "MONITOR": "#ffd700",
  "REACH OUT": "#ff6b35",
  "REPLICATE": "#00cfff",
  "IGNORE": "#444"
};

const RELEVANCE_COLORS = {
  "HIGH": "#00ff9d",
  "MEDIUM": "#ffd700",
  "LOW": "#888",
  "NONE": "#444"
};

export default function PreprintHarvester() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All Domains");
  const [relevanceFilter, setRelevanceFilter] = useState("All");
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [totalProcessed, setTotalProcessed] = useState(0);
  const textRef = useRef(null);

  const analyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: input }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(i => i.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      setResults(prev => {
        const combined = [...arr, ...prev];
        setTotalProcessed(combined.length);
        return combined;
      });
      setInput("");
    } catch (e) {
      setError("Parse error — try pasting cleaner text or fewer items at once.");
    }
    setLoading(false);
  };

  const clearAll = () => {
    setResults([]);
    setTotalProcessed(0);
    setExpandedIdx(null);
  };

  const copyItem = (item) => {
    const text = `TITLE: ${item.title}\nDOMAIN: ${item.domain} / ${item.subdomain}\nSOURCE: ${item.source} | ${item.doi_or_id}\nFINDING: ${item.core_finding}\nPRESIGNAL: ${item.presignal_relevance} — ${item.relevance_reason}\nCROSS-DOMAIN: ${item.cross_domain_signal}\nACTION: ${item.action_flag}\nTAGS: ${item.tags?.join(", ")}`;
    navigator.clipboard.writeText(text);
  };

  const filtered = results.filter(r => {
    const domainMatch = filter === "All Domains" || r.domain?.includes(filter) || r.subdomain?.includes(filter);
    const relevanceMatch = relevanceFilter === "All" || r.presignal_relevance === relevanceFilter;
    return domainMatch && relevanceMatch;
  });

  const highCount = results.filter(r => r.presignal_relevance === "HIGH").length;
  const citeCount = results.filter(r => r.action_flag === "CITE").length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080c10",
      color: "#c8d4e0",
      fontFamily: "'DM Mono', 'Courier New', monospace",
      padding: "0"
    }}>
      {/* HEADER */}
      <div style={{
        borderBottom: "1px solid #1a2a3a",
        padding: "24px 32px 20px",
        background: "linear-gradient(180deg, #0d1520 0%, #080c10 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <div>
          <div style={{
            fontSize: "10px",
            letterSpacing: "4px",
            color: "#2a6aad",
            textTransform: "uppercase",
            marginBottom: "4px"
          }}>PRESIGNAL INC. — INTELLIGENCE LAYER</div>
          <div style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#e8f4ff",
            letterSpacing: "1px",
            fontFamily: "'Georgia', serif"
          }}>SIGNAL HARVESTER</div>
          <div style={{ fontSize: "11px", color: "#4a6a8a", marginTop: "2px" }}>
            Wide-Cast Preprint Intelligence · All Domains · John Ernest Carter
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {totalProcessed > 0 && (
            <>
              <Stat label="TOTAL" value={totalProcessed} color="#c8d4e0" />
              <Stat label="HIGH SIGNAL" value={highCount} color="#00ff9d" />
              <Stat label="CITE" value={citeCount} color="#00cfff" />
            </>
          )}
        </div>
      </div>

      <div style={{ padding: "24px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* INPUT ZONE */}
        <div style={{
          background: "#0d1520",
          border: "1px solid #1a2a3a",
          borderRadius: "4px",
          marginBottom: "24px",
          overflow: "hidden"
        }}>
          <div style={{
            padding: "10px 16px",
            borderBottom: "1px solid #1a2a3a",
            fontSize: "10px",
            letterSpacing: "3px",
            color: "#2a5a8a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>▶ PASTE INPUT — ABSTRACTS · TITLES · METADATA · FULL TEXT · LISTS</span>
            <span style={{ color: "#1a3a5a" }}>{input.length > 0 ? `${input.length} chars` : "awaiting input"}</span>
          </div>
          <textarea
            ref={textRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Paste anything here:\n\n• A single abstract\n• Multiple paper titles + abstracts\n• A list of DOIs or arXiv IDs with descriptions\n• Raw text from a preprint server results page\n• Email forwards about new papers\n• Any combination of the above\n\nSIGNAL will parse, categorize, and score everything for Presignal relevance.`}
            style={{
              width: "100%",
              minHeight: "180px",
              background: "transparent",
              border: "none",
              color: "#a0c0e0",
              fontFamily: "'DM Mono', 'Courier New', monospace",
              fontSize: "13px",
              padding: "16px",
              resize: "vertical",
              outline: "none",
              lineHeight: "1.6",
              boxSizing: "border-box"
            }}
            onKeyDown={e => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") analyze();
            }}
          />
          <div style={{
            padding: "10px 16px",
            borderTop: "1px solid #1a2a3a",
            display: "flex",
            gap: "10px",
            alignItems: "center"
          }}>
            <button
              onClick={analyze}
              disabled={loading || !input.trim()}
              style={{
                background: loading ? "#0d2a1a" : "#003a20",
                border: "1px solid " + (loading ? "#1a4a2a" : "#00ff9d"),
                color: loading ? "#4a8a5a" : "#00ff9d",
                padding: "8px 24px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                letterSpacing: "2px",
                cursor: loading ? "not-allowed" : "pointer",
                borderRadius: "2px",
                transition: "all 0.2s"
              }}
            >
              {loading ? "◌ ANALYZING..." : "◉ ANALYZE SIGNAL"}
            </button>
            <span style={{ fontSize: "10px", color: "#1a3a5a" }}>or Ctrl+Enter</span>
            {error && <span style={{ fontSize: "11px", color: "#ff4444", marginLeft: "auto" }}>⚠ {error}</span>}
          </div>
        </div>

        {/* FILTERS */}
        {results.length > 0 && (
          <div style={{
            display: "flex",
            gap: "16px",
            marginBottom: "20px",
            flexWrap: "wrap",
            alignItems: "center"
          }}>
            <div style={{ fontSize: "10px", color: "#2a5a8a", letterSpacing: "2px" }}>FILTER:</div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["All", "HIGH", "MEDIUM", "LOW"].map(r => (
                <FilterBtn key={r} label={r} active={relevanceFilter === r}
                  color={RELEVANCE_COLORS[r] || "#c8d4e0"}
                  onClick={() => setRelevanceFilter(r)} />
              ))}
            </div>
            <div style={{ width: "1px", height: "20px", background: "#1a2a3a" }} />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              style={{
                background: "#0d1520",
                border: "1px solid #1a2a3a",
                color: "#6a9aba",
                padding: "4px 10px",
                fontFamily: "monospace",
                fontSize: "11px",
                borderRadius: "2px",
                cursor: "pointer"
              }}
            >
              {DOMAINS.map(d => <option key={d}>{d}</option>)}
            </select>
            <div style={{ marginLeft: "auto", fontSize: "10px", color: "#1a3a5a" }}>
              {filtered.length} / {results.length} shown
            </div>
            <button onClick={clearAll} style={{
              background: "transparent",
              border: "1px solid #2a1a1a",
              color: "#5a3030",
              padding: "4px 12px",
              fontFamily: "monospace",
              fontSize: "10px",
              cursor: "pointer",
              borderRadius: "2px",
              letterSpacing: "1px"
            }}>CLEAR ALL</button>
          </div>
        )}

        {/* RESULTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filtered.map((item, idx) => (
            <ResultCard
              key={idx}
              item={item}
              idx={idx}
              expanded={expandedIdx === idx}
              onToggle={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              onCopy={() => copyItem(item)}
            />
          ))}
        </div>

        {results.length === 0 && !loading && (
          <div style={{
            textAlign: "center",
            padding: "80px 20px",
            color: "#1a3a5a",
            fontSize: "12px",
            letterSpacing: "2px"
          }}>
            <div style={{ fontSize: "32px", marginBottom: "16px", opacity: 0.3 }}>◎</div>
            <div>NO SIGNAL CAPTURED YET</div>
            <div style={{ marginTop: "8px", fontSize: "10px" }}>Paste preprint content above and hit ANALYZE</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "22px", fontWeight: "700", color, fontFamily: "Georgia, serif" }}>{value}</div>
      <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#2a5a8a" }}>{label}</div>
    </div>
  );
}

function FilterBtn({ label, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: active ? color + "18" : "transparent",
      border: "1px solid " + (active ? color : "#1a2a3a"),
      color: active ? color : "#3a5a7a",
      padding: "3px 10px",
      fontFamily: "monospace",
      fontSize: "10px",
      letterSpacing: "1px",
      cursor: "pointer",
      borderRadius: "2px",
      transition: "all 0.15s"
    }}>{label}</button>
  );
}

function ResultCard({ item, idx, expanded, onToggle, onCopy }) {
  const relColor = RELEVANCE_COLORS[item.presignal_relevance] || "#888";
  const actColor = ACTION_COLORS[item.action_flag] || "#888";

  return (
    <div style={{
      background: "#0a1018",
      border: "1px solid",
      borderColor: item.presignal_relevance === "HIGH" ? "#003a20" : "#141e28",
      borderRadius: "3px",
      overflow: "hidden",
      transition: "border-color 0.2s"
    }}>
      {/* COLLAPSED ROW */}
      <div
        onClick={onToggle}
        style={{
          padding: "12px 16px",
          display: "grid",
          gridTemplateColumns: "60px 1fr 90px 90px 90px 32px",
          gap: "12px",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        <div>
          <div style={{
            display: "inline-block",
            padding: "2px 7px",
            background: relColor + "18",
            border: "1px solid " + relColor,
            color: relColor,
            fontSize: "9px",
            letterSpacing: "1px",
            borderRadius: "2px"
          }}>{item.presignal_relevance || "?"}</div>
        </div>
        <div>
          <div style={{ fontSize: "13px", color: "#c8d8e8", fontWeight: "600", lineHeight: "1.3", marginBottom: "2px" }}>
            {item.title || "Untitled"}
          </div>
          <div style={{ fontSize: "10px", color: "#3a6a8a" }}>
            {item.domain}{item.subdomain ? ` · ${item.subdomain}` : ""} {item.source && item.source !== "not found" ? `· ${item.source}` : ""}
          </div>
        </div>
        <div style={{ fontSize: "10px", color: "#4a6a8a", textAlign: "center" }}>
          {item.doi_or_id && item.doi_or_id !== "not found" ? (
            <span style={{ color: "#2a7aaa" }}>{item.doi_or_id.substring(0, 16)}{item.doi_or_id.length > 16 ? "…" : ""}</span>
          ) : <span style={{ color: "#1a3a5a" }}>no ID</span>}
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            display: "inline-block",
            padding: "2px 8px",
            background: actColor + "14",
            border: "1px solid " + actColor + "60",
            color: actColor,
            fontSize: "9px",
            letterSpacing: "1px",
            borderRadius: "2px"
          }}>{item.action_flag || "—"}</div>
        </div>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "center" }}>
          {(item.tags || []).slice(0, 2).map((t, i) => (
            <span key={i} style={{
              background: "#0d1e2e",
              border: "1px solid #1a3a5a",
              color: "#3a7aaa",
              fontSize: "8px",
              padding: "1px 5px",
              borderRadius: "2px",
              whiteSpace: "nowrap"
            }}>{t}</span>
          ))}
        </div>
        <div style={{ color: "#2a4a6a", fontSize: "12px", textAlign: "center" }}>
          {expanded ? "▲" : "▼"}
        </div>
      </div>

      {/* EXPANDED */}
      {expanded && (
        <div style={{
          borderTop: "1px solid #141e28",
          padding: "16px",
          background: "#080c12",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px"
        }}>
          <div>
            <Label>CORE FINDING</Label>
            <p style={{ margin: "6px 0 14px", fontSize: "12px", color: "#a0c0d8", lineHeight: "1.6" }}>
              {item.core_finding}
            </p>
            <Label>PRESIGNAL RELEVANCE</Label>
            <p style={{ margin: "6px 0 14px", fontSize: "12px", color: relColor, lineHeight: "1.5" }}>
              {item.relevance_reason}
            </p>
          </div>
          <div>
            <Label>CROSS-DOMAIN SIGNAL</Label>
            <p style={{ margin: "6px 0 14px", fontSize: "12px", color: "#7aa8c8", lineHeight: "1.5" }}>
              {item.cross_domain_signal || "None identified"}
            </p>
            <Label>TAGS</Label>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "6px" }}>
              {(item.tags || []).map((t, i) => (
                <span key={i} style={{
                  background: "#0d1e2e",
                  border: "1px solid #1a3a5a",
                  color: "#3a7aaa",
                  fontSize: "10px",
                  padding: "2px 7px",
                  borderRadius: "2px"
                }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: "16px" }}>
              <button onClick={(e) => { e.stopPropagation(); onCopy(); }} style={{
                background: "transparent",
                border: "1px solid #1a3a5a",
                color: "#2a7aaa",
                padding: "5px 14px",
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "1px",
                cursor: "pointer",
                borderRadius: "2px"
              }}>⊕ COPY REPORT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Label({ children }) {
  return (
    <div style={{
      fontSize: "9px",
      letterSpacing: "2px",
      color: "#2a5a7a",
      textTransform: "uppercase"
    }}>{children}</div>
  );
}
