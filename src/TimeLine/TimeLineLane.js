import TimelineItem from "./TimeLineItem";

export default function TimelineLane({ lane, minPaddedStr, totalDays, dayWidth, laneHeight, onUpdate, editingMode, onDragStart, draggingInfo }) {
  return (
    <div style={{ position: "relative", height: laneHeight, marginBottom: 0 }}>
      {lane.map(item => (
        <TimelineItem
          key={item.id}
          item={item}
          minPaddedStr={minPaddedStr}
          totalDays={totalDays}
          dayWidth={dayWidth}
          onUpdate={onUpdate}
          editingMode={editingMode}
          onDragStart={onDragStart}
          isDragging={draggingInfo && draggingInfo.id === item.id}
        />
      ))}
    </div>
  );
}