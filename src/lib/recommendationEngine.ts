// ============================================================
// RECOMMENDATION ENGINE — Score-based humorous recommendations
// ============================================================

export function getRecommendation(score: number): string {
  if (score <= 10) return 'Do nothing. You are surprisingly well-adjusted. We\'re almost concerned about how little you care.';
  if (score <= 20) return 'This is fine. You are fine. Everything is fine. Close this tab.';
  if (score <= 30) return 'Maybe think about something else for 15 minutes. Watch a video. Pet a dog.';
  if (score <= 40) return 'Wait 30 minutes before checking the chat again. We believe in you.';
  if (score <= 50) return 'Close the chat app. Open it again in one hour. Not 59 minutes. One hour.';
  if (score <= 60) return 'Go for a walk. Not a walk where you think about this. An actual walk.';
  if (score <= 70) return 'Close WhatsApp. Close Instagram. Close everything. Open a book. A physical book.';
  if (score <= 80) return 'Put your phone in another room. Preferably a room you don\'t have easy access to. Like a neighbor\'s house.';
  if (score <= 90) return 'Put your phone down. Go outside. Touch grass. Literally touch it. Feel the earth beneath your feet.';
  if (score <= 95) return 'Delete the app. Not the conversation. The entire app. You can reinstall it tomorrow when you\'ve calmed down.';
  if (score < 100) return 'We are legally required to recommend professional help. Not because something is wrong with you, but because your overthinking has reached a level of sophistication that should be studied.';
  return 'Touch grass. Immediately. This is not a suggestion. This is a medical recommendation from an algorithm that has no medical qualifications.';
}

export function getRecommendationEmoji(score: number): string {
  if (score <= 20) return '😌';
  if (score <= 40) return '🤔';
  if (score <= 60) return '😰';
  if (score <= 80) return '😵‍💫';
  if (score <= 95) return '🆘';
  return '🌿';
}
