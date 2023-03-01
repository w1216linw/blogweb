export default function toPastTime(past: number) {
  const date = new Date(past);
  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

  if (daysDiff === 0 && hoursDiff === 0) {
    return "posted now";
  } else if (daysDiff === 0 && hoursDiff === 1) {
    return "posted 1 hour ago";
  } else if (daysDiff === 0) {
    return `posted ${hoursDiff} hours ago`;
  } else if (daysDiff === 1) {
    return "posted yesterday";
  } else {
    return `posted ${daysDiff} days ago`;
  }
}
