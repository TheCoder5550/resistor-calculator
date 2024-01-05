import './NumberOfBandsSelector.css'

import { Dispatch, SetStateAction } from "react";

interface NumberOfBandsSelectorProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

export default function NumberOfBandsSelector(props: NumberOfBandsSelectorProps) {
  const {
    value: selectedValue,
    setValue: setSelectedValue
  } = props;

  const values = [ 3, 4, 5, 6 ];

  return (
    <div style={{
      display: "flex",
      gap: "0.25rem",
      padding: "0.25rem",
      background: "rgba(var(--theme-rgb), 0.1)",
      borderRadius: "calc(8px + 0.25rem)",
      width: "fit-content",
    }}>
      {values.map((value, index) => (
        <button
          onClick={() => setSelectedValue(value)}
          className="selector__button"
          style={{
            background: value === selectedValue ? "rgb(var(--theme-rgb))" : undefined,
            color: value === selectedValue ? "white" : "black",
          }}
          key={index}
        >
          {value}
        </button>
      ))}
    </div>
  )
}