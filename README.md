# Event calendar - Interview project

[www](https://event-calendar-two.vercel.app/)
### The assignment was clear. Write a simpler Google/Apple calendar:

#### App specifications
- The application consists of one page.
- On this page, there is a calendar view.
- The view (of months) is scrollable (forward, backward).
- The week starts on Monday and ends on Sunday.
- The current day (if displayed) is indicated (colored highlighting, according to personal preference).
- Each day can contain 0 - n events.
- Events can be added and removed (in any way, for example, via a button, by clicking on the day, according to personal preference).
- There's no need to have the ability to edit events (however, it's not forbidden to implement it 😉).
- The event object contains these properties:
  - name - string, required
  - from (time) - date, required
  - to (time) - date, required
  - color - string, optional

#### Bonus
- Events can be edited.
- The form for adding (editing) events is properly validated.
- Events can span multiple days (the display extends over multiple days).
- A "Today" button, which navigates the calendar view to the current day.
- The application is fully optimized for mobile resolutions.
- The application is deployed and available online.

### Technologies:
- React
- DayJS
- Tailwind
- react-hook-form
- Typescript
