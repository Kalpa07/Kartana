import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Deals from "../components/Deals";
import Brands from "../components/Brands";
import Exclusives from "../components/Exclusives";

const Home = () => {
  return (
    <div>
      <Header/>
      <CategoryBar/>
      <Deals/>
      <Brands/>
      <Exclusives/>
    </div>
  );
}


export default Home;