export const BAND_COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
  "gold",
  "silver",
];

const FIRST_SIGNIFICANT_DIGIT_COLORS = [
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

const SIGNIFICANT_DIGIT_COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

const TOLERANCE_COLORS = [
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "gold",
  "silver",
];

const TEMPERATURE_COEFF_COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
];

const OLD_MULTIPLIER_COLORS = [
  "gold",
  "silver",
]

const RENDERED_COLORS = {
  "black": "black",
  "brown": "#633a11",
  "red": "red",
  "orange": "orange",
  "yellow": "#f5ed14",
  "green": "#1ac929",
  "blue": "#1a66c9",
  "violet": "#941264",
  "grey": "#6a6a6a",
  "white": "white",
  "gold": "linear-gradient(to top left, #ccab18 0%, yellow 100%)",
  "silver": "linear-gradient(to top left, darkgray 0%, #d9d9d9 100%)",
}

const RENDERED_SVG_COLORS = {
  "black": "black",
  "brown": "#633a11",
  "red": "red",
  "orange": "orange",
  "yellow": "#f5ed14",
  "green": "#1ac929",
  "blue": "#1a66c9",
  "violet": "#941264",
  "grey": "#6a6a6a",
  "white": "white",
  "gold": "url('#gold')",
  "silver": "url('#silver')",
}

export function getRenderedColor(color: string): string {
  if (!(color in RENDERED_COLORS)) {
    throw new Error("Invalid color");
  }

  return RENDERED_COLORS[color as keyof typeof RENDERED_COLORS];
}

export function getRenderedSvgColor(color: string): string {
  if (!(color in RENDERED_SVG_COLORS)) {
    throw new Error("Invalid color");
  }

  return RENDERED_SVG_COLORS[color as keyof typeof RENDERED_SVG_COLORS];
}

export function getValidColors(numberOfBands: number, index: number, isOlder: boolean): string[] {
  if (numberOfBands === 3) {
    if (index === 0) {
      return FIRST_SIGNIFICANT_DIGIT_COLORS;
    }
    if (index === 1) {
      return SIGNIFICANT_DIGIT_COLORS;
    }
    if (index === 2) {
      return BAND_COLORS;
    }
  }

  if (numberOfBands === 4) {
    if (index === 0) {
      return FIRST_SIGNIFICANT_DIGIT_COLORS;
    }
    if (index === 1) {
      return SIGNIFICANT_DIGIT_COLORS;
    }
    if (index === 2) {
      return BAND_COLORS;
    }
    if (index === 3) {
      return TOLERANCE_COLORS;
    }
  }

  if (numberOfBands === 5) {
    if (isOlder) {
      if (index === 0) {
        return FIRST_SIGNIFICANT_DIGIT_COLORS;
      }
      if (index === 1) {
        return SIGNIFICANT_DIGIT_COLORS;
      }
      if (index === 2) {
        return OLD_MULTIPLIER_COLORS;
      }
      if (index === 3) {
        return TOLERANCE_COLORS;
      }
      if (index === 4) {
        return TEMPERATURE_COEFF_COLORS;
      }
    }

    if (index === 0) {
      return FIRST_SIGNIFICANT_DIGIT_COLORS;
    }
    if (index === 1 || index === 2) {
      return SIGNIFICANT_DIGIT_COLORS;
    }
    if (index === 3) {
      return BAND_COLORS;
    }
    if (index === 4) {
      return TOLERANCE_COLORS;
    }
  }

  if (numberOfBands === 6) {
    if (index === 0) {
      return FIRST_SIGNIFICANT_DIGIT_COLORS;
    }
    if (index === 1 || index === 2) {
      return SIGNIFICANT_DIGIT_COLORS;
    }
    if (index === 3) {
      return BAND_COLORS;
    }
    if (index === 4) {
      return TOLERANCE_COLORS;
    }
    if (index === 5) {
      return TEMPERATURE_COEFF_COLORS;
    }
  }

  throw new Error("Invalid arguments " + numberOfBands + ", " + index);
}

export function getBandNames(numberOfBands: number, isOlder: boolean): string[] {
  if (numberOfBands === 3) {
    return [
      "1st digit",
      "2nd digit",
      "Multiplier",
    ]
  }

  if (numberOfBands === 4) {
    return [
      ...getBandNames(3, false),
      "Tolerance"
    ]
  }

  if (numberOfBands === 5) {
    if (isOlder) {
      return [
        ...getBandNames(4, false),
        "Temp cf."
      ]
    }

    return [
      "1st digit",
      "2nd digit",
      "3rd digit",
      "Multiplier",
      "Tolerance"
    ]
  }

  if (numberOfBands === 6) {
    return [
      ...getBandNames(5, false),
      "Temp cf.",
      // "Temperature coefficient",
    ]
  }

  throw new Error("Invalid number of bands");
}