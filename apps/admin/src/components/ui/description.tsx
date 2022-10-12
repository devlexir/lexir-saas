type Props = {
  className?: string;
  title?: string;
  details?: string | JSX.Element;
  [key: string]: unknown;
};

const Description: React.FC<Props> = ({
  title,
  details,
  className,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {title && (
        <h4 className='mb-2 text-xl font-semibold text-[#6F6F6F]'>{title}</h4>
      )}
      {details && <p className='text-xs leading-6 text-[#6F6F6F]'>{details}</p>}
    </div>
  );
};

export default Description;
