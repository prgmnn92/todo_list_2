import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <main className="py-10 lg:pl-72">
      <div className="px-4 sm:px-6 lg:px-8">Hello WOrld</div>
    </main>
  );
}
