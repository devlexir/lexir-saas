export const CircleDimmedSvg = ({ ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="12" fill="#1C8C64" fillOpacity="0.2" />
      <circle cx="12" cy="12" r="6" fill="#7DBFA6" />
    </svg>
  );
};
