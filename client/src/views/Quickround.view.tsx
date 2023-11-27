import React from "react";
import QuickRoundMain from "../components/Quickround/QuickRoundMain.component";

export default function Quickround() {
  const handleTimerEnd = () => {
    console.log("Timer reached zero");
  };
  return (
    <>
      <QuickRoundMain initialSeconds={60} onTimerEnd={handleTimerEnd} />
    </>
  );
}
