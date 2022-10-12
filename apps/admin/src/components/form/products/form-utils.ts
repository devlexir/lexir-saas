import { cartesian } from '@utils/cartesian';
import { omitTypename } from '@utils/omit-typename';

import {
  AttachmentInput,
  CreateProduct,
  Product,
  ProductStatus,
  ProductType,
  Type,
  VariationOption,
} from '@ts-types/generated';
import cloneDeep from 'lodash/cloneDeep';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import sum from 'lodash/sum';

export type ProductFormValues = Omit<
  CreateProduct,
  'type_id' | 'shop_id' | 'category' | 'tags' | 'digital_file'
> & {
  type: Pick<Type, 'id' | 'name'>;
  product_type: ProductTypeOption;
  category: string;
  brand: string;
  size: number;
  abv: number;
  b2bprice: number;
  b2cprice: number;
  digital_file_input: AttachmentInput;
  digital_file: AttachmentInput;
  is_digital: boolean;
  published: boolean;
};

export type ProductTypeOption = {
  value: ProductType;
  name: string;
};
export const productTypeOptions: ProductTypeOption[] = Object.entries(
  ProductType
).map(([key, value]) => ({
  name: key,
  value,
}));

export function getFormattedVariations(variations: any) {
  const variationGroup = groupBy(variations, 'attribute.slug');
  return Object.values(variationGroup)?.map((vg) => {
    return {
      attribute: vg?.[0]?.attribute,
      value: vg?.map((v) => ({ id: v.id, value: v.value })),
    };
  });
}

export function processOptions(options: any) {
  try {
    return JSON.parse(options);
  } catch (error) {
    return options;
  }
}

export function calculateMinMaxPrice(variationOptions: any) {
  if (!variationOptions || !variationOptions.length) {
    return {
      min_price: null,
      max_price: null,
    };
  }
  const sortedVariationsByPrice = orderBy(variationOptions, ['price']);
  const sortedVariationsBySalePrice = orderBy(variationOptions, ['sale_price']);
  return {
    min_price:
      sortedVariationsBySalePrice?.[0].sale_price <
      sortedVariationsByPrice?.[0]?.price
        ? sortedVariationsBySalePrice?.[0].sale_price
        : sortedVariationsByPrice?.[0]?.price,
    max_price:
      sortedVariationsByPrice?.[sortedVariationsByPrice?.length - 1]?.price,
  };
}

export function calculateQuantity(variationOptions: any) {
  return sum(
    variationOptions?.map(({ quantity }: { quantity: number }) => quantity)
  );
}

export function getProductDefaultValues(product: Product) {
  if (!product) {
    return {
      product_type: productTypeOptions[0],
      min_price: 0.0,
      max_price: 0.0,
      category: '',
      in_stock: true,
      is_taxable: false,
      image: [],
      gallery: [],
      status: ProductStatus.Publish,
      variations: [],
      variation_options: [],
    };
  }
  const {
    variations,
    variation_options,
    product_type,
    is_digital,
    digital_file,
  } = product;
  return cloneDeep({
    ...product,
    product_type: productTypeOptions.find(
      (option) => product_type === option.value
    ),
    ...(product_type === ProductType.Simple && {
      ...(is_digital && {
        digital_file_input: {
          id: digital_file?.attachment_id,
          thumbnail: digital_file?.url,
          original: digital_file?.url,
        },
      }),
    }),

    ...(product_type === ProductType.Variable && {
      variations: getFormattedVariations(variations),
      variation_options: variation_options?.map(({ image, ...option }: any) => {
        return {
          ...option,
          ...(!isEmpty(image) && { image: omitTypename(image) }),
          ...(option?.digital_file && {
            digital_file_input: {
              id: option?.digital_file?.attachment_id,
              thumbnail: option?.digital_file?.url,
              original: option?.digital_file?.url,
            },
          }),
        };
      }),
    }),
  });
}

export function filterAttributes(attributes: any, variations: any) {
  let res = [];
  res = attributes?.filter((el: any) => {
    return !variations?.find((element: any) => {
      return element?.attribute?.slug === el?.slug;
    });
  });
  return res;
}

export function getCartesianProduct(values: any) {
  const formattedValues = values
    ?.map((v: any) =>
      v.value?.map((a: any) => ({ name: v.attribute.name, value: a.value }))
    )
    .filter((i: any) => i !== undefined);
  if (isEmpty(formattedValues)) return [];
  return cartesian(...formattedValues);
}

export function getProductInputValues(
  subdomain: string,
  values: ProductFormValues,
  initialValues: any
) {
  const {
    product_type,
    type,
    quantity,
    image,
    is_digital,
    category,
    digital_file,
    digital_file_input,
    variation_options,
    variations,
    ...simpleValues
  } = values;
  return {
    ...simpleValues,
    subdomain: subdomain,
    is_digital: true,
    type_id: type?.id,
    product_type: 'simple',
    category: category,
    // tags: tags.map((tag) => tag?.id),
    image: omitTypename<any>(image),
    gallery: values.gallery?.map((gi: any) => omitTypename(gi)),
    quantity,
    digital_file: {
      id: initialValues?.digital_file?.id,
      attachment_id: 1, //digital_file_input.id,
      url: 1, //digital_file_input.original,
    },
    variations: [],
    variation_options: {
      upsert: [],
      delete: initialValues?.variation_options?.map(
        (variation: any) => variation?.id
      ),
    },
    ...(product_type?.value === ProductType?.Variable && {
      quantity: calculateQuantity(variation_options),
      variations: variations?.flatMap(({ value }: any) =>
        value?.map(({ id }: any) => ({ attribute_value_id: id }))
      ),
      variation_options: {
        upsert: variation_options?.map(
          ({
            options,
            id,
            digital_file,
            image: variationImage,
            digital_file_input: digital_file_input_,
            ...rest
          }: any) => ({
            ...(id !== '' ? { id } : {}),
            ...omit(rest, '__typename'),
            ...(!isEmpty(variationImage) && {
              image: omitTypename(variationImage),
            }),
            ...(rest?.is_digital && {
              digital_file: {
                id: digital_file?.id,
                attachment_id: digital_file_input_?.id,
                url: digital_file_input_?.original,
              },
            }),
            options: processOptions(options).map(
              ({ name, value }: VariationOption) => ({
                name,
                value,
              })
            ),
          })
        ),
        delete: initialValues?.variation_options
          ?.map((initialVariationOption: any) => {
            const find = variation_options?.find(
              (variationOption: any) =>
                variationOption?.id === initialVariationOption?.id
            );
            if (!find) {
              return initialVariationOption?.id;
            }
          })
          .filter((item: any) => item !== undefined),
      },
    }),
    ...calculateMinMaxPrice(variation_options),
  };
}
