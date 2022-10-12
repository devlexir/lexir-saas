const PlusProductCard = ({
  color = 'currentColor',
  width = '22',
  height = '22',
  opacity = '0.8',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 19 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect y='0.5' width='19' height='19' rx='4' fill='#F2F2F2' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.49967 4.45801C9.9369 4.45801 10.2913 4.81245 10.2913 5.24967V14.7497C10.2913 15.1869 9.9369 15.5413 9.49967 15.5413C9.06245 15.5413 8.70801 15.1869 8.70801 14.7497V5.24967C8.70801 4.81245 9.06245 4.45801 9.49967 4.45801Z'
        fill='#2D2D2D'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.95801 9.99967C3.95801 9.56245 4.31245 9.20801 4.74967 9.20801H14.2497C14.6869 9.20801 15.0413 9.56245 15.0413 9.99967C15.0413 10.4369 14.6869 10.7913 14.2497 10.7913H4.74967C4.31245 10.7913 3.95801 10.4369 3.95801 9.99967Z'
        fill='#2D2D2D'
      />
    </svg>
  );
};

export default PlusProductCard;
