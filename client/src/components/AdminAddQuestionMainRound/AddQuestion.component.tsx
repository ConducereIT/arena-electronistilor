import React from "react";
import { GiCancel } from "react-icons/gi";

export default function AddQuestion() {
  const generateNumbers = (n: number): number[] =>
    Array.from({ length: n }, (_, i) => i + 1);

  return (
    <>
      <div className=" grid grid-cols-2 w-screen h-screen overflow-hidden">
        <div className=" p-4 bg-slate-500 flex justify-center">
          <form>
            <p className=" flex justify-center text-2xl">Add Questions</p>
            <div className="pb-5">
              <label className=" uppercase text-xl pb-2 ">Question</label>
              <textarea
                name="Question"
                rows={3}
                cols={60}
                className="border-2 rounded-lg p-3 border-black flex bg-transparent text-xl bg-white"
              ></textarea>
            </div>
            <p className=" text-2xl flex justify-center py-3">Answears</p>
            <div className=" grid grid-cols-2">
              <div className=" flex flex-col">
                <label className=" text-xl">Answear 1</label>
                <input
                  placeholder="Answear 1"
                  type="text"
                  maxLength={100}
                  className="text-lg w-72 border-2 border-black rounded-lg p-2 mt-2"
                />
              </div>
              <div className=" flex flex-col">
                <label className=" text-xl">Answear 2</label>
                <input
                  placeholder="Answear 2"
                  type="text"
                  maxLength={100}
                  className="text-lg w-72 border-2 border-black rounded-lg p-2 mt-2"
                />
              </div>
              <div className=" flex flex-col">
                <label className=" text-xl">Answear 3</label>
                <input
                  placeholder="Answear 3"
                  type="text"
                  maxLength={100}
                  className="text-lg w-72 border-2 border-black rounded-lg p-2 mt-2"
                />
              </div>
              <div className=" flex flex-col">
                <label className=" text-xl">Answear 4</label>
                <input
                  placeholder="Answear 4"
                  type="text"
                  maxLength={100}
                  className="text-lg w-72 border-2 border-black rounded-lg p-2 mt-2"
                />
              </div>
              <div className=" flex flex-col">
                <label className=" text-xl">Answear 5</label>
                <input
                  placeholder="Answear 5"
                  type="text"
                  maxLength={100}
                  className="text-lg w-72 border-2 border-black rounded-lg p-2 mt-2"
                />
              </div>
              <div className=" flex flex-col">
                <label className=" text-xl">Answear 6</label>
                <input
                  placeholder="Answear 6"
                  type="text"
                  maxLength={100}
                  className="text-lg w-72 border-2 border-black rounded-lg p-2 mt-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex justify-center mt-10 p-2 rounded-lg text-white hover:opacity-80 duration-300 bg-blue-600 text-2xl"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="bg-slate-500">
          <p className="flex justify-center py-5 text-2xl">
            {" "}
            List of questions
          </p>
          <div className="grid mx-5 gap-1 overflow-y-scroll w-[90%] h-[50%]">
            {generateNumbers(20).map((number) => (
              <div
                key={number}
                className="bg-blue-200 flex justify-between rounded-lg border-2 border-black p-2 w-full"
              >
                <p className="text-xl">{`${number}. Vrem vreme buna? `}</p>
                <GiCancel size={25} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
