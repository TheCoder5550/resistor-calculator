import "./BandSelector.css";

import { Dispatch, SetStateAction } from "react";
import toTitleCase from "../helper/toTitleCase";
import { getRenderedColor } from "../helper/bandColors";

interface BandSelectorProps {
  name: string;
  colors: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function BandSelector(props: BandSelectorProps) {
  const {
    name,
    colors,
    value,
    setValue
  } = props;

  return (
    <div className="band-selector-wrapper">
      {colors.map(color => {
        const isSelected = value == color;
        const bestContrast = (
          color === "yellow" ||
          color === "white" ||
          color === "silver" ||
          color === "gold"
        ) ? "black" : "white";
        const renderedColor = getRenderedColor(color);

        return (
          <label
            style={{
              // display: "flex",
              // alignItems: "center",
              // gap: "0.25rem",
              cursor: "pointer",
            }}
            key={color}
          >
            <input
              name={name}
              type="radio"
              value={color}
              checked={isSelected}
              onChange={e => setValue(e.target.value)}
              style={{ display: "none" }}
            ></input>
            <div
              className="band-selector-item"
              style={{
                color: isSelected || color === "white" || color === "gold" ? bestContrast : renderedColor,
                background: isSelected ? renderedColor : undefined,
                border: color === "white" && !isSelected ? "1px solid rgba(0, 0, 0, 0.1)" : undefined,
                outline: isSelected ? "2px solid black" : undefined,
                display: "flex",
                flex: "1",
                padding: "0.125rem 0.25rem",
                position: "relative",
              }}
            >
              <div style={{
                position: "absolute",
                inset: "0",
                background: renderedColor,
                opacity: "0.1",
              }} />
              <span className="band-selector-label">{toTitleCase(color)}</span>
            </div>
          </label>
        )
      })}
    </div>
  )
}