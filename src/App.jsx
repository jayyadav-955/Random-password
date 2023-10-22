import { useState, useCallback,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numall, setNumall] = useState(false)
  const [charall, setcharall] = useState(false)
  const [password, setPassword] = useState("")
// useref hook
const passRef=useRef(null)

  const PasswordGenerater = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numall) str += "0123456789"
    if (charall) str += "~!@#$%^&*-+/[]{}"
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass+= str.charAt(char)
    }
    setPassword(pass)

  }, [length, numall, charall,setPassword])

  const copyClip= useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{PasswordGenerater()},[length,numall,charall,PasswordGenerater])

  return (
    <>
      <div className='w-full max-w-md mx-auto bg-gray-800 px-4 mt-10 my-8 p-9 rounded-xl text-orange-500'>
        <h1 className="text-4xl text-center mb-10 text-white">Passowrd Generater</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className="outline-none w-full py-1 px-3 bg-slate-300" placeholder="Password" readonly
            ref={passRef}/>
          <button 
          onClick={copyClip}
          className='text-white bg-blue-700 outline-none px-3 py-0.5 shrink-0 hover:bg-blue-600'>Copy
          </button>
        </div>


        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gapx-x-1'>
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e) => {
               setLength(e.target.value) }} />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center ga-x-1'>
            <input type="checkbox" defaultChecked={numall} id="numberinput" onChange={() => {
              setNumall((prev) => !prev);
            }} />
            <label>Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charall} id="cahrinput" onChange={()=>{
              setcharall((prev=>!prev));
            }} />
            <label>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
