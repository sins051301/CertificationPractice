import { ReactNode } from "react";
import { EventInterface } from "../types/EventType";
interface EventInputInterface {
  event?: EventInterface;
  type?: string;
  id?: string;
  name: string;
  title: string;
  children?: ReactNode;
}

export function EventInput({
  event,
  type,
  id,
  name,
  title,
  children,
}: EventInputInterface) {
  return (
    <p>
      <label htmlFor={name}>{title}</label>
      {children ? (
        children
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required
          defaultValue={event ? event.description : ""}
        />
      )}
    </p>
  );
}
