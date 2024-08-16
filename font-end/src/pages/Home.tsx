import NatureVid from "../assets/video/main.mp4";
import Places from "../components/Places/Places";
import BlogsComp from "../components/Blogs/BlogsComp";
import Banner from "../components/Banner/Banner";
import OrderPopup from "../components/OrderPopup/OrderPopup";
import Hero from "../components/Hero/Hero";

const Home = () => {
  return (
    <>
      <div>
        <div className="h-[700px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <Hero />
        </div>
        <Places />
        <BlogsComp />
        <Banner />
        <OrderPopup />
      </div>
    </>
  );
};

export default Home;
