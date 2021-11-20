import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Legend,
  View,
  Axis,
  getTheme,
  Coordinate
} from 'bizcharts';
import { DataView } from '@antv/data-set';

function Labelline() {
  const data = [
    { value: 4787, type: 'SCSS' },
    { value: 119674, type: 'TypeScript' },
    { value: 2272, type: 'HTML' },
    { value: 308, type: 'JavaScript' },
  ];
  // 通过 DataSet 计算百分比
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent',
  });

  const dv1 = new DataView();
  dv1.source(data).transform({
    type: 'percent',
    field: 'value',
    dimension: 'name',
    as: 'percent',
  });

  const colors = data.reduce((pre, cur, idx) => {
    pre[cur.item] = getTheme().colors10[idx];
    return pre;
  }, {});

  return (
    <Chart
      height={400}
      data={dv.rows}
      autoFit
      scale={{
        percent: {
          formatter: (val) => {
            val = (val * 100).toFixed(2) + '%';
            return val;
          },
        }
      }}
    >
      <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
      <Axis visible={false} />
      <Legend visible={false} />
      <Tooltip showTitle={false} />
      <Interval
        adjust="stack"
        position="value"
        shape="sliceShape"
        adjust="stack"
        color="type"
        element-highlight
        style={{
          lineWidth: 0.5,
          stroke: '#fff',
        }}
        label={[
          "type",
          (item) => {
            return {
              offset: 30,
              content: (data) => {
                return data.type
              },
              style: {
                fill: colors[item],
              },
            };
          },
        ]}
      />
    </Chart>
  );
}

ReactDOM.render(<Labelline />, mountNode);
