import Header from "../components/homepage/Header";
import CategoryBar from "../components/homepage/CategoryBar";
import Deals from "../components/homepage/Deals";
import Brands from "../components/homepage/Brands";
import Exclusives from "../components/homepage/Exclusives";

const Home = () => {
  return (
    <>
    <div className="bg-grey pt-5">
      <Header/>
      <CategoryBar/>
    </div>
    <div className="bg-color-neutral">
      <Deals/>
      <Brands/>
      <Exclusives/>
    </div>
    </>
  );
}


export default Home;