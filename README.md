## Use Instructions
Zoom In and Out are controlled by the scroll whell
In order to scroll side to side use the scroll bar or Shift + ScrollWheel
To drag an item be sure you are in drag mode (Switch button should say "Switch to Edit Mode")
To edit the text of the items Click on "Switch to Edit Mode", now drag mode should be disabled and Inline Editing should be as simple as clicking on the text you want to modify

## Extra feature
Hovering the cursor on an item should display a tooltip with the complete name and current dates (It changes in relation of where the item is located in the Timeline)
Added a few days before and after the timeline to improve readability

## What you like about your implementation.
What I mainly like is that the reordering of the items is being done automatically while dragging and avoids selecting other item's texts while doing it

## What you would change if you were going to do it again.
The Zoom In and Out feature is not exactly perfect, for example I wanted to make it zoom in where the cursor was on the timeline, but I ran out of time to implement a better way to do it, so definitely that is my main point of refactoring.

On the other hand, the switch between dragging and editing was one of the main issues design-wise I had, I wanted to implement a way to edit the text AND also drag the items without switching modes, the main factor why I did it this way was because the inline editing feature was overlapping with the dragging one, in other words, i was only able to drag from outside the text, which was quite of an issue on smaller items, also implemented a button on the item themselves to allow editing, but the issue on smaller items remained, so I ended up implementing a global button to switch between editing and dragging. 

I would also add a way to modify independantly the start and end date of each item.

## How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
Yes, I searched on google for Timelines with overlapping items, the main inspiration was [this one](https://www.slideteam.net/wp/wp-content/uploads/2024/07/Overlapping-Timeline-Showing-Business-Plan-Identify%E2%80%A6.png)

## How you would test this if you had more time.
Like I mentioned before, the Zoom In feature is not completely of my liking, so this is something I would further test in order to make it more usable for example, to zoom in exactly where an smaller item in the timeline is instead of zooming in and search for it over again.
Also would test on different aspect ratios and browsers just to check everything is in order.

