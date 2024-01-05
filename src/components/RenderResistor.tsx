import { getRenderedSvgColor } from "../helper/bandColors";

interface RenderResistorProps {
  colorBands: string[]
}

export default function RenderResistor(props: RenderResistorProps) {
  const {
    colorBands
  } = props;

  const numberOfBands = colorBands.length;

  // const lead = () => <div style={{ width: "50px", height: "5px", background: "grey" }} />

  return (
    <svg viewBox="0 0 315 80" style={{ width: "315px", maxWidth: "100%" }}>
      <defs>
        <linearGradient id="gold" gradientTransform="rotate(45)">
          <stop offset="0%" stopColor="yellow" />
          <stop offset="100%" stopColor="#ccab18" />
        </linearGradient>

        <linearGradient id="silver" gradientTransform="rotate(45)">
          <stop offset="0%" stopColor="#d9d9d9" />
          <stop offset="100%" stopColor="darkgray" />
        </linearGradient>
      </defs>

      <rect x="-1" y="37.5" width="51" height="5" fill="grey" stroke="black" strokeWidth="2" />
      <rect x="265" y="37.5" width="51" height="5" fill="grey" stroke="black" strokeWidth="2" />

      <rect x="50" y="1" width="215" height="78" fill="#fff4c4" stroke="#f0bc69" strokeWidth="2" rx="8" />
      
      {colorBands.map((bandColor, index) => {
        const addGap = (
          numberOfBands === 4 && index >= 3 ||
          numberOfBands === 5 && index >= 4 ||
          numberOfBands === 6 && index >= 4
        );
      
        return (
          <rect key={index} x={65 + index * 25 + (addGap ? 50 : 0)} y="2" width="10" height="76" fill={getRenderedSvgColor(bandColor)} />
        )
      })}
    </svg>
    // <div style={{
    //   display: "flex",
    //   alignItems: "center",
    // }}>
    //   {lead()}

    //   <div style={{
    //     display: "flex",
    //     flexDirection: "row",
    //     gap: "15px",
    //     background: "#fff4c4",
    //     border: "2px solid #f0bc69",
    //     padding: "0 15px",
    //     width: "215px",
    //     borderRadius: "8px",
    //   }}>
    //     {colorBands.map((bandColor, index) => {
    //       const margin = (
    //         numberOfBands === 4 && index === 3 ||
    //         numberOfBands === 5 && index === 4 ||
    //         numberOfBands === 6 && index === 4
    //       ) ? 50 : 0;

    //       return (
    //         <div
    //           key={index}
    //           style={{
    //             background: getRenderedColor(bandColor),
    //             width: "10px",
    //             height: "70px",
    //             marginLeft: `${margin}px`,
    //           }}
    //         />
    //       )
    //     })}
    //   </div>

    //   {lead()}
    // </div>
  )
}