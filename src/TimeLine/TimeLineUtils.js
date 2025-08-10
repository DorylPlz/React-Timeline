export function getTimelineBounds(items) {
  const dates = items.flatMap(item => [item.start, item.end]);
  const min = dates.reduce((a, b) => a < b ? a : b);
  const max = dates.reduce((a, b) => a > b ? a : b);
  return { min, max };
}

export function daysBetween(start, end) {
  return (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
}

export function getAllDates(min, max) {
  const dates = [];
  let current = new Date(min);
  const end = new Date(max);
  while (current <= end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}
export function handleTimelineWheel(e, timelineRef, allDates, baseDayWidth, setZoom) {
  if (e.shiftKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

  e.preventDefault();
  const container = timelineRef.current;
  if (!container) return;

  const mouseX = e.clientX - container.getBoundingClientRect().left + container.scrollLeft;
  const mouseRatio = mouseX / container.scrollWidth;

  setZoom(z => {
    let next = z + (e.deltaY < 0 ? 0.1 : -0.1);
    next = Math.max(1, Math.min(next, 4));
    setTimeout(() => {
      if (container) {
        const newScrollWidth = Math.max(allDates.length * baseDayWidth * next, 600);
        container.scrollLeft = mouseRatio * newScrollWidth - (e.clientX - container.getBoundingClientRect().left);
      }
    }, 0);
    return Math.round(next * 100) / 100;
  });
}
export function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}