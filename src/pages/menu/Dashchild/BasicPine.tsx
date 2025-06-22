import { PieChart } from '@mui/x-charts/PieChart';
import { pieArcLabelClasses } from '@mui/x-charts/PieChart';

export default function BasicPie() {
  const data = [
    { id: 0, value: 10, label: 'Bacteria Defender' },
    { id: 1, value: 15, label: 'Space Shooter' },
    { id: 2, value: 20, label: 'Ping Pong' },
    { id: 3, value: 10, label: 'Candy Fall' },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <PieChart
      series={[
        {
          data,
          arcLabel: (item) => `${((item.value / total) * 100).toFixed(1)}%`,
          arcLabelMinAngle: 10,      
          arcLabelRadius: '60%',     
        },
      ]}
      height={200}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: '#fff',
          fontWeight: '600',
          
        },'& .MuiChartsLegend-markLabel': {
          fill: '#fff', 
        },
      }
    
    }
    />
  );
}
