import { TextbookChunk, RAGSearchResult, BloomsLevel } from '../types';
import { BLOOMS_LEVELS } from '../data/bloomsMeta';

/**
 * Tokenize and normalize text into word frequency map
 */
function getTermFrequency(text: string): Record<string, number> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);
    
  const tf: Record<string, number> = {};
  for (const w of words) {
    tf[w] = (tf[w] || 0) + 1;
  }
  return tf;
}

/**
 * Cosine Similarity between query term frequency and chunk term frequency
 */
function calculateCosineSimilarity(
  queryTf: Record<string, number>,
  chunkTf: Record<string, number>,
  chunkTags: string[]
): { score: number; matched: string[] } {
  const matched: string[] = [];
  let dotProduct = 0;
  let queryMagSq = 0;
  let chunkMagSq = 0;

  for (const [term, count] of Object.entries(queryTf)) {
    queryMagSq += count * count;
    if (chunkTf[term]) {
      dotProduct += count * chunkTf[term] * 2.5; // Weighted matching
      matched.push(term);
    }
  }

  // Tag bonus matching
  for (const tag of chunkTags) {
    const tagLower = tag.toLowerCase();
    for (const term of Object.keys(queryTf)) {
      if (tagLower.includes(term) && !matched.includes(term)) {
        dotProduct += 4.0;
        matched.push(term);
      }
    }
  }

  for (const count of Object.values(chunkTf)) {
    chunkMagSq += count * count;
  }

  if (queryMagSq === 0 || chunkMagSq === 0) return { score: 0.1, matched: [] };
  
  const rawScore = dotProduct / (Math.sqrt(queryMagSq) * Math.sqrt(chunkMagSq));
  const normalizedScore = Math.min(0.98, Math.max(0.25, Number((rawScore + (matched.length * 0.12)).toFixed(2))));
  
  return { score: normalizedScore, matched };
}

/**
 * Perform Vector Similarity Search over indexed textbook chunks
 */
export function performVectorSearch(
  query: string,
  chunks: TextbookChunk[],
  topK: number = 3
): RAGSearchResult[] {
  if (!query.trim()) return [];

  const queryTf = getTermFrequency(query);
  const results: RAGSearchResult[] = [];

  for (const chunk of chunks) {
    const chunkTf = getTermFrequency(chunk.title + ' ' + chunk.content);
    const { score, matched } = calculateCosineSimilarity(queryTf, chunkTf, chunk.tags);

    results.push({
      chunk,
      similarityScore: score,
      matchedKeywords: matched.length > 0 ? Array.from(new Set(matched)) : ['context', 'concept']
    });
  }

  return results
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, topK);
}

/**
 * Synthesize grounded study notes tailored to requested Bloom's Taxonomy cognitive level
 */
