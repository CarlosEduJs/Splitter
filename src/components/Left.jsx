import iconDollar from "../assets/images/icon-dollar.svg";
import iconPeople from "../assets/images/icon-person.svg";

import { useState, useEffect } from "react";

import { useTipContext } from "../context/TipContext";

const LeftContainer = () => {
  const [selectedTip, setSelectTip] = useState(null);

  const { setTipData } = useTipContext();

  const [visibleCustomInput, setVisibleCustomInput] = useState(false);

  const [bill, setBill] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!bill || isNaN(bill) || bill <= 0) {
      newErrors.bill = "Please enter a valid bill amount";
    } else if (bill > 100000) {
      newErrors.bill = "Bill amount seems unrealistically high";
    }

    if (!numPeople || isNaN(numPeople) || numPeople <= 0) {
      newErrors.people = "Can't be zero";
    } else if (numPeople > 1000) {
      newErrors.people = "Too many people entered. Please check the value";
    }

    if (
      visibleCustomInput &&
      (!customTip || isNaN(customTip) || customTip <= 0 || customTip > 100)
    ) {
      newErrors.customTip = "Enter a valid tip percentage (1-100)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [bill, numPeople, customTip, visibleCustomInput]);

  const calculateResults = () => {
    if (!validate() || !bill || !numPeople) return;

    const billValue = parseFloat(bill);
    const numPeopleValue = parseInt(numPeople, 10);
    const tipPercent =
      visibleCustomInput && customTip
        ? parseFloat(customTip) / 100
        : selectedTip
        ? parseFloat(selectedTip) / 100
        : 0;

    if (isNaN(billValue) || isNaN(numPeopleValue) || isNaN(tipPercent)) {
      setErrors({ ...errors, general: "An unexpected error ocurred" });
    }

    const tipAmount = (billValue * tipPercent) / numPeopleValue;
    const totalAmount = (billValue + billValue * tipPercent) / numPeopleValue;

    setTipData({
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    setter(value ? parseFloat(value) : "");

    if (setter === setCustomTip) {
      calculateResults();
    }
  };

  const handleInputFormatter = (setter) => (e) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    setter(value ? parseFloat(value).toFixed(2) : "");
    if (value && !isNaN(value)) calculateResults();
  };

  const handleSelectTip = (tip) => {
    setSelectTip(tip);
    setVisibleCustomInput(false);
    setCustomTip("");
    calculateResults();
  };

  const tips = [
    { tipValue: 5 },
    { tipValue: 10 },
    { tipValue: 15 },
    { tipValue: 25 },
    { tipValue: 50 },
  ];
  return (
    <div className="flex flex-col gap-8 w-[350px]">
      <div className={`flex flex-col gap-2`}>
        <div className="flex items-center justify-between">
          <label className="text-neutral-dark-grayish-cyan font-bold text-xs max-md:text-sm">
            Bill
          </label>
          {errors.bill && <p className="text-red-500 text-xs">{errors.bill}</p>}
        </div>
        <div
          className={`flex items-center justify-between  px-3 py-1 max-md:py-2 bg-neutral-light-grayish-cyan/40 rounded-md ${
            errors.bill
              ? "border border-red-500"
              : "focus:focus-within:border-primary-cyan focus-within:ring-2 focus-within:ring-primary-cyan"
          }`}
        >
          <img src={iconDollar} alt="icon-dolar" className="w-2 max-md:w-3" />
          <input
            type="number"
            className={`text-sm max-md:text-base font-bold bg-transparent min-w-fit  text-end placeholder:text-neutral-grayish-cyan text-neutral-dark-grayish-cyan outline-none`}
            value={bill}
            onChange={handleInputFormatter(setBill)}
            onBlur={() =>
              setBill((prev) => prev && parseFloat(prev).toFixed(2))
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-neutral-dark-grayish-cyan font-bold text-xs max-md:text-sm">
          Select Tip %
        </label>
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
          {tips.map((tip, index) => (
            <button
              key={index}
              onClick={() => handleSelectTip(tip.tipValue)}
              className={`bg-neutral-very-dark-cyan text-white font-bold p-1 max-md:p-2 rounded-lg ${
                selectedTip === tip.tipValue
                  ? "bg-primary-cyan text-neutral-900"
                  : ""
              } `}
            >
              {tip.tipValue}%
            </button>
          ))}
          {visibleCustomInput ? (
            <input
              type="number"
              value={customTip}
              onChange={handleInputChange(setCustomTip)}
              className="text-sm max-md:text-base font-bold bg-neutral-light-grayish-cyan/40 rounded-md max-w-fit outline-none focus:focus-within:border-primary-cyan focus-within:ring-2 focus-within:ring-primary-cyan text-end px-2 placeholder:text-neutral-grayish-cyan text-neutral-dark-grayish-cyan"
            />
          ) : (
            <button
              onClick={() => {
                setSelectTip(null);
                setVisibleCustomInput(true);
              }}
              className="bg-neutral-light-grayish-cyan/40 rounded-md p-1 text-sm max-md:text-base"
            >
              Custom
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-neutral-dark-grayish-cyan font-bold text-xs max-md:text-sm">
            Number of People
          </label>
          {errors.people && (
            <p className="text-red-500 text-xs">{errors.people}</p>
          )}
        </div>
        <div
          className={`flex items-center justify-between px-3 py-1 max-md:py-2 bg-neutral-light-grayish-cyan/40 rounded-md ${
            errors.people
              ? "border border-red-500"
              : "focus:focus-within:border-primary-cyan focus-within:ring-2 focus-within:ring-primary-cyan"
          }`}
        >
          <img src={iconPeople} alt="icon-dolar" className="w-2 max-md:w-3" />
          <input
            type="number"
            className="text-sm max-md:text-base font-bold bg-transparent w-fit outline-none text-end placeholder:text-neutral-grayish-cyan text-neutral-dark-grayish-cyan"
            value={numPeople}
            onChange={handleInputChange(setNumPeople)}
          />
        </div>
      </div>
      {errors.general && (
        <p className="text-red-500 text-xs">{errors.general}</p>
      )}
    </div>
  );
};

export default LeftContainer;
