export const DashboardIconActivated: React.FC<React.SVGAttributes<{}>> = (
  props
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="12" height="14" rx="1" fill="#1C8C64" />
    <rect
      x="26"
      y="24"
      width="12"
      height="14"
      rx="1"
      transform="rotate(-180 26 24)"
      fill="#1C8C64"
    />
    <rect y="16" width="12" height="8" rx="1" fill="#1C8C64" />
    <rect
      x="26"
      y="8"
      width="12"
      height="8"
      rx="1"
      transform="rotate(-180 26 8)"
      fill="#1C8C64"
    />
  </svg>
);
