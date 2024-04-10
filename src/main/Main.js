import { ListBox } from "./list-box/ListBox";
import { WatchedBox } from "./watched-box/WatchedBox";

export function Main() {
  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  );
}
