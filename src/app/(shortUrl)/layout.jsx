import DashboardNavbar from "@/components/DashboardNavbar";

export default function RedirectLayout({ children }) {
  return (
    <section className="">
      <DashboardNavbar />
      {children}
    </section>
  );
}
