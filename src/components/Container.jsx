import LeftContainer from "./Left";
import RightContainer from "./Right";

const Container = () => {
  return (
    <div className="p-6 bg-neutral-white rounded-lg flex items-center gap-6 max-md:flex-col">
      <LeftContainer />
      <RightContainer />
    </div>
  );
};

export default Container;
