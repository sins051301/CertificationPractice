import { ReactNode, useRef, useState } from "react";

interface SearchableListInterface<T> {
  items: T[];
  itemKeyFn: (item: T) => string;
  children: (item: T) => ReactNode;
}

export default function SearchableList<T>({
  items,
  itemKeyFn,
  children,
}: SearchableListInterface<T>) {
  //null을 초기값으로 하면 읽기 전용 -> number | null 해주어 변경 가능하게
  const lastChange = useRef<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }
    //디바운싱
    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }
  //console.log(searchResults);

  return (
    <div className="searchable-list">
      <input onChange={handleChange} type="search" placeholder="Search" />
      <ul>
        {searchResults.map((event) => (
          <li key={itemKeyFn(event)}>{children(event)}</li>
        ))}
      </ul>
    </div>
  );
}
