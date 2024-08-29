import { Link } from "react-router-dom";
import classes from "./EventsList.module.css";
import { EventInterface } from "../types/EventType";
export default function EventListForm({ event }: {event: EventInterface}) {
  return (
    <li key={event.id} className={classes.item}>
      <Link to={`/events/${event.id}`}>
        <img src={event.image} alt={event.title} />
        <div className={classes.content}>
          <h2>{event.title}</h2>
          <time>{event.date}</time>
        </div>
      </Link>
    </li>
  );
}
