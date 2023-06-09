import { desktop, tablet } from 'constans/responsive';

export const device = {
  mobile: `(max-width: ${tablet - 1}px)`,
  tablet: `(min-width: ${tablet}px)`,
  desktop: `(min-width: ${desktop}px)`,
  mobTab: `(max-width: ${desktop - 1}px)`,
  tabDesk: `(min-width: ${tablet}px)`,
};
