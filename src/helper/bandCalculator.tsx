import { BAND_COLORS } from "./bandColors";

export function getResistance(bandColors: string[], isOlder: boolean): number {
  if (bandColors.length === 3 || bandColors.length === 4 || (bandColors.length === 5 && isOlder)) {
    const d1 = getSignificantDigit(bandColors[0]);
    const d2 = getSignificantDigit(bandColors[1]);
    const d = parseInt(`${d1}${d2}`);
    const m = getMultiplier(bandColors[2]);

    return d * m;
  }

  if ((bandColors.length === 5 && !isOlder) || bandColors.length === 6) {
    const d1 = getSignificantDigit(bandColors[0]);
    const d2 = getSignificantDigit(bandColors[1]);
    const d3 = getSignificantDigit(bandColors[2]);
    const d = parseInt(`${d1}${d2}${d3}`);
    const m = getMultiplier(bandColors[3]);

    return d * m;
  }

  throw new Error("Invalid number of bands");
}

const TEMPERATURE_COEFFS = {
  "black": 250,
  "brown": 100,
  "red": 50,
  "orange": 15,
  "yellow": 25,
  "green": 20,
  "blue": 10,
  "violet": 5,
  "grey": 1,
};

export function getTempCoeff(bandColors: string[], isOlder: boolean): string | null {
  if (!(bandColors.length === 6 || (bandColors.length === 5 && isOlder))) {
    return null;
  }

  const color = isOlder && bandColors.length === 5 ? bandColors[4] : bandColors[5];

  if (!(color in TEMPERATURE_COEFFS)) {
    throw new Error("Invalid color for temp coeff")
  }

  const coeff = TEMPERATURE_COEFFS[color as keyof typeof TEMPERATURE_COEFFS];
  return `${coeff}ppm/K`;
}

// Tolerance in %
export function getTolerance(bandColors: string[], isOlder: boolean): number {
  const TOLERANCES = {
    "brown": 1,
    "red": 2,
    "orange": 0.05,
    "yellow": 0.02,
    "green": 0.5,
    "blue": 0.25,
    "violet": 0.1,
    "grey": 0.01,
    "gold": 5,
    "silver": 10,
  }

  if (bandColors.length === 3) {
    return 20;
  }

  let color;
  if (bandColors.length === 5 && isOlder) {
    color = bandColors[bandColors.length - 2];
  }
  else if (bandColors.length === 4 || (bandColors.length === 5 && !isOlder)) {
    color = bandColors[bandColors.length - 1];
  }
  else if (bandColors.length === 6) {
    color = bandColors[bandColors.length - 2];
  }
  else {
    throw new Error("Invalid number of bands");
  }

  if (!BAND_COLORS.includes(color)) {
    throw new Error("Invalid color " + color);
  }

  if (!(color in TOLERANCES)) {
    throw new Error("Invalid tolerance");
  }

  return TOLERANCES[color as keyof typeof TOLERANCES];
}

export function getSignificantDigit(color: string): number {
  if (!BAND_COLORS.includes(color)) {
    throw new Error("Invalid color " + color);
  }

  if (color === "gold" || color === "silver") {
    throw new Error("Color can't be used with band");
  }

  return BAND_COLORS.indexOf(color);
}

export function getMultiplier(color: string): number {
  if (!BAND_COLORS.includes(color)) {
    throw new Error("Invalid color " + color);
  }

  if (color === "gold") {
    return 0.1;
  }

  if (color === "silver") {
    return 0.01;
  }

  const index = BAND_COLORS.indexOf(color);
  return Math.pow(10, index);
}

const prefixes = [
  "",
  "k",
  "M",
  "G",
]

export function formatResistance(resistance: number): string {
  if (resistance < 1) {
    return `${resistance.toFixed(2)} Ω`;
  }

  const log = Math.floor(Math.log10(resistance) / 3);
  const s = resistance / Math.pow(10, 3 * log);
  const prefix = prefixes[Math.max(0, log)];

  return `${s.toFixed(2)} ${prefix}Ω`;
}

export function formatTolerance(tolerance: number) {
  return `±${tolerance}%`;
}