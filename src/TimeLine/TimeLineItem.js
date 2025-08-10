import React from "react";
import { daysBetween } from "./TimeLineUtils.js";

export default function TimelineItem({
  item,
  minPaddedStr,
  totalDays,
  dayWidth,
  onUpdate,
  editingMode,
  onDragStart,
  isDragging
}) {
  const [name, setName] = React.useState(item.name);

  const left = totalDays === 0 ? 0 : ((daysBetween(minPaddedStr, item.start) / totalDays) * 100);
  const width = totalDays === 0 ? 0 : ((daysBetween(item.start, item.end) / totalDays) * 100);

  const handleNameChange = (e) => setName(e.target.value);
  const handleNameBlur = () => {
    if (name !== item.name) onUpdate(item.id, { name });
  };
  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") e.target.blur();
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}%`,
        width: `${width}%`,
        minWidth: `${dayWidth}px`,
        background: "#e0e7ff",
        border: "1px solid #6366f1",
        borderRadius: 4,
        padding: "4px 8px",
        boxSizing: "border-box",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "flex",
        alignItems: "center",
        cursor: isDragging ? "grab" : "pointer",
        zIndex: isDragging ? 2 : 1
      }}
      title={`${item.name} (${item.start} - ${item.end})`}
      onMouseDown={
        !editingMode
          ? (e) => onDragStart(item.id, "item", e.clientX)
          : undefined
      }
    >
      <div
        style={{
          width: 8,
          cursor: editingMode ? "not-allowed" : "ew-resize",
          marginRight: 4,
          height: "100%",
          background: "#000",
          borderRadius: "4px 0 0 4px"
        }}
        onMouseDown={
          !editingMode
            ? (e) => {
                e.stopPropagation();
                onDragStart(item.id, "start", e.clientX);
              }
            : undefined
        }
      />
      {editingMode ? (
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onKeyDown={handleNameKeyDown}
          style={{
            flex: 1,
            fontSize: "inherit",
            border: "none",
            background: "transparent",
            outline: "none",
          }}
        />
      ) : (
        <span style={{ flex: 1, cursor: "pointer" }}>
          {item.name}
        </span>
      )}
      <div
        style={{
          width: 8,
          cursor: editingMode ? "not-allowed" : "ew-resize",
          marginLeft: 4,
          height: "100%",
          background: "#000",
          borderRadius: "0 4px 4px 0"
        }}
        onMouseDown={
          !editingMode
            ? (e) => {
                e.stopPropagation();
                onDragStart(item.id, "end", e.clientX);
              }
            : undefined
        }
      />
    </div>
  );
}