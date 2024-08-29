import EventInnerList from "./EventInnerList";
import { EventInterface } from "../types/EventType";
import classes from "./EventsList.module.css";

function EventsList({ events }: { events: EventInterface[] }) {
  // const events = useLoaderData();
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((event) => (
          <EventInnerList key={event.id} event={event}></EventInnerList>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
