export function dateFormat(date) {
  const dateFormat = new Date(date);
  const formattedDate = dateFormat.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate;
}

export function dateTimeFormat(dateTime) {
  const dateTimeFormat = new Date(dateTime.replace(' ', 'T'));
  const formattedDate = dateTimeFormat.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = dateTimeFormat.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
  const formattedDateTime = `${formattedDate} at ${formattedTime}`;
  return formattedDateTime;
}

export function textTruncateByWords(text, wordLimit) {
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
}
