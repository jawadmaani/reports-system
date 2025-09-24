import Link from "next/link";

const MainHeader = () => {
  return (
    <header>
      <Link href="/">Home</Link> | <Link href="/reports">Reports</Link>
    </header>
  );
};

export default MainHeader;
