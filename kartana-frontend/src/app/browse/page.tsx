import Breadcrumb from "../../components/browse/Breadcrumb";
import Listing from "../../components/browse/Listing";

const Browse = () => {
  return (
    <>
    <div className="bg-grey">
      <Breadcrumb/>
    </div>
    <div className="bg-color-neutral">
      <Listing/>
    </div>
    </>
  )
}

export default Browse
