import Link from "next/link";

const MainHeader = () => {
  return (
    <header className="bg-gray-100 shadow-md py-4 px-6">
      <nav className="flex items-center space-x-4">
        <Link
          href="/"
          className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          href="/reports"
          className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
        >
          Reports
        </Link>
      </nav>
    </header>
  );
};

export default MainHeader;
