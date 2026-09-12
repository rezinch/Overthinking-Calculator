// ============================================================
// TIMELINE ENGINE — Reconstructs a dramatic timeline of events
// ============================================================

import type { AnalysisInput, TimelineEvent } from '../types';

export function generateTimeline(input: AnalysisInput): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const now = new Date();

  // Work backwards from "now" to reconstruct events
  const responseTimeMs = input.responseTime * 60 * 1000;

  // Calculate time-already-spent in minutes
  let thinkingMinutes = 1;
  switch (input.timeAlreadySpent) {
    case '1_min': thinkingMinutes = 1; break;
    case '10_min': thinkingMinutes = 10; break;
    case '1_hour': thinkingMinutes = 60; break;
    case 'several_hours': thinkingMinutes = 180; break;
    case 'reconstructed': thinkingMinutes = 360; break;
  }

  const thinkingMs = thinkingMinutes * 60 * 1000;

  // Timeline anchor: "now" is when they opened this website
  const openedWebsite = now;
  const startedThinking = new Date(openedWebsite.getTime() - thinkingMs);
  const theyReplied = new Date(startedThinking.getTime() - 60 * 1000); // 1 min before thinking
  const theyViewedMessage = new Date(theyReplied.getTime() - responseTimeMs);
  const theyCameOnline = new Date(theyViewedMessage.getTime() - 60 * 1000);
  const youSent = new Date(theyCameOnline.getTime() - 120 * 1000);

  const fmt = (d: Date): string => {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  events.push({
    time: fmt(youSent),
    label: 'You sent a message',
    description: input.whatHappened.length > 60
      ? `"${input.whatHappened.substring(0, 57)}..."`
      : `"${input.whatHappened}"`,
  });

  events.push({
    time: fmt(theyCameOnline),
    label: 'They came online',
    description: 'Status changed to "Active".',
  });

  events.push({
    time: fmt(theyViewedMessage),
    label: 'They viewed the message',
    description: 'Read receipt detected.',
  });

  if (input.responseTime > 10) {
    // Add a "they went offline" event in between
    const wentOffline = new Date(theyViewedMessage.getTime() + 3 * 60 * 1000);
    events.push({
      time: fmt(wentOffline),
      label: 'They went offline',
      description: 'Silence began.',
    });
  }

  events.push({
    time: fmt(theyReplied),
    label: 'They replied',
    description: input.exactMessage
      ? `"${input.exactMessage}"`
      : '"[message]"',
  });

  // Add "started thinking" and escalating checks
  events.push({
    time: fmt(startedThinking),
    label: 'You began thinking about it',
    description: 'Overthinking initiated.',
  });

  if (thinkingMinutes >= 10) {
    const check1 = new Date(startedThinking.getTime() + 4 * 60 * 1000);
    events.push({
      time: fmt(check1),
      label: 'You opened the chat again',
      description: 'To re-read the message. For the third time.',
    });
  }

  if (thinkingMinutes >= 30) {
    const check2 = new Date(startedThinking.getTime() + 12 * 60 * 1000);
    events.push({
      time: fmt(check2),
      label: 'You checked their online status',
      description: 'Subtly. Very subtly.',
    });
  }

  if (thinkingMinutes >= 60) {
    const check3 = new Date(startedThinking.getTime() + 30 * 60 * 1000);
    events.push({
      time: fmt(check3),
      label: 'You asked a friend for their opinion',
      description: 'They said "you\'re overthinking it."',
    });
  }

  if (thinkingMinutes >= 120) {
    const check4 = new Date(startedThinking.getTime() + 90 * 60 * 1000);
    events.push({
      time: fmt(check4),
      label: 'You scrolled through old conversations',
      description: 'Looking for patterns. Finding them everywhere.',
    });
  }

  events.push({
    time: fmt(openedWebsite),
    label: 'You opened Overthinking Calculator',
    description: 'Professional help has arrived.',
  });

  events.push({
    time: fmt(openedWebsite),
    label: 'CRITICAL EVENT',
    description: 'You started overthinking.',
    isCritical: true,
  });

  return events;
}
