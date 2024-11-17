import ResetBtn from "./Buttons/ResetBtn";

import {useTipContext} from "../context/TipContext";

const RightContainer = () => {
  const { tipData, setTipData } = useTipContext();

  return (
    <div className="p-6 h-full rounded-lg bg-neutral-very-dark-cyan w-[350px] flex flex-col justify-between max-md:gap-5">
      <div className="flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-xs">Tip Amount</h1>
            <h2 className="text-neutral-dark-grayish-cyan text-[10px] font-bold">
              / person
            </h2>
          </div>
          <h1 className="text-3xl text-primary-cyan font-bold">${tipData.tipAmount|| 0}</h1>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-xs">Total</h1>
            <h2 className="text-neutral-dark-grayish-cyan text-[10px] font-bold">
              / person
            </h2>
          </div>
          <h1 className="text-3xl text-primary-cyan font-bold">${tipData.totalAmount || 0}</h1>
        </div>
      </div>
      <ResetBtn action={() => setTipData({})} />
    </div>
  );
};

export default RightContainer;
