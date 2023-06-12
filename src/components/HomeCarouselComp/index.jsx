import React from 'react'
import { Carousel } from 'react-bootstrap';

const Index = () => {
  return (
    <>
     <Carousel className="carousel-card">
        <Carousel.Item>
          <img
            width={900}
            height={500}
            className="d-block w-100"
            src="https://img.freepik.com/premium-photo/pretty-girl-posing-with-attitude-wearing-desi-dress-fashion-photoshoot-pakistan-monument_658768-460.jpg?w=360"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Get the latest content</h3>
            <p>
              There are tons of different factors that go into ranking well, but
              the biggest is high-quality content.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <div>
          <img
            width={900}
            height={500}
            className="d-block w-100 car-img"
            src="https://img.freepik.com/free-photo/cute-stylish-children_155003-8330.jpg?w=996&t=st=1686303648~exp=1686304248~hmac=a082c3a76c74b994f74e0da93b194cf3fffc964b4cc183609b5e2da70c537590"
            alt="Second slide"
          />
          
          </div>

          <Carousel.Caption>
            <h3>Work life balance</h3>
            <p>The wise rest at least as hard as they work</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            width={900}
            height={500}
            className="d-block w-100 car-img"
            src="https://img.freepik.com/free-photo/young-curly-handsome-white-shirt-sitting-white-chair-high-quality-photo_144627-73569.jpg?w=996&t=st=1686304633~exp=1686305233~hmac=f0f6ec1832f5710be449505cae0fbd4fc2fdf3990a343bebeaddb1d57687cc59"
          />

          <Carousel.Caption>
            <h3>Create healthy habits, not restrictions</h3>
            <p>
              Time and health are two precious assets that we don't recognize
              and appreciate until they have been depleted.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default Index;