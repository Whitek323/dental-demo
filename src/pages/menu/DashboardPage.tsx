import { Component } from 'react'
import Menubar from '../../layout/Menubar'
import Navbar from '../../layout/Navbar'
import "./DashboardPage.css"
import Barchart from './Dashchild/Barchart'
import BasicLineChart from './Dashchild/BasicLineChart'
import BasicPie from './Dashchild/BasicPine'
import BasicGauges from './Dashchild/BasicGauges'
import BasicRadar from './Dashchild/BasicRadar'
import { height } from '@mui/system'


export default class DashboardPage extends Component {
  render() {
    return (
      // <div className='text-center'>Dashboard</div>
      <div>
        <Navbar />
        <div className="d-flex flex-wrap py-3 justify-content-center overflow-auto" style={{ backgroundColor: "#34323641", maxHeight: "100vh", width: "100%" }}>
          <div className="dashboardBox1 mx-2 mb-1 p-1 rounded-3"  style={{marginTop:"50px"}}>
            <div className="text-start mt-1">
              <h3 className='text-start bg-success d-inline px-1 rounded-3'>Access Frequency</h3>
            </div>
            <Barchart/>
          </div>
          <div className="dashboardBox2 mx-2 my-1 p-1 rounded-3">
            <div className="text-start my-1">
              <h3 className='text-start bg-danger d-inline px-1 rounded-3'>Game Frequency</h3>
            </div>
            <BasicPie/>
          </div>
          <div className="dashboardBox3 mx-2 my-1 p-1 rounded-3">
            <div className="text-start my-1">
              <h3 className='text-start bg-warning d-inline px-1 rounded-3'>Accuracy</h3>
            </div>
            <BasicRadar/>
          </div>
          <div className="dashboardBox4 mx-2 mt-1 p-1 rounded-3" style={{marginBottom:"100px"}}>
            <div className="text-start my-1">
              <h3 className='text-start bg-primary d-inline px-1 rounded-3'>Development</h3>
            </div>
            <BasicLineChart/>
          </div>
          <div style={{marginBottom:"300px"}}> </div>
        </div>
        <Menubar />
      </div>
    )
  }
}
