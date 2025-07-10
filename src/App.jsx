import { useState } from 'react'
import APIform from './components/APIform';
import Gallery from './components/Gallery';

import './App.css'

function App() {
  const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY
  const [inputs, setInputs] = useState({
    url:'',
    format:'',
    width:'',
    height:'',
    no_cookie_banners:'',
    no_ads:'',
  })
  
  const [prevImages, setPrevImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [quota, setQuota] = useState(null);

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    const query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    
    callAPI(query).catch(console.error);
  
  }
  
  const reset = () => {
    setInputs({
      url: "",
      format: "",
      width: "",
      height: "",
      no_cookie_banners: "",
      no_ads: "",
    });
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
  
    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
    } else {
      setCurrentImage(json.url);
      setPrevImages((prev) => [...prev, json.url]);
      reset();
      getQuota();
    }
  }

  const getQuota = async () => {
    const response = await fetch(`https://api.apiflash.com/v1/urltoimage/quota?access_key=${ACCESS_KEY}`);
    const result = await response.json();
    setQuota(result);
  }

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      width: "1920",
      height: "1080",
      no_cookie_banners: "true",
      no_ads: "true",
    };

    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
      return;
    } else {
      for (const key of Object.keys(inputs)) {
        if (inputs[key] === "") {
          inputs[key] = defaultValues[key];
        }
      }
    }
    makeQuery();
  }

  return (
    <div className="whole-page">
    {quota ? (
      <p className="quota">
      {" "}
      Remaining API calls: {quota.remaining} out of {quota.limit}
      </p>
    ) : (
      <p></p>
    )}
    <h1>Build Your Own Screenshot! 📸</h1>
    
    <APIform
      inputs={inputs}
      handleChange={(e) =>
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value.trim(),
        }))
      }
      onSubmit={submitForm}
    />
    
    <div className="screenshot-query-container">
      <div className="screenshot-container">
        {currentImage ? (
          <img
            className="screenshot"
            src={currentImage}
            alt="Screenshot returned"
          />
        ) : (
          <div className="empty-screenshot">
            <p>Your screenshot will appear here</p>
          </div>
        )}
      </div>
    </div>

    <Gallery images={prevImages} />
  </div>
  );
}

export default App
