import { BloomsLevel, RAGSearchResult } from '../types';
import { synthesizeBloomNotes } from './ragEngine';

const API_KEY_STORAGE_KEY = 'aegis_gemini_api_key';

export function getStoredApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
}

export function setStoredApiKey(key: string): void {
  if (key.trim()) {
    localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
}

/**
 * Generate AI Personalised Notes using Gemini 1.5 Flash API or local fallback
 */
export async function generatePersonalizedNotes(
  query: string,
  bloomsLevel: BloomsLevel,
  retrievedChunks: RAGSearchResult[]
): Promise<{ notes: string; isLiveAi: boolean }> {
  const apiKey = getStoredApiKey();

  if (!apiKey) {
    // Fallback to grounded local RAG synthesizer
    const notes = synthesizeBloomNotes(query, retrievedChunks, bloomsLevel);
    return { notes, isLiveAi: false };
  }

  try {
    const contextText = retrievedChunks
      .map(r => `Source: ${r.chunk.title} (${r.chunk.source})\nContent: ${r.chunk.content}`)
      .join('\n\n---\n\n');

    const prompt = `You are AegisLearn, an advanced AI tutor grounded in academic textbook evidence using Bloom's Taxonomy.
Student Query: "${query}"
Target Bloom's Cognitive Level: "${bloomsLevel.toUpperCase()}"

Retrieved Textbook Context Chunks:
${contextText}

Instructions:
1. Generate an in-depth, structured markdown study guide for the student query.
2. Align the cognitive depth strictly with the target Bloom's level:
   - REMEMBER: Focus on definitions, core terms, facts, and recall lists.
   - UNDERSTAND: Focus on deep explanations, classification, and conceptual why/how.
   - APPLY: Focus on formulas, step-by-step calculations, code snippets, or practical exercises.
   - ANALYZE: Focus on structural breakdown, comparisons, trade-offs, and security/performance implications.
   - EVALUATION: Focus on critiquing correctness, verification standards, and trade-off evaluation.
   - CREATE: Focus on architecture design, diagram synthesis, and building novel solutions.
3. Explicitly cite retrieved textbook context chunks where relevant.
4. Format output in clean GitHub-flavored markdown with headers, bullet points, and code/table blocks.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1200,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText) {
      return { notes: generatedText, isLiveAi: true };
    } else {
      throw new Error('Empty response from Gemini API');
    }
  } catch (err) {
    console.warn('Gemini API call failed, reverting to local RAG generator:', err);
    const notes = synthesizeBloomNotes(query, retrievedChunks, bloomsLevel);
    return { notes, isLiveAi: false };
  }
}
