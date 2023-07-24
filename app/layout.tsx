import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo",
  description: "Live collaboration todolist",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html className="h-full bg-gray-50" lang="en">
      <body className={`${inter.className} h-full`}>
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}>{children}</Navbar>
      </body>
    </html>
  );
}
