import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import UserModal from "./components/modals/UserModal";
import ProjectModal from "./components/modals/ProjectModal";
import ToasterProvider from "./providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo",
  description: "Collaboration todolist",
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
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <ProjectModal />
        <UserModal currentUser={currentUser} />
        <Navbar currentUser={currentUser}>{children}</Navbar>
      </body>
    </html>
  );
}
