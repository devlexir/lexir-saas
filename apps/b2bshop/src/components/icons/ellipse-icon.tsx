const EllipseIcon: React.FC<React.SVGAttributes<{}>> = ({ ...rest }) => {
  return (
    <svg
      width='5'
      height='5'
      viewBox='0 0 5 5'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <circle cx='2.01758' cy='2.09961' r='2' fill='#8F8F8F' />
    </svg>
  );
};

export default EllipseIcon;
