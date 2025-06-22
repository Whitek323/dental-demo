import React, { Component } from 'react';
import "./HomePage.css";
import ImageWithFallback from '../components/ImageWithFallback';
import user_example from '../constant';

console.log(user_example)
export default class HomePage extends Component {
  render() {
    return (
      <section>
        <ImageWithFallback srcBase={`theme/${user_example.theme}/logo`} alt="logo" width={300} className="home-logo" />
        <ImageWithFallback srcBase={`theme/${user_example.theme}/banner`} alt="banner" width={300} />

        <div className="d-flex flex-column gap-3">
            <ImageWithFallback className='btn-img' navLink='/menu' srcBase={`theme/${user_example.theme}/btn-start`} alt="btn-start"/>
            <ImageWithFallback className='btn-img' navLink='/game' srcBase={`theme/${user_example.theme}/btn-ranking`} alt="btn-ranking"/>
            <ImageWithFallback className='btn-img' navLink='/menu' srcBase={`theme/${user_example.theme}/btn-exit`} alt="btn-exit"/>
        </div>
      </section>
    );
  }
}