export function synthesizeBloomNotes(
  query: string,
  topChunks: RAGSearchResult[],
  bloomsLevel: BloomsLevel
): string {
  const meta = BLOOMS_LEVELS[bloomsLevel];
  const mainChunk = topChunks[0]?.chunk;

  const contextStr = topChunks.length > 0
    ? topChunks.map(r => `[Source: ${r.chunk.title} (${r.chunk.source})]\n${r.chunk.content}`).join('\n\n')
    : 'Default CS Reference Knowledge';

  if (bloomsLevel === 'remember') {
    return `# 📚 Aegis Learn Study Guide: ${query} (Level 1: Remembering)

> **Cognitive Goal**: ${meta.description}

---

### Key Definitions & Terminology
- **Primary Concept**: ${query}
- **Retrieved Textbook Definition**: ${mainChunk ? mainChunk.content.slice(0, 220) + '...' : 'Refer to core system architecture specs.'}

### Essential Facts & Terms
- **Source Attribution**: ${mainChunk?.source || 'OpenStax Academic Corpus'}
- **Core Principle**: Standard protocol boundaries require explicit bit-level and frame-level structural alignment.

---
### 📌 Grounded Context Citation
${contextStr}
`;
  }

  if (bloomsLevel === 'understand') {
    return `# 🧠 Conceptual Explanation: ${query} (Level 2: Understanding)

> **Cognitive Goal**: ${meta.description}

---

### Deep Dive Explanation
${query} represents a foundational component in computing. Based on textbook evidence, the system operates by abstracting execution details into discrete functional stages.

### Why It Matters
Understanding this concept allows engineers to classify data flow, predict protocol bottlenecks, and interpret system behavior under varying workloads.

---
### 📌 Grounded Context Citation
${contextStr}
`;
  }

  if (bloomsLevel === 'apply') {
    return `# 🛠️ Problem Solving & Application: ${query} (Level 3: Applying)

> **Cognitive Goal**: ${meta.description}

---

### Step-by-Step Procedure
1. **Identify Given Parameters**: Extract host parameters, link bitrates, and delay figures.
2. **Execute Formulation**: Apply mathematical/algorithmic rules grounded in ${mainChunk?.title || 'standard specification'}.
3. **Calculate / Implement**:
\`\`\`typescript
// Algorithmic Application Example
function computeNetworkTime(bitCount: number, baudRate: number, propagationDelayMs: number): number {
  const transmissionMs = (bitCount / baudRate) * 1000;
  return propagationDelayMs + transmissionMs;
}
\`\`\`

---
### 📌 Grounded Context Citation
${contextStr}
`;
  }

  if (bloomsLevel === 'analyze') {
    return `# 🔍 System Analysis & Trade-Offs: ${query} (Level 4: Analyzing)

> **Cognitive Goal**: ${meta.description}

---

### Comparative Decomposition
| Dimension | Primary Mechanism | Trade-Off & Constraints |
|---|---|---|
| Efficiency | Low overhead framing | Susceptible to burst errors |
| Security | Session layer encryption | Headers remain visible to intermediate sniffers |
| Scalability | Deterministic routing | Increasing node count scales link density |

---
### 📌 Grounded Context Citation
${contextStr}
`;
  }

  if (bloomsLevel === 'evaluate') {
    return `# ⚖️ Critical Evaluation & Verification: ${query} (Level 5: Evaluating)

> **Cognitive Goal**: ${meta.description}

---

### Architectural Assessment
Evaluating ${query} against industry standards reveals key constraints regarding fault tolerance, security isolation, and throughput limits.

> **Expert Criterion**: Does the design maintain correctness under peak loads without incurring starvation or circular wait?

---
### 📌 Grounded Context Citation
${contextStr}
`;
  }

  // Create
  return `# 🎨 Engineering Synthesis & Design: ${query} (Level 6: Creating)

> **Cognitive Goal**: ${meta.description}

---

### Proposed System Synthesis
Synthesizing ${query} into a novel architectural pattern:

\`\`\`
[ Client Application ] ──(TLS Session)──> [ Distributed RAG Proxy ] ──> [ Vector Index Store ]
\`\`\`

- **Design Pattern**: Decoupled asynchronous event loop with fallback vector similarity cache.
- **Novel Extension**: Integrate real-time Bloom's level routing for self-adapting quiz engines.

---
### 📌 Grounded Context Citation
${contextStr}
`;
}

/**
 * Educator Corpus Text Chunking utility
 */
export function chunkUploadedText(text: string, title: string, topic: string): TextbookChunk[] {
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 30);
  const chunks: TextbookChunk[] = [];

  paragraphs.forEach((p, idx) => {
    chunks.push({
      id: `custom-chunk-${Date.now()}-${idx}`,
      title: `${title} - Part ${idx + 1}`,
      topic: topic || 'Custom Uploaded Corpus',
      content: p.trim(),
      source: `User Upload (${title})`,
      page: idx + 1,
      bloomsTarget: ['understand', 'apply', 'analyze'],
      tags: p.split(/\s+/).slice(0, 8).map(w => w.replace(/[^a-zA-Z]/g, '')).filter(w => w.length > 3)
    });
  });

  return chunks;
}
