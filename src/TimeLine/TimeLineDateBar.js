import { daysBetween } from "./TimeLineUtils.js";

export default function TimelineDateBar({ allDates, min, max, minPaddedStr, totalDays, lanesAreaHeight, dateBarHeight, zoom }) {
  const interval = 2;
  const zoomThreshold = 2;

  return (
    <div style={{
      position: "absolute",
      top: lanesAreaHeight,
      left: 0,
      width: "100%",
      height: `${dateBarHeight}px`,
      background: "#93c5fd",
      borderRadius: 8,
      boxSizing: "border-box",
      fontSize: 12,
      color: "#1e293b",
      zIndex: 1,
    }}>
      {allDates.map((date, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === allDates.length - 1;
        const isInterval = idx % interval === 0;
        const isLastItemEnd = date === max;

        if (zoom >= zoomThreshold) {
          if (date >= min) {
            const left = ((daysBetween(minPaddedStr, date) / totalDays) * 100);
            const [year, month, day] = date.split("-");
            return (
              <div
                key={date}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  top: 0,
                  minWidth: 40,
                  textAlign: "center",
                  fontWeight: "normal",
                  transform: "translateX(-50%)"
                }}
              >
                <div>{year}</div>
                <div>{`${month}-${day}`}</div>
              </div>
            );
          }
        } else {
          if (
            (date >= min) &&
            (isFirst || isInterval || (isLast && isLastItemEnd))
          ) {
            const left = ((daysBetween(minPaddedStr, date) / totalDays) * 100);
            const [year, month, day] = date.split("-");
            return (
              <div
                key={date}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  top: 0,
                  minWidth: 40,
                  textAlign: "center",
                  fontWeight: isFirst || isLast ? "bold" : "normal",
                  transform: "translateX(-50%)"
                }}
              >
                <div>{year}</div>
                <div>{`${month}-${day}`}</div>
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
}