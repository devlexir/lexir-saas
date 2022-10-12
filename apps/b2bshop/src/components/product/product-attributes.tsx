import SelectInput from '@components/ui/form/select-input';
import cn from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  className?: string;
  variations: any;
  attributes: any;
  setAttributes: (key: any) => void;
}

type FormValues = {
  variations?: any;
};

const ProductAttributes: React.FC<Props> = ({
  className = 'mb-2 pt-0.5',
  variations,
  attributes,
  setAttributes,
}) => {
  /**
   * State of selected option
   */
  const [variationOption, setVariationOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);

  /**
   * List of options
   */
  const variationsList: object[] = [];

  /**
   * Constructor of options
   */
  variations &&
    Object.keys(variations).map((variationName, index) =>
      variations[variationName].map((attribute: any) =>
        variationsList.push({
          label: attribute.value,
          value: attribute.value,
        })
      )
    );

  /**
   * Function for change selected option
   */
  const changeVariationFunction = (variationName: any) => {
    setVariationOption(
      //@ts-ignore
      variationsList.filter(
        (option: any) => option.value === variationName.value
      )
    );
    setAttributes((prev: any) => ({
      ...prev,
      'available-in': variationName.value,
    }));
  };

  const { register, control } = useForm<FormValues>();

  return (
    <>
      <SelectInput
        {...register('variations')}
        control={control}
        placeholder='Select a option'
        value={variationOption}
        options={variationsList}
        onChange={changeVariationFunction}
      />
    </>
  );
};

export default ProductAttributes;
