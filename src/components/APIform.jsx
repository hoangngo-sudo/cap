const APIform = ({inputs, handleChange, onSubmit}) => {
    
    const inputsInfo = [
        "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
        "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
        "Choose the width of your screenshot (in pixels)",
        "Choose the height of your screenshot (in pixels)",
        "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
        "Input true or false if you would like your website screenshot to not contain any ads",
    ];
    return (
        <div className="">
            <h2>Select your image attributes: </h2>
            <form className="form-container">
                {inputs &&
                    Object.entries(inputs).map(([category, value], index) => (
                    <li className="form" key={index}>
                    <h2>{category} </h2>
                    <input
                        type="text"
                        name={category}
                        value={value}
                        placeholder="Input this attribute..."
                        onChange={handleChange}
                        className="textbox"
                    />
                    <br></br>
                    <br></br>
                    <p> {inputsInfo[index]}</p>
                    </li>
                ))}

                <div className="query-container">
                  <div className="container">
                    <h3> Current Query Status: </h3>
                    <p>
                      https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
                      <br></br>
                      &url={inputs.url}
                      <br></br>
                      &format={inputs.format}
                      <br></br>
                      &width={inputs.width}
                      <br></br>
                      &height={inputs.height}
                      <br></br>
                      &no_cookie_banners={inputs.no_cookie_banners}
                      <br></br>
                      &no_ads={inputs.no_ads}
                      <br></br>
                    </p>
                  </div>
                </div>
            </form>

            <button type="submit" onClick={onSubmit} className="button">    
                Take that pic!
            </button>
        </div>
    )
}

export default APIform;