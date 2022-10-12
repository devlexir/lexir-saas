const BoxIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      width='21'
      height='21'
      viewBox='0 0 22 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M21.5 6.25L11 1L0.5 6.25V16.75L11 22L21.5 16.75V6.25Z'
        stroke='#2D2D2D'
        strokeLinejoin='round'
      />
      <path
        d='M0.5 6.25L11 11.5M11 22V11.5M21.5 6.25L11 11.5M16.25 3.625L5.75 8.875'
        stroke='#2D2D2D'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default BoxIcon;
