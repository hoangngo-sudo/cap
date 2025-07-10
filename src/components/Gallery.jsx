const Gallery = ({ images }) => {

  return (
    <div>
      <h2> Your Screenshot Gallery!</h2>
      <div className="image-container">
        {images && images.length > 0 ? (
          <div className="gallery">
            {images.map((pic, index) => (
              <div key={index} className="gallery-item">
                <img
                  className="gallery-screenshot"
                  src={pic}
                  alt="Undefined screenshot from query"
                  width="500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3>You haven't made a screenshot yet!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;