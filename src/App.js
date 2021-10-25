import logo from './logo.svg';
import './App.css';

import * as IPFS from 'ipfs-core'
import React, {useEffect, useState} from "react";

// async function test() {
//   const ipfs = await IPFS.create();
//   const test = `jhgjhgjhgjgh89756986945635346n5jknjkfgngjkndfjkgnjk5n6jk5n6kj54n6kl54`
//   const {cid} = await ipfs.add(test)
//   console.info(cid.toString())
// }
// //
// test();


class FileInput extends React.Component {


  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //alert(
    //    `Selected file - ${this.fileInput.current.files[0].name}`);
    this.props.onFileChange(this.fileInput.current.files[0]);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Upload file:</label>
            <input type="file" className="form-control-file" ref={this.fileInput}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>

        </form>
    );
  }
}

function App() {

  const [ipfs,setIpfs] = useState(null);

  const [url,setUrl] = useState(null);
  const [file,setFile] = useState(null);
  const [data,setData] = useState(null);

  const changeFile = (file) => {
    setFile(file);
  }

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

  useEffect(()=>{
    if(!file){
      setData(null);
    }else{
      const reader = new FileReader()
      reader.onloadend = () => {
        const buffer = Buffer.from(reader.result)
        setData(buffer)
      }
      reader.readAsArrayBuffer(file)
    }
  },[file])

  useEffect(()=>{
    if(!data){
      //console.log('nothing to update');
      return;
    }
    //console.log(data);
    (async () => {
      const {cid} = await ipfs.add(data);
      const cidStr = cid.toString();
      setUrl(`https://ipfs.io/ipfs/${cidStr}`)
    })();
  },[data])

  return (
    <div className="App">
      <section>
        <div>
          <FileInput onFileChange={changeFile}/>
        </div>
        <p>url: {url && <span>{url}</span>}</p>
      </section>
    </div>
  );
}

export default App;
