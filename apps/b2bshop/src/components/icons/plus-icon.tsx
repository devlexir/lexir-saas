const PlusIcon = ({
  color = 'currentColor',
  width = '22',
  height = '22',
  opacity = '0.8',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity={opacity}>
        <path
          fillRule='evenodd'
          stroke={color}
          clipRule='evenodd'
          d='M12 5.5C12.5523 5.5 13 5.94772 13 6.5V18.5C13 19.0523 12.5523 19.5 12 19.5C11.4477 19.5 11 19.0523 11 18.5V6.5C11 5.94772 11.4477 5.5 12 5.5Z'
          fill={color}
        />
        <path
          fillRule='evenodd'
          stroke={color}
          clipRule='evenodd'
          d='M5 12.5C5 11.9477 5.44772 11.5 6 11.5H18C18.5523 11.5 19 11.9477 19 12.5C19 13.0523 18.5523 13.5 18 13.5H6C5.44772 13.5 5 13.0523 5 12.5Z'
          fill={color}
        />
      </g>
    </svg>
  );
};

export default PlusIcon;
