import React, { Component } from 'react';
import "./HomePage.css";
import ImageWithFallback from '../components/ImageWithFallback';
import user_example from '../constant';

export default class HomePage extends Component {

  render() {
    return (
      <section>
        <ImageWithFallback srcBase={`theme/${user_example.theme}/logo`} alt="logo" width={300} className="home-logo" />
        <ImageWithFallback srcBase={`theme/${user_example.theme}/banner`} alt="banner" width={300} />

        <div className="d-flex flex-column gap-3">
          <a href="/game" className="btn-img">
            <ImageWithFallback srcBase={`theme/${user_example.theme}/btn-start`} alt="btn-start" width={300} />
          </a>
          <a href="/game" className="btn-img">
            <ImageWithFallback srcBase={`theme/${user_example.theme}/btn-ranking`} alt="btn-ranking" width={300} />
          </a>
          <a href="/game" className="btn-img mb-3">
            <ImageWithFallback srcBase={`theme/${user_example.theme}/btn-exit`} alt="btn-exit" width={300} />
          </a>
        </div>
      </section>
    );
  }
}
