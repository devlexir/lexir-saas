import { CloseIcon } from '@components/icons/close-icon';
import { SearchIcon } from '@components/icons/search-icon';
import cn from 'classnames';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const classes = {
  root: 'ps-10 pe-8 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal: 'bg-gray-100 border focus:bg-light focus:border-brand-dark',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-fill-base focus:border-brand-dark',
  shadow: '',
};

type SearchProps = {
  className?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  inputClassName?: string;
  onSearch: (data: SearchValue) => void;
};

type SearchValue = {
  searchText: string;
};

const Search: React.FC<SearchProps> = ({
  className,
  onSearch,
  variant = 'outline',
  shadow = false,
  inputClassName,
  ...rest
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm<SearchValue>({
    defaultValues: {
      searchText: '',
    },
  });
  const searchText = watch('searchText');

  useEffect(() => {
    if (!searchText) {
      onSearch({ searchText: '' });
    }
  }, [searchText]);

  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === 'normal',
      [classes.solid]: variant === 'solid',
      [classes.outline]: variant === 'outline',
    },
    {
      [classes.shadow]: shadow,
    },
    inputClassName
  );

  function clear() {
    reset();
    onSearch({ searchText: '' });
  }

  return (
    <form
      noValidate
      role='search'
      className={cn('w-full flex items-center relative', className)}
      onSubmit={handleSubmit(onSearch)}
    >
      <label htmlFor='searchText' className='sr-only'>
        {'form:input-label-search'}
      </label>
      {!searchText && (
        <button className='absolute p-2 outline-none end-5 focus:outline-none active:outline-none text-body'>
          <SearchIcon className='w-3.5 h-3.5 text-[#E7E7E7]' />
        </button>
      )}

      <input
        type='text'
        id='searchText'
        {...register('searchText')}
        className={rootClassName}
        placeholder={''}
        aria-label='Search'
        autoComplete='off'
        {...rest}
      />
      {errors.searchText && <p>{errors.searchText.message}</p>}
      {!!searchText && (
        <button
          type='button'
          onClick={clear}
          className='absolute p-1 outline-none md:p-2 end-5 focus:outline-none active:outline-none text-body'
        >
          <CloseIcon className='w-3.5 h-3.5 text-[#2d2d2d]' />
        </button>
      )}
    </form>
  );
};

export default Search;
