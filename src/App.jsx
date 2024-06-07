import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, isNumAllowed] = useState(false);
  const [charAllowed, isCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passVal = useRef(); //variable to store refernce of password

  // usecall back to optimize the code keeps dependecy in cache memory
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "!¡@#€£$%&?¿";
    for (let i = 1; i <= length; i++) {
      let ch = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(ch);
    }
    setPassword(pass);
  }, [
    // it needs function and dependency in the form of array
    length,
    numAllowed,
    charAllowed,
    setPassword, // for optimaization
  ]);

  const copyPass = useCallback(() => {
    passVal.current?.select(); // adds select effect
    // passVal.current?.setSelectionRange(0, 7); range selection

    window.navigator.clipboard.writeText(password); // dont pass ref
  }, [password]);

  useEffect(() => {
    // runs if any change occurs
    passwordGenerator();
  }, [length, isCharAllowed, isNumAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-6 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center text-2xl font-semibold mb-4">
        Password Generator
      </h1>
      <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-4 bg-gray-700 text-white"
          placeholder="Password"
          readOnly
          ref={passVal} //passing refernce to passVal var
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 hover:opacity-30"
          onClick={() => {
            copyPass();
          }}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2 items-center">
        <input
          type="range"
          max={20}
          min={8}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
          className="w-full"
        />
        <span className="text-white">Length: {length}</span>
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              isNumAllowed((prev) => !prev);
            }}
            className="mr-2"
          />
          Numbers
        </label>
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              isCharAllowed((prev) => !prev);
            }}
            className="mr-2"
          />
          Characters
        </label>
      </div>
    </div>
  );
}
export default App;
