import { NumResults } from "./NumResults";
import { Logo } from "./Logo";
import { Search } from "./Search";

export function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults />
    </nav>
  );
}
