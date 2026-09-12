// ============================================================
// FLAGS ENGINE — Generates red and green flags from inputs
// ============================================================

import type { AnalysisInput, Flag } from '../types';

export function generateFlags(input: AnalysisInput): { greenFlags: Flag[]; redFlags: Flag[] } {
  const greenFlags: Flag[] = [];
  const redFlags: Flag[] = [];

  // ---- Message content ----
  if (input.exactMessage.length > 3) {
    greenFlags.push({ text: 'They used a full word (or more).', type: 'green' });
  } else if (input.exactMessage.length <= 1) {
    redFlags.push({ text: `They replied with ${input.exactMessage.length === 0 ? 'nothing' : `"${input.exactMessage}"`}. One character.`, type: 'red' });
  }

  // ---- Response time ----
  if (input.responseTime <= 5) {
    greenFlags.push({ text: 'Response time was within normal range.', type: 'green' });
  } else if (input.responseTime <= 15) {
    redFlags.push({ text: `They took ${input.responseTime} minutes to type a ${input.exactMessage.length}-character message.`, type: 'red' });
  } else if (input.responseTime <= 60) {
    redFlags.push({ text: `Response was ${input.responseTime} minutes delayed. Suspicious.`, type: 'red' });
  } else {
    redFlags.push({ text: `Response took over an hour. A novel could have been written in that time.`, type: 'red' });
  }

  // ---- Punctuation ----
  if (input.punctuation === '!') {
    greenFlags.push({ text: 'They used an exclamation mark. Enthusiasm detected.', type: 'green' });
  } else if (input.punctuation === '.') {
    redFlags.push({ text: 'They used a period. In texting. Deliberately.', type: 'red' });
  } else if (input.punctuation === '...') {
    redFlags.push({ text: 'They used an ellipsis. Something is being left unsaid.', type: 'red' });
  } else if (input.punctuation === 'none') {
    greenFlags.push({ text: 'No punctuation. Casual tone detected.', type: 'green' });
  }

  // ---- Capitalization ----
  if (input.capitalization === 'normal') {
    greenFlags.push({ text: 'Normal capitalization. Nothing unusual.', type: 'green' });
  } else if (input.capitalization === 'lowercase') {
    redFlags.push({ text: 'All lowercase. Either casual or emotionally disengaged.', type: 'red' });
  } else if (input.capitalization === 'allcaps') {
    redFlags.push({ text: 'ALL CAPS detected. They are either yelling or their Caps Lock is stuck.', type: 'red' });
  }

  // ---- Emoji ----
  if (input.usedEmoji && input.emojiType === '❤️') {
    greenFlags.push({ text: 'They sent a heart emoji. You\'re probably fine.', type: 'green' });
  } else if (input.usedEmoji && input.emojiType === '😂') {
    greenFlags.push({ text: 'They laughed. Or at least pretended to.', type: 'green' });
  } else if (input.usedEmoji && input.emojiType === '👍') {
    redFlags.push({ text: 'They sent 👍. The most passive-aggressive emoji known to humanity.', type: 'red' });
  } else if (input.usedEmoji && input.emojiType === '🙂') {
    redFlags.push({ text: 'They sent 🙂. Nobody genuinely uses this emoji.', type: 'red' });
  } else if (!input.usedEmoji) {
    redFlags.push({ text: 'No emoji was used. Emotional investment unclear.', type: 'red' });
  }

  // ---- Deviation ----
  if (input.deviationFromNormal === 'not_at_all') {
    greenFlags.push({ text: 'Their reply was consistent with their usual style.', type: 'green' });
  } else if (input.deviationFromNormal === 'slightly') {
    redFlags.push({ text: 'Reply was slightly different from normal. You noticed.', type: 'red' });
  } else if (input.deviationFromNormal === 'very' || input.deviationFromNormal === 'extremely') {
    redFlags.push({ text: `Reply was ${input.deviationFromNormal === 'extremely' ? 'EXTREMELY' : 'very'} different from their usual behavior. Something changed.`, type: 'red' });
  }

  // ---- Online after ----
  if (input.onlineAfter === 'yes') {
    redFlags.push({ text: 'They were online after sending it. They chose to not elaborate.', type: 'red' });
  } else if (input.onlineAfter === 'no') {
    greenFlags.push({ text: 'They went offline after replying. Probably busy.', type: 'green' });
  }

  // ---- Context ----
  if (input.recentDisagreement) {
    redFlags.push({ text: 'There was a recent disagreement. Context is loaded.', type: 'red' });
  } else {
    greenFlags.push({ text: 'No recent conflict detected.', type: 'green' });
  }

  if (input.usuallyFastReplier && input.responseTime > 15) {
    redFlags.push({ text: 'They are usually a fast replier but took longer this time.', type: 'red' });
  }

  if (input.usedPhraseBefore) {
    greenFlags.push({ text: 'They have used this phrase before. It\'s part of their vocabulary.', type: 'green' });
  }

  // ---- User behavior ----
  if (input.timeAlreadySpent === 'several_hours' || input.timeAlreadySpent === 'reconstructed') {
    redFlags.push({ text: `You have already spent ${input.timeAlreadySpent === 'reconstructed' ? 'an unreasonable amount of time' : 'several hours'} thinking about this.`, type: 'red' });
  }

  if (input.importance >= 8) {
    redFlags.push({ text: `You rated this conversation ${input.importance}/10 in importance. Your emotional investment is doing the heavy lifting.`, type: 'red' });
  }

  return { greenFlags, redFlags };
}
