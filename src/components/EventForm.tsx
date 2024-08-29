import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
  ActionFunction,
} from "react-router-dom";
import { EventInput } from "./EventInput";
import classes from "./EventForm.module.css";
import { getAuthToken } from "../utils/auth";
import { FormInterface } from "../types/EventType";


interface ErrorInterface {
  errors: string[];
}

function EventForm({ method, event }: FormInterface) {
  const data = useActionData() as ErrorInterface;
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <EventInput
        id="title"
        type="text"
        name="title"
        title={"Title"}
        event={event}
      />
      <EventInput
        id="image"
        type="url"
        name="image"
        title={"Image"}
        event={event}
      />
      <EventInput
        id="date"
        type="date"
        name="date"
        title={"Date"}
        event={event}
      />
      <EventInput name={"description"} title={"Description"} event={event}>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={event ? event.description : ""}
        />
      </EventInput>

      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action: ActionFunction = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
};
