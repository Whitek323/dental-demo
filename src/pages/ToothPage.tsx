import { Component } from 'react'

export default class ToothPage extends Component {
    render() {
        return (
            <div>
                <div className="container d-flex justify-content-center align-items-center vh-100 vw-100">
                    <iframe
  className="w-100 h-100"
  title="tooth"
  src="https://needle-face-filter-examples-1ghivqzlfhy3-zlfhy3.needle.run/?"
  allow="camera; microphone"
  allowFullScreen>
</iframe>

                </div>

            </div>
        )
    }
}
