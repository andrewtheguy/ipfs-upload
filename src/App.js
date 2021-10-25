import logo from './logo.svg';
import './App.css';

import * as IPFS from 'ipfs-core'
import {useEffect, useState} from "react";

// async function test() {
//   const ipfs = await IPFS.create();
//   const test = `jhgjhgjhgjgh89756986945635346n5jknjkfgngjkndfjkgnjk5n6jk5n6kj54n6kl54`
//   const {cid} = await ipfs.add(test)
//   console.info(cid.toString())
// }
// //
// test();


function App() {

  const [ipfs,setIpfs] = useState(null);

  const [url,setUrl] = useState(null);
  const [data,setData] = useState('');

  useEffect(()=>{
    (async () => {
      const ipfs = await IPFS.create();
      console.log('ipfs start')
      setIpfs(ipfs);
    })();

    return () => {
      if(ipfs){
        console.log('ipfs stop')
        ipfs.stop()
      }
    }
  },[])

  async function update() {
    const {cid} = await ipfs.add(data);
    const cidStr = cid.toString();
    setUrl(`https://ipfs.io/ipfs/${cidStr}`)
  }

  return (
    <div className="App">
      <section>
        <p>
        <textarea value={data} onChange={(e)=>setData(e.target.value)}/><button onClick={(e)=>update()}>update</button>
        </p>
        <p>url: {url && <span>{url}</span>}</p>
      </section>
    </div>
  );
}

export default App;
