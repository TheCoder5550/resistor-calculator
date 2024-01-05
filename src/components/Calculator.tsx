import "./Calculator.css";

import { useState } from "react";
import BandSelector from "./BandSelector";
import { BAND_COLORS, getBandNames, getValidColors } from "../helper/bandColors";
import NumberOfBandsSelector from "./NumberOfBandsSelector";
import copies from "../helper/copies";
import { formatResistance, formatTolerance, getResistance, getTempCoeff, getTolerance } from "../helper/bandCalculator";
import RenderResistor from "./RenderResistor";
import ToggleSwitch from "./ToggleSwitch";

export default function Calculator() {
  const [isOlder, setOlder] = useState(false);
  const [numberOfBands, setNumberOfBands] = useState(4);
  const [bandValues, setBandValues] = useState<{
    [key: string]: string[],
   }>({
    "3": [
      BAND_COLORS[1],
      BAND_COLORS[0],
      BAND_COLORS[2],
    ],
    "4": [
      BAND_COLORS[1],
      BAND_COLORS[0],
      BAND_COLORS[2],
      BAND_COLORS[10],
    ],
    "5": [
      BAND_COLORS[1],
      BAND_COLORS[0],
      BAND_COLORS[5],
      BAND_COLORS[2],
      BAND_COLORS[10],
    ],
    "5older": [
      BAND_COLORS[1],
      BAND_COLORS[0],
      BAND_COLORS[11],
      BAND_COLORS[10],
      BAND_COLORS[0],
    ],
    "6": [
      BAND_COLORS[1],
      BAND_COLORS[0],
      BAND_COLORS[5],
      BAND_COLORS[2],
      BAND_COLORS[10],
      BAND_COLORS[0],
    ]
  });

  const setBandValue = (index: number, value: string) => {
    setBandValues(oldValues => {
      const newValues = { ...oldValues };
      newValues[numberOfBands + (isOlder && numberOfBands === 5 ? "older" : "")][index] = value;
      return newValues;
    })
  }

  const getBandValues = () => {
    return bandValues[numberOfBands + (isOlder && numberOfBands === 5 ? "older" : "")];
  }

  const currentBands = getBandValues().slice(0, numberOfBands);
  const bandNames = getBandNames(numberOfBands, isOlder);

  const resistance = getResistance(currentBands, isOlder);
  const tolerance = getTolerance(currentBands, isOlder);
  const tempCoeff = getTempCoeff(currentBands, isOlder);

  return (
    <div>
      <div className="result-wrapper">
        <ResultTable
          resistance={resistance}
          tolerance={tolerance}
          temperatureCoefficient={tempCoeff}
        />
        <RenderResistor colorBands={currentBands} />
      </div>

      <br />

      <h3>Number of bands</h3>
      <div style={{
        display: "grid",
        // gridTemplateColumns: "1fr 1fr",
        // gridTemplateColumns: "repeat(min(2, auto-fit), minmax(100px, 1fr))",
        gridTemplateColumns: "repeat(auto-fit, minmax(0, min(100%/1, max(200px, 100%/3))))",
        gap: "2rem",
      }}>
        <NumberOfBandsSelector value={numberOfBands} setValue={setNumberOfBands} />

        {numberOfBands === 5 && (
          <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}>
            <ToggleSwitch checked={isOlder} setChecked={setOlder} />
            <b>Older 5 band resistor</b>
          </label>
        )}
      </div>

      <br />

      <div className="band-selectors">
        {copies(numberOfBands).map(index => (
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
            key={index}
          >
            <h5>{bandNames[index]}</h5>
            <BandSelector
              value={getBandValues()[index]}
              setValue={v => setBandValue(index, v as string)}
              name={"band" + index}
              colors={getValidColors(numberOfBands, index, isOlder)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

interface ResultTableProps {
  resistance: number;
  tolerance: number;
  temperatureCoefficient: string | null;
}

function ResultTable(props: ResultTableProps) {
  const {
    resistance,
    tolerance,
    temperatureCoefficient
  } = props;

  return (
    <div style={{
      display: "grid",
      // gridTemplateColumns: "1fr 1fr",
      // gridTemplateColumns: "repeat(min(2, auto-fit), minmax(100px, 1fr))",
      gridTemplateColumns: "repeat(auto-fit, minmax(0, min(100%/1, max(150px, 100%/3))))",
      gap: "0.5rem",
    }}>
      <b>Resistance</b>
      <span>{formatResistance(resistance)}</span>

      <b>Tolerance</b>
      <span>{formatTolerance(tolerance)}</span>

      <b>Temperature coefficient</b>
      <span style={{
        color: temperatureCoefficient === null ? "gray" : undefined,
        fontStyle: temperatureCoefficient === null ? "italic" : undefined
      }}>{temperatureCoefficient ?? "Not specified"}</span>
    </div>
  )
}