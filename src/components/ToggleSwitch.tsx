import { Dispatch, SetStateAction } from "react";

interface ToggleSwitchProps {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  const {
    checked,
    setChecked
  } = props;

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
        style={{ display: "none" }}
      />
      <div style={{
        background: checked ? "rgb(var(--theme-rgb))" : "lightgray",
        borderRadius: "1000px",
        width: "3em",
        height: "1.5em",
        position: "relative",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}>
        <div
          style={{
            position: "absolute",
            borderRadius: "50%",
            background: "white",
            aspectRatio: 1 / 1,
            height: "calc(100% - 6px)",
            left: checked ? undefined : "3px",
            right: checked ? "3px" : undefined,
          }}
        />
      </div>
    </label>
  )
}