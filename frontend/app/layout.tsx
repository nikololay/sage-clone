// app/page.tsx
"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import "../styles/globals.css";
import Image from "next/image";

function ProfileCard({
  username,
  avatar: image_url,
}: {
  username: string;
  avatar: URL;
}) {
  return (
    <div className="flex items-center mt-4">
      <img
        src="https://via.placeholder.com/150"
        alt="User profile"
        className="w-12 h-12 rounded-full"
      />
      <div className="ml-4">
        <Link href="/profile">
          <p className="font-semibold">Username</p>
          <p className="text-sm"></p>
        </Link>
      </div>
    </div>
  );
}

function Layout({ children }) {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);

  const toggleLeftSidebar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLeftSidebarOpen &&
        leftSidebarRef.current &&
        !(leftSidebarRef.current as any).contains(event.target)
      ) {
        setIsLeftSidebarOpen(false);
      }
      if (
        isRightSidebarOpen &&
        rightSidebarRef.current &&
        !(rightSidebarRef.current as any).contains(event.target)
      ) {
        setIsRightSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLeftSidebarOpen, isRightSidebarOpen]);

  const chatLinks = Array.from({ length: 99 }, (_, i) => `chat-${i + 1}`);

  return (
    <div className="flex h-screen text-gray-400">
      {/* Left Sidebar */}
      <nav
        ref={leftSidebarRef}
        className={`w-64 flex flex-col gap-4 bg-gray-800 text-white p-4 fixed h-full z-20 transition-transform duration-300 ease-in-out ${
          isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Image src="/logo.png" alt="logo" width={50} height={50} />

        {/* Nav */}
        <div className="flex flex-col gap-2">
          <Link href="/" className="block">
            discover
          </Link>
          <a href="https://nikolay-labs.github.io/blog/" className="block">
            projects
          </a>
          <Link href="/inbox" className="block">
            inbox
          </Link>
        </div>

        {/* Chat history */}
        <div>
          <p className="pb-1">history</p>
          <div className="overflow-y-auto max-h-96 flex flex-col gap-2">
            {chatLinks.map((link) => (
              <Link
                key={link}
                href={`/chat/${link}`}
                className="block hover:text-white text-gray-400"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* User profile */}
        <div>
          <Link href="/profile" className="block py-2">
            profile
          </Link>
          <ProfileCard
            username="Username"
            avatar={new URL("https://example.com")}
          />
        </div>
      </nav>

      {/* Main Content */}
      <main
        className={`flex-1 md:ml-64 overflow-y-auto transition-all duration-300 ${
          isRightSidebarOpen ? "md:mr-64" : ""
        }`}
      >
        <header className="md:hidden bg-gray-100 p-4 flex justify-between items-center">
          <button onClick={toggleLeftSidebar}>☰</button>
          {/* <button onClick={toggleRightSidebar}>Right Sidebar</button> */}
        </header>
        {children}
      </main>

      {/* Right Sidebar */}
      <aside
        ref={rightSidebarRef}
        className={`w-64 bg-gray-200 p-4 fixed right-0 top-0 h-full transition-transform duration-300 ease-in-out ${
          isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-lg font-semibold">Right Sidebar</h2>
        {/* Add content for the right sidebar */}
      </aside>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
