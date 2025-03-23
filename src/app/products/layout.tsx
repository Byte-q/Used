import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import './product.css'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}