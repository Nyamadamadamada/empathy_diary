type Props = {
  words: {
    cx: number;
    cy: number;
    r: number;
    fill: string;
    textColor: string;
    percentage: number;
    lineY1Offset: number;
    lineY2Offset: number;
    textYOffset: number;
  }[];
  size: {
    width: number;
    height: number;
  };
};

const Words = ({ words, size }: Props) => {
  return (
    <svg className="" width={size.width} height={size.height}>
      {words.map((mood, index) => (
        <g className="" key={index}>
          <circle
            className={`mood-circle circle-${index + 1}`}
            cx={mood.cx}
            cy={mood.cy}
            r={mood.r}
            fill={mood.fill}
          ></circle>
          <text
            className="font-bold"
            textAnchor="middle"
            x={mood.cx}
            y={mood.cy + 6} // 中央に配置するため、少し下にずらす
            fill={mood.textColor}
          >
            {mood.name}
          </text>
          <line
            x1={mood.cx}
            y1={mood.cy + mood.r + (mood.lineY1Offset - mood.r)} // 円の下端から計算
            x2={mood.cx}
            y2={mood.cy + mood.r + (mood.lineY2Offset - mood.r)} // 円の下端から計算
            stroke="#000"
            strokeWidth="2"
          ></line>
          <text
            className="mood_chart_number"
            textAnchor="middle"
            x={mood.cx}
            y={mood.cy + mood.r + (mood.textYOffset - mood.r)} // 円の下端から計算
          >
            {mood.percentage}
            <tspan className="small"> 回</tspan>
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Words;
