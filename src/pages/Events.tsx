import { defer, LoaderFunction } from "react-router-dom";
import { queryClient } from "../utils/http";
import EventsList from "../components/EventsList";
import { loadEvents } from "../utils/http";
import { useSuspenseQuery } from "@tanstack/react-query";
import { QueryErrorBoundary } from "@suspensive/react-query";
function EventsPage() {
  //캐쉬된 데이터가 사용됨
  
  const { data } = useSuspenseQuery({
    queryKey: ["events"],
    queryFn: loadEvents,
    staleTime: 10000,
  });
  console.log(data);

  return (
    <QueryErrorBoundary
      fallback={<p style={{ textAlign: "center" }}>Loading...</p>}
    >
      <EventsList events={data} />
    </QueryErrorBoundary>
  );
}

export default EventsPage;                         

export const loader: LoaderFunction = async () => {
  //데이터 캐쉬
  console.log("sfsfsf");
  return defer({
    data: await queryClient.fetchQuery({
      queryKey: ["events"],
      queryFn: loadEvents,
    }),
  });
};
