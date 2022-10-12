import cn from 'classnames';
import MinusIcon from '@components/icons/minus-icon';
import PlusIcon from '@components/icons/plus-icon';
import { useTranslation } from 'next-i18next';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value: number;
  variant?: 'default' | 'cart' | 'single';
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  value,
  variant = 'default',
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  const size = variant === 'single' ? '22' : '14';
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(
        'flex items-center justify-between overflow-hidden rounded',
        {
          ' rounded-3xl bg-brand-light ': variant === 'default',
          'h-10 rounded border border-[#F2F2F2] bg-brand-light md:h-[50px]':
            variant === 'single',
          'inline-flex h-10 rounded border border-[#D1D5DB] bg-brand-light':
            variant === 'cart',
        },
        className
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          'flex h-full shrink-0 items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus-visible:outline-none',
          {
            'text-heading  w-8 rounded-2xl hover:bg-fill-four ltr:ml-1 rtl:mr-1 ':
              variant === 'default',
            'text-heading h-full w-10 scale-80 border-r hover:bg-fill-four ltr:mr-auto rtl:ml-auto lg:scale-100':
              variant === 'single',
            'h-full w-9 border-r text-brand-muted hover:bg-fill-four':
              variant === 'cart',
          }
        )}
      >
        <span className='sr-only'>{t('button-minus')}</span>
        <MinusIcon width={size} height={size} opacity='1' />
      </button>
      <span
        className={cn(
          'duration-250 flex h-full shrink-0 cursor-default items-center justify-center font-semibold text-brand-dark transition-colors ease-in-out',
          {
            'w-2 text-sm md:w-4 md:text-base': variant === 'default',
            'w-12 text-base md:text-[17px]': variant === 'single',
            'w-9 text-15px': variant === 'cart',
          }
        )}
      >
        {value}
      </span>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          'group flex h-full shrink-0 items-center justify-center transition-all duration-300 ease-in-out focus:outline-none focus-visible:outline-none',
          {
            'text-heading  w-8 rounded-2xl hover:bg-fill-four ltr:mr-1 rtl:ml-1 ':
              variant === 'default',
            'text-heading h-full w-10 scale-80 border-l hover:bg-fill-four ltr:mr-auto rtl:ml-auto lg:scale-100':
              variant === 'single',
            'h-full w-9 border-l text-brand-muted hover:bg-fill-four ':
              variant === 'cart',
          }
        )}
        title={disabled ? 'Out Of Stock' : ''}
      >
        <span className='sr-only'>{t('button-plus')}</span>
        <PlusIcon width={size} height={size} opacity='1' />
      </button>
    </div>
  );
};

export default Counter;
