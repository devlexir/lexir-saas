const HomeIconBreadcrumb = ({
  color = 'currentColor',
  width = '18px',
  height = '20px',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.38611 0.210648C9.74722 -0.0702159 10.2529 -0.0702159 10.614 0.210648L19.614 7.21065C20.0499 7.54972 20.1285 8.17799 19.7894 8.61394C19.4503 9.04989 18.8221 9.12842 18.3861 8.78935L10 2.26686L1.61399 8.78935C1.17804 9.12842 0.549764 9.04989 0.210694 8.61394C-0.128376 8.17799 -0.0498418 7.54972 0.386105 7.21065L9.38611 0.210648Z'
        fill={color}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 5.5C3.55228 5.5 4 5.94772 4 6.5V17H8V14C8 13.4477 8.44772 13 9 13H11C11.5523 13 12 13.4477 12 14V17H16V7C16 6.44772 16.4477 6 17 6C17.5523 6 18 6.44772 18 7V18C18 18.5523 17.5523 19 17 19H3C2.44772 19 2 18.5523 2 18V6.5C2 5.94772 2.44772 5.5 3 5.5Z'
        fill={color}
      />
    </svg>
  );
};

export default HomeIconBreadcrumb;
