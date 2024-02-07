import {useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [char, setChar] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState();
  const [copyText, setCopyText]= useState('copy')

  const passwordRef = useRef(null);

  const passwordGenerator = () => {
    let possibleValue = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (char) {
      possibleValue += "!@#$%^&*()";
    }
    if (number) {
      possibleValue += "1234567890";
    }
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * possibleValue.length);
      pass += possibleValue.charAt(index);
    }
    setPassword(pass);
  };

  const copyToClipBoard=()=>{
    window.navigator.clipboard.writeText(password);
    setCopyText('Copied!')
    passwordRef.current?.select();
  }

  useEffect(() => {
    passwordGenerator();
    setCopyText('Copy')
  }, [length, char, number]);

  return (
    <div className="bg-gray-700 w-full mx-auto max-w-md rounded-lg px-4 py-4">
      <h1 className="text-center text-xl text-white ">Password Generator</h1>
      <div className="flex overflow-hidden my-4 mx-2">
        <input
          type="text"
          value={password}
          placeholder="Password"
          className="outline-none w-full rounded-l-xl"
          readOnly
          ref={passwordRef}
        />
        <button
          className="bg-blue-500 px-4 py-2 rounded-r-lg"
          onClick={copyToClipBoard}
        >
          {copyText}
        </button>
      </div>
      <div>
        <input
          type="range"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
          className="cursor-pointer"
        />
        <label className="text-white ml-2">{`length: ${length}`}</label>
        <input
          type="checkBox"
          className="ml-4"
          value={char}
          defaultChecked={char}
          onChange={(e) => {
            setChar((prev) => !prev);
          }}
        />
        <label className="text-white ml-1">Character</label>
        <input
          type="checkBox"
          className="ml-4"
          value={number}
          defaultChecked={number}
          onChange={(e) => {
            setNumber((prev) => !prev);
          }}
        />
        <label className="text-white ml-1">Numbers</label>
      </div>
    </div>
  );
}

export default App;
