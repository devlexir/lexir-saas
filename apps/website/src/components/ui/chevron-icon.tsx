export const Chevron: React.FC<React.SVGAttributes<{}>> = (
  props,
  fill = '#2D2D2D'
) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M8.09534 19.6558C8.0255 19.5861 7.97008 19.5033 7.93227 19.4122C7.89446 19.3211 7.875 19.2234 7.875 19.1248C7.875 19.0261 7.89446 18.9284 7.93227 18.8373C7.97008 18.7462 8.0255 18.6634 8.09534 18.5938L14.3158 12.3748L8.09534 6.15576C7.95451 6.01493 7.87539 5.82392 7.87539 5.62476C7.87539 5.42559 7.95451 5.23459 8.09534 5.09376C8.23617 4.95293 8.42718 4.87381 8.62634 4.87381C8.8255 4.87381 9.01651 4.95293 9.15734 5.09376L15.9073 11.8438C15.9772 11.9134 16.0326 11.9962 16.0704 12.0873C16.1082 12.1784 16.1277 12.2761 16.1277 12.3748C16.1277 12.4734 16.1082 12.5711 16.0704 12.6622C16.0326 12.7533 15.9772 12.8361 15.9073 12.9058L9.15734 19.6558C9.08767 19.7256 9.00491 19.781 8.91379 19.8188C8.82267 19.8566 8.72499 19.8761 8.62634 19.8761C8.52769 19.8761 8.43001 19.8566 8.33889 19.8188C8.24777 19.781 8.16501 19.7256 8.09534 19.6558Z'
        fill={fill}
      />
    </svg>
  );
};