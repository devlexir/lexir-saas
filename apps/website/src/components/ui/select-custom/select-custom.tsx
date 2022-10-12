import React from 'react';
import ReactSelect, { Props } from 'react-select';

import { selecCustomtStyles } from './select-custom.styles';

export type Ref = any;

export const SelectCustom = React.forwardRef<Ref, Props>((props, ref) => (
  <ReactSelect styles={selecCustomtStyles} {...props} ref={ref} />
));
export default SelectCustom;
