import Landing from "../components/Landing/Landing";
import Info from "../components/costProfile/Info";
import Shop from "../components/Shop/Shop";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
// import SwiperCards from "@/components/SwiperCards";

export default function Home() {
  return (
    <div>
      <Header />
      <Landing />
      <Info />
      {/* <SwiperCards 
          items={[{ card: <div className="text-lg font-bold">Hero</div>, src: "/laptop.jpg" }]} 
          paginationImages/> */}
      <Shop />
      <Footer />
    </div>
  );
}
