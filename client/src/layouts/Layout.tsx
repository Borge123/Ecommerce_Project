import Navigation from "../components/ui/navigation/Navigation";
import Footer from "../components/ui/footer/Footer";
export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
