import { Component } from 'react'

export default class ToothPage extends Component {
    render() {
        return (
            <div>
                <div className="container d-flex justify-content-center align-items-center vh-100 vw-100">
                    <iframe
  className="w-100 h-100"
  title="tooth"
  src="https://192.168.231.127:3000/"
  allow="camera; microphone"
  allowFullScreen>
</iframe>

                </div>

            </div>
        )
    }
}
