import * as React from 'react';
import { RadarChart } from '@mui/x-charts/RadarChart';
import { RadarMetricLabels } from '@mui/x-charts/RadarChart';
import { colors } from '@mui/material';

export default function BasicRadar() {
  return (
    <RadarChart
      height={200}
      series={[{ data: [120, 98, 86, 99, 85, 65], }]}
      radar={{
        max: 120,
        metrics: [
          'Upper front teeth',
          'Upper right molar',
          'Lower right molar',
          'Lower front teeth',
          'Lower left molar',
          'Upper left molar',
        ],
      }}
      sx={{
        '& .MuiRadarMetricLabels-root': {
          fill: '#fff',
        },
        '& .MuiChartsAxis-tickLabel tspan': {
          fill: '#fff',
        },
      }}
    />
  );
}
