import { useRef, useEffect } from "react";
import useKey from "../useKey";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      inputEl.current.focus();
    },
    [setQuery]
  );

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
