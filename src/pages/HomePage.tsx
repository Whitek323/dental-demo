import React, { Component } from 'react';
import "./HomePage.css";
import ImageWithFallback from '../components/ImageWithFallback';

const theme: string = "kid";

export default class HomePage extends Component {
  state = {
    backgroundUrl: `theme/${theme}/bg.jpg`
  };

  componentDidMount() {
    this.preloadBackground(`theme/${theme}/bg.jpg`, `theme/${theme}/bg.png`);
  }

  preloadBackground = (jpgPath: string, pngPath: string) => {
    const img = new Image();
    img.src = jpgPath;
    img.onload = () => this.setState({ backgroundUrl: jpgPath });
    img.onerror = () => this.setState({ backgroundUrl: pngPath });
  };

  render() {
    const { backgroundUrl } = this.state;

    return (
      <section
        className='min-vh-100 vw-100 d-flex flex-column justify-content-center align-items-center text-center'
        style={{
          maxHeight: '100vh',
          backgroundImage: `url(${backgroundUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <ImageWithFallback srcBase={`theme/${theme}/logo`} alt="logo" width={300} className="home-logo" />
        <ImageWithFallback srcBase={`theme/${theme}/banner`} alt="banner" width={300} />

        <div className="d-flex flex-column gap-3">
          <a href="/game" className="btn-img">
            <ImageWithFallback srcBase={`theme/${theme}/btn-start`} alt="btn-start" width={300} />
          </a>
          <a href="/game" className="btn-img">
            <ImageWithFallback srcBase={`theme/${theme}/btn-ranking`} alt="btn-ranking" width={300} />
          </a>
          <a href="/game" className="btn-img mb-3">
            <ImageWithFallback srcBase={`theme/${theme}/btn-exit`} alt="btn-exit" width={300} />
          </a>
        </div>
      </section>
    );
  }
}
