import { useState, useRef, useEffect, useMemo, useCallback  } from "react";
import assignLanes from "./assignLanes.js";
import timelineItemsData from "../timelineItems.js";
import { getTimelineBounds, daysBetween, getAllDates, handleTimelineWheel, addDays } from "./TimeLineUtils.js";
import TimelineLane from "./TimeLineLane.js";
import TimelineDateBar from "./TimeLineDateBar.js";
import TimelineVerticalBars from "./TimelineVerticalBars.js";

export default function Timeline() {
  const [zoom, setZoom] = useState(1);
  const [items, setItems] = useState(timelineItemsData);
  const [editingMode, setEditingMode] = useState(false);
  const timelineRef = useRef(null);
  const [draggingInfo, setDraggingInfo] = useState(null);
  const [cursorStyle, setCursorStyle] = useState("default");

  const handleUpdateItem = (id, changes) => {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, ...changes } : item
      )
    );
  };

  const lanes = useMemo(() => assignLanes(items), [items]);
  const { min, max } = useMemo(() => getTimelineBounds(items), [items]);

  const minPadded = new Date(min);
  minPadded.setDate(minPadded.getDate() - 1);

  const maxPadded = new Date(max);
  maxPadded.setDate(maxPadded.getDate() + 5);

  const minPaddedStr = minPadded.toISOString().slice(0, 10);
  const maxPaddedStr = maxPadded.toISOString().slice(0, 10);

  const allDates = useMemo(() => getAllDates(minPaddedStr, maxPaddedStr), [minPaddedStr, maxPaddedStr]);
  const totalDays = useMemo(() => daysBetween(minPaddedStr, maxPaddedStr), [minPaddedStr, maxPaddedStr]);
  const laneHeight = 40;
  const lanesAreaHeight = lanes.length * laneHeight;
  const dateBarHeight = 30;
  const verticalBarHeight = lanesAreaHeight;
  const baseDayWidth = 30;
  const dayWidth = baseDayWidth * zoom;
  const timelineWidth = Math.max(allDates.length * dayWidth, 600);

  const handleWheel = useCallback(
    (e) => {
      handleTimelineWheel(e, timelineRef, allDates, baseDayWidth, setZoom);
    },
    [timelineRef, allDates, baseDayWidth, setZoom]
  );

  const handleDragStart = (id, type, startX) => {
    setDraggingInfo({ id, type, startX });
    setCursorStyle(type === "item" ? "grab" : "ew-resize");
  };

  const handleDragEnd = () => {
    setDraggingInfo(null);
    setCursorStyle("default");
    document.body.style.cursor = "";
  };

  const handleDragMove = useCallback((e) => {
    if (!draggingInfo) return;
    const { id, type, startX } = draggingInfo;
    const deltaDays = Math.round((e.clientX - startX) / dayWidth);
    if (deltaDays !== 0) {
      setItems(items =>
        items.map(item => {
          if (item.id !== id) return item;
          if (type === "item") {
            return {
              ...item,
              start: addDays(item.start, deltaDays),
              end: addDays(item.end, deltaDays)
            };
          } else if (type === "start") {
            const newStart = addDays(item.start, deltaDays);
            if (new Date(newStart) > new Date(item.end)) return item;
            return { ...item, start: newStart };
          } else if (type === "end") {
            const newEnd = addDays(item.end, deltaDays);
            if (new Date(newEnd) < new Date(item.start)) return item;
            return { ...item, end: newEnd };
          }
          return item;
        })
      );
      setDraggingInfo({ ...draggingInfo, startX: e.clientX });
    }
  }, [draggingInfo, dayWidth]);

  useEffect(() => {
    if (draggingInfo) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      return () => {
        window.removeEventListener("mousemove", handleDragMove);
        window.removeEventListener("mouseup", handleDragEnd);
      };
    }
  }, [draggingInfo, handleDragMove, handleDragEnd]);

  return (
    <div style={{ padding: 20, overflowX: "auto" }}>
      <div style={{ marginBottom: 12 }}>
        <button
          type="button"
          onClick={() => setEditingMode(m => !m)}
          style={{
            padding: "6px 16px",
            fontSize: 14,
            borderRadius: 6,
            border: "1px solid #6366f1",
            background: editingMode ? "rgb(147, 197, 253)" : "#fff",
            color: editingMode ? "#fff" : "#6366f1",
            cursor: "pointer"
          }}
        >
          {editingMode ? "Switch to Drag Mode" : "Switch to Edit Mode"}
        </button>
      </div>
      <div
        ref={timelineRef}
        onWheel={handleWheel}
        tabIndex={0}
        style={{
          position: "relative",
          minHeight: lanesAreaHeight + dateBarHeight,
          minWidth: timelineWidth,
          cursor: cursorStyle,
          userSelect: draggingInfo ? "none" : "auto"
        }}
      >
        <TimelineVerticalBars
          allDates={allDates}
          minPaddedStr={minPaddedStr}
          totalDays={totalDays}
          verticalBarHeight={verticalBarHeight}
        />

        {lanes.map((lane, laneIdx) => (
          <TimelineLane
            key={laneIdx}
            lane={lane}
            minPaddedStr={minPaddedStr}
            totalDays={totalDays}
            dayWidth={dayWidth}
            laneHeight={laneHeight}
            onUpdate={handleUpdateItem}
            editingMode={editingMode}
            onDragStart={handleDragStart}
            draggingInfo={draggingInfo}
          />
        ))}

        <TimelineDateBar
          allDates={allDates}
          min={min}
          max={max}
          minPaddedStr={minPaddedStr}
          totalDays={totalDays}
          lanesAreaHeight={lanesAreaHeight}
          dateBarHeight={dateBarHeight}
          zoom={zoom}
        />
      </div>
    </div>
  );
}