const Words = ({ words }) => {
  return (
    <svg className="mood_chart chart_content" width="500" height="400">
      {words.map((mood, index) => (
        <g className="mood_chart" key={index}>
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
