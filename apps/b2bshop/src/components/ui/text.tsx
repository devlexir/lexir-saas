import React, { CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
}

type Variant = 'body' | 'medium' | 'small';

const Text: React.FC<Props> = ({
  style,
  className,
  variant = 'body',
  children,
  html,
}) => {
  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <p
      className={cn(
        'text-sm leading-7 ',
        {
          'text-brand-muted lg:text-base lg:leading-[27px]': variant === 'body', // default body text
          'text-brand-dark xl:text-base': variant === 'medium',
          'text-brand-muted lg:leading-[1.85em]': variant === 'small',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </p>
  );
};

export default Text;
