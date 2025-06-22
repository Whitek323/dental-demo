import React, { Component } from 'react'
import user_example from './constant';

export default class ThemeApp extends Component {
  state = {
    backgroundUrl: `theme/${user_example.theme}/bg.jpg`
  };

  componentDidMount() {
    this.preloadBackground(`theme/${user_example.theme}/bg.jpg`, `theme/${user_example.theme}/bg.png`);
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
      <div className='min-vh-100 vw-100 d-flex flex-column justify-content-center align-items-center text-center'
        style={{
          maxHeight: '100vh',
          backgroundImage: `url(${backgroundUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      
      >
        {this.props.children}
      </div>
    )
  }
}
