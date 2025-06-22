import { BarChart } from '@mui/x-charts/BarChart';

export default function Barchart() {
  return (

    <BarChart
      xAxis={[
        {
          data: ['Jun', 'July', 'Aug'],
          tickLabelStyle: { fill: '#ffffff' },
          labelStyle: { fill: '#ffffff' },
        },
      ]}
      yAxis={[
        {
          tickLabelStyle: { fill: '#ffffff' },
          labelStyle: { fill: '#ffffff' },
        },
      ]}
      series={[
        {
          data: [29, 60, 40],
        },
      ]}
      height={300}
      sx={{

        '& .MuiChartsAxis-line': {
          stroke: '#ffffff',
        },

        '& .MuiChartsAxis-tick': {
          stroke: '#ffffff',
        },

        '& .MuiChartsGrid-line': {
          stroke: '#888',
        },
      }}
    />

  );
}