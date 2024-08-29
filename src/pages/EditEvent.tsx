import { useRouteLoaderData } from "react-router-dom";
import { EventInterface } from "../types/EventType";
import EventForm from "../components/EventForm";

interface EditEventInterface{
    event: EventInterface
}

//useLoader류는 as로 하자
function EditEventPage() {
  // 제네릭을 사용하여 데이터의 타입을 명확히 지정
  const data = useRouteLoaderData("event-detail") as EditEventInterface;

  return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;
