import DashboardNavbar from "@/components/DashboardNavbar";

export const metadata = {
  title: "Dashboard - Settings | SleekLink",
  description:
    "Explore and manage your shortened URLs and account information in the dashboard.",
};

export default function RedirectLayout({ children }) {
  return (
    <section>
      <DashboardNavbar />
      {children}
    </section>
  );
}
