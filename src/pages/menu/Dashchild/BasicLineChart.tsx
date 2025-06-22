import { LineChart } from '@mui/x-charts/LineChart';

export default function BasicLineChart() {
  return (
    <LineChart
      xAxis={[
        {
          data: [1, 2, 3, 5, 8, 10],
          tickLabelStyle: { fill: '#fff' },
          labelStyle: { fill: '#fff' },
        },
      ]}
      yAxis={[
        {
          tickLabelStyle: { fill: '#fff' },
          labelStyle: { fill: '#fff' },
        },
      ]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],color:'#ff0000'
        },
      ]}
      height={200}
      sx={{
        // เส้นแกน
        '& .MuiChartsAxis-line': {
          stroke: '#ffffff',
        },
        // ขีด tick บนแกน
        '& .MuiChartsAxis-tick': {
          stroke: '#ffffff',
        },
        // ตัวเลขบนแกน
        '& .MuiChartsAxis-tickLabel tspan': {
          fill: '#ffffff',
        },
        // เส้น grid ถ้าต้องการให้เป็นขาวด้วย
        // '& .MuiChartsGrid-line': {
        //   stroke: '#ffffff',
        //   strokeOpacity: 0.2,
        // },
      }}
    />
  );
}
