import {
  json,
  redirect,
  defer,
  ActionFunction,
  LoaderFunction,
} from "react-router-dom";
import { QueryErrorBoundary } from "@suspensive/react-query";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { getAuthToken } from "../utils/auth";
import { loadEvent, queryClient } from "../utils/http";
import { loadEvents } from "../utils/http";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { EventInterface } from "../types/EventType";

function EventDetailPage() {
  const params = useParams() as { eventId: string };
  const [query1, query2] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["events", { id: params.eventId }],
        queryFn: () => loadEvent(params.eventId),
      },
      {
        queryKey: ["events"],
        queryFn: () => loadEvents(),
      },
    ],
  });

  return (
    <>
      <QueryErrorBoundary
        fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
      >
        <EventItem event={query1.data as EventInterface} />
      </QueryErrorBoundary>
      <QueryErrorBoundary
        fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
      >
        <EventsList events={query2.data as EventInterface[]} />
      </QueryErrorBoundary>
    </>
  );
}

export default EventDetailPage;

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.eventId;

  return defer({
    event: await queryClient.fetchQuery({
      queryKey: ["events", { id: id }],
      queryFn: () => loadEvent(id),
    }),
    events: queryClient.fetchQuery({
      queryKey: ["events"],
      queryFn: loadEvents,
    }),
  });
};

export const action: ActionFunction = async ({ params, request }) => {
  const token = getAuthToken();
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request!.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  await queryClient.invalidateQueries({ queryKey: ["events"] });
  return redirect("/events");
};
