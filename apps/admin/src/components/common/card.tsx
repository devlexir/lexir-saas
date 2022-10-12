import cn from 'classnames';

type Props = {
  className?: string;
  [key: string]: unknown;
};
export const Card: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn('bg-light shadow rounded', className)} {...props} />
  );
};
