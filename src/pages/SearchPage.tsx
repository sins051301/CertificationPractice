import SearchableList from "../components/SearchableList";
import { useQuery } from "@tanstack/react-query";
import { loadEvents, queryClient } from "../utils/http";
import EventListForm from "../components/EventBasic";
import { EventInterface } from "../types/EventType";

export default function SearchPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: loadEvents,
  });

  if (isPending) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  console.log(data);
  return (
    <section>
      <SearchableList items={data} itemKeyFn={(event) => event.id}>
        {(event: EventInterface) => <EventListForm event={event} />}
      </SearchableList>
    </section>
  );
}
export function loader() {
  return queryClient.fetchQuery({
    queryKey: ["events"],
    queryFn: loadEvents,
  });
}
