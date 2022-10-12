import { selectStyles } from './select.styles';
import React from 'react';
import ReactSelect, { Props } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export type Ref = any;

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef<Ref, Props>((props, ref) => (
  <ReactSelect
    styles={selectStyles}
    {...props}
    ref={ref}
    components={animatedComponents}
  />
));
export default Select;
