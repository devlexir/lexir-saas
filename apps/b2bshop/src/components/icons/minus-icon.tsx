const MinusIcon = ({
  color = 'currentColor',
  width = '12',
  height = '2',
  opacity = '0.8',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='transition-all'
    >
      <g opacity={opacity}>
        <path
          fillRule='evenodd'
          stroke={color}
          strokeWidth='0.5'
          clipRule='evenodd'
          d='M5 12.5C5 11.9477 5.44772 11.5 6 11.5H18C18.5523 11.5 19 11.9477 19 12.5C19 13.0523 18.5523 13.5 18 13.5H6C5.44772 13.5 5 13.0523 5 12.5Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default MinusIcon;
