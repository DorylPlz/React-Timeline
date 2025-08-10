import { daysBetween } from "./TimeLineUtils.js";

export default function TimelineVerticalBars({ allDates, minPaddedStr, totalDays, verticalBarHeight }) {
  return (
    <>
      {allDates.map((date, idx) => {
        const left = ((daysBetween(minPaddedStr, date) / totalDays) * 100);
        return (
          <div
            key={date}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: 0,
              height: `${verticalBarHeight}px`,
              width: "1px",
              background: "#d1d5db",
              zIndex: 0,
            }}
          />
        );
      })}
    </>
  );
}