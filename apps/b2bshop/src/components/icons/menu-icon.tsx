const MenuIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      width='19'
      height='16'
      viewBox='0 0 19 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M0 1H19' stroke='#2D2D2D' strokeWidth='2' />
      <path d='M0 8H19' stroke='#2D2D2D' strokeWidth='2' />
      <path d='M0 15H19' stroke='#2D2D2D' strokeWidth='2' />
    </svg>
  );
};

export default MenuIcon;
