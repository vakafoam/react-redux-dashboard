interface BreakpointsInterface {
  phoneMax: string;
  tabletMin: string;
  tabletMax: string;
  desktopMin: string;
}

export const screenSizes = {
  phoneWidthMax: 767.98,
  desktopWidthMin: 992,
};

const breakpoints: BreakpointsInterface = {
  phoneMax: `(max-width: ${screenSizes.phoneWidthMax}px)`,
  tabletMin: `(min-width: ${screenSizes.phoneWidthMax + 0.02}px)`,
  tabletMax: `(max-width: ${screenSizes.desktopWidthMin - 0.02}px)`,
  desktopMin: `(min-width: ${screenSizes.desktopWidthMin}px)`,
};

export const mobileHeaderWidthMax = 1299.98;

export default breakpoints;
