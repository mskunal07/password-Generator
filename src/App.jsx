import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  
  const [len,setLen] = useState(8);
  const [numAllow,setNumAllow] = useState(false);
  const [charAllow,setCharAllow] = useState(false);
  const [Password,setPassword] = useState("");

  // useRef hook  - - -  used to give effect to the reference variable on page which giver user satisfaction
  const PasswordRef = useRef(null);

  const copyToClipboard = useCallback( () => {

    PasswordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  } ,[Password]);

  const passGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllow) str+="1234567890";
    if(charAllow) str+="!@#$%^&*()";

    for(let i = 1;i<=len;i++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      pass += str[idx];
    }

    setPassword(pass);


  },[len,numAllow,charAllow]);

  useEffect(() => {
    passGenerator();
  },[len,numAllow,charAllow,passGenerator]) 


  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        
        <h1 className="text-white text-center"> Password Generator </h1>
        
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={Password} ref={PasswordRef} className="outline-none w-full py-1 px-3" placeholder="Password" readOnly></input>
          <button onClick={copyToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>

        <div className="flex text-sm gap-x-5">

          <div className="flex items-center gap-x-2">
            <input type="range" min={6} max={20} value={len} className="cursor-pointer" onChange={(e) => {setLen(e.target.value)}} />
            <label > Length : {len} </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input type="checkbox" defaultChecked={numAllow} id="numberInput" onChange={()=>{setNumAllow((prev) => !prev)}}     />
            <label htmlFor="numberInputs"> Numbers </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input type="checkbox" defaultChecked={charAllow} id="charInput" onChange={()=>{setCharAllow((prev) => !prev)}}     />
            <label htmlFor="charInputs"> Special Charecters </label>
          </div>

        </div>

      </div>

    </>
  )
}

export default App
