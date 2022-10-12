export const DollarIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="24" fill="#85CDB4" />
      <path
        d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 32.782V37M30 17C28.63 15.63 26.218 14.678 24 14.618L30 17ZM18 30C19.288 31.72 21.686 32.7 24 32.782L18 30ZM24 14.618C21.36 14.546 19 15.74 19 19C19 25 30 22 30 28C30 31.422 27.072 32.892 24 32.782V14.618ZM24 14.618V11V14.618Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
