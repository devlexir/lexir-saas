import React, { JSXElementConstructor, CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
}

type Variant =
  | 'mediumHeading'
  | 'heading'
  | 'base'
  | 'title'
  | 'titleMedium'
  | 'titleLarge'
  | 'pageHeading'
  | 'subHeading'
  | 'checkoutHeading'
  | 'collectionHeading'
  | 'adHeading'
  | 'productHeading'
  | 'heroHeading';

const Heading: React.FC<Props> = ({
  style,
  className,
  variant = 'base',
  children,
  html,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    base: 'h3',
    heading: 'h2',
    mediumHeading: 'h3',
    title: 'h2', // Collection card
    titleMedium: 'h3',
    titleLarge: 'h2',
    pageHeading: 'h1',
    subHeading: 'h2',
    checkoutHeading: 'h3',
    collectionHeading: 'h1',
    adHeading: 'h1',
    productHeading: 'h1',
    heroHeading: 'h1',
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={cn(
        'text-brand-dark',
        {
          'text-15px font-semibold sm:text-base': variant === 'base',
          'text-base font-semibold xl:text-lg xl:leading-7':
            variant === 'title',
          'text-2xl font-semibold text-brand-dark': variant === 'titleMedium',
          'text-base font-semibold lg:text-lg xl:text-[20px] xl:leading-8':
            variant === 'titleLarge',
          'text-base font-medium lg:text-[17px] lg:leading-7':
            variant === 'mediumHeading',
          'text-lg font-bold lg:text-xl xl:text-[22px] xl:leading-8':
            variant === 'heading',
          'text-lg font-semibold text-brand-dark lg:text-xl xl:text-[26px] xl:leading-8 ':
            variant === 'checkoutHeading',
          'font-source_serif_pro text-5xl font-bold ':
            variant === 'collectionHeading',
          ' text-3xl font-bold text-white xl:text-4xl ':
            variant === 'adHeading',
          'font-source_serif_pro text-3xl font-bold leading-8 md:text-[34px]':
            variant === 'productHeading',
          'font-font-source_serif_pro text-4xl font-bold lg:text-5xl':
            variant === 'heroHeading',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Heading;
