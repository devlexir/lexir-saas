const AccountSettingsIcon: React.FC<React.SVGAttributes<{}>> = ({
  ...rest
}) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path
        d='M20.2509 12.5696V11.4221L21.6909 10.1621C21.9564 9.92811 22.1306 9.60784 22.1827 9.25787C22.2349 8.9079 22.1616 8.55076 21.9759 8.24957L20.2059 5.24957C20.0744 5.02177 19.8853 4.83256 19.6575 4.70092C19.4298 4.56928 19.1715 4.49984 18.9084 4.49957C18.7454 4.49832 18.5833 4.52366 18.4284 4.57457L16.6059 5.18957C16.2913 4.98048 15.963 4.79256 15.6234 4.62707L15.2409 2.73707C15.1723 2.39178 14.9845 2.0816 14.7103 1.86085C14.436 1.6401 14.0929 1.52283 13.7409 1.52957H10.2309C9.87895 1.52283 9.53581 1.6401 9.26158 1.86085C8.98735 2.0816 8.79951 2.39178 8.73092 2.73707L8.34842 4.62707C8.00637 4.79252 7.67565 4.98043 7.35842 5.18957L5.57342 4.54457C5.41689 4.50379 5.2548 4.48859 5.09342 4.49957C4.83038 4.49984 4.57203 4.56928 4.34429 4.70092C4.11656 4.83256 3.92744 5.02177 3.79592 5.24957L2.02592 8.24957C1.85086 8.55031 1.78581 8.90257 1.84191 9.246C1.89801 9.58943 2.07176 9.90267 2.33342 10.1321L3.75092 11.4296V12.5771L2.33342 13.8371C2.06437 14.0681 1.88586 14.3869 1.82957 14.737C1.77328 15.0871 1.84284 15.4459 2.02592 15.7496L3.79592 18.7496C3.92744 18.9774 4.11656 19.1666 4.34429 19.2982C4.57203 19.4299 4.83038 19.4993 5.09342 19.4996C5.25643 19.5008 5.41856 19.4755 5.57342 19.4246L7.39592 18.8096C7.71058 19.0187 8.0388 19.2066 8.37842 19.3721L8.76092 21.2621C8.82951 21.6074 9.01735 21.9175 9.29158 22.1383C9.56581 22.3591 9.90895 22.4763 10.2609 22.4696H13.8009C14.1529 22.4763 14.496 22.3591 14.7703 22.1383C15.0445 21.9175 15.2323 21.6074 15.3009 21.2621L15.6834 19.3721C16.0255 19.2066 16.3562 19.0187 16.6734 18.8096L18.4884 19.4246C18.6433 19.4755 18.8054 19.5008 18.9684 19.4996C19.2315 19.4993 19.4898 19.4299 19.7175 19.2982C19.9453 19.1666 20.1344 18.9774 20.2659 18.7496L21.9759 15.7496C22.151 15.4488 22.216 15.0966 22.1599 14.7532C22.1038 14.4097 21.9301 14.0965 21.6684 13.8671L20.2509 12.5696ZM18.9084 17.9996L16.3359 17.1296C15.7337 17.6397 15.0455 18.0384 14.3034 18.3071L13.7709 20.9996H10.2309L9.69842 18.3371C8.96224 18.0608 8.27771 17.6627 7.67342 17.1596L5.09342 17.9996L3.32342 14.9996L5.36342 13.1996C5.22474 12.4232 5.22474 11.6284 5.36342 10.8521L3.32342 8.99957L5.09342 5.99957L7.66592 6.86957C8.26812 6.35949 8.95637 5.96076 9.69842 5.69207L10.2309 2.99957H13.7709L14.3034 5.66207C15.0396 5.93839 15.7241 6.33643 16.3284 6.83957L18.9084 5.99957L20.6784 8.99957L18.6384 10.7996C18.7771 11.5759 18.7771 12.3707 18.6384 13.1471L20.6784 14.9996L18.9084 17.9996Z'
        fill='#2D2D2D'
      />
      <path
        d='M12 16.5C11.11 16.5 10.24 16.2361 9.49994 15.7416C8.75991 15.2471 8.18314 14.5443 7.84254 13.7221C7.50195 12.8998 7.41283 11.995 7.58647 11.1221C7.7601 10.2492 8.18868 9.44736 8.81802 8.81802C9.44736 8.18868 10.2492 7.7601 11.1221 7.58647C11.995 7.41283 12.8998 7.50195 13.7221 7.84254C14.5443 8.18314 15.2471 8.75991 15.7416 9.49994C16.2361 10.24 16.5 11.11 16.5 12C16.506 12.5926 16.3937 13.1805 16.1697 13.7292C15.9457 14.2779 15.6145 14.7763 15.1954 15.1954C14.7763 15.6145 14.2779 15.9457 13.7292 16.1697C13.1805 16.3937 12.5926 16.506 12 16.5ZM12 9C11.6035 8.99077 11.2093 9.06205 10.8411 9.20954C10.473 9.35704 10.1386 9.57768 9.85812 9.85812C9.57768 10.1386 9.35704 10.473 9.20954 10.8411C9.06205 11.2093 8.99077 11.6035 9 12C8.99077 12.3965 9.06205 12.7907 9.20954 13.1589C9.35704 13.527 9.57768 13.8615 9.85812 14.1419C10.1386 14.4223 10.473 14.643 10.8411 14.7905C11.2093 14.938 11.6035 15.0092 12 15C12.3965 15.0092 12.7907 14.938 13.1589 14.7905C13.527 14.643 13.8615 14.4223 14.1419 14.1419C14.4223 13.8615 14.643 13.527 14.7905 13.1589C14.938 12.7907 15.0092 12.3965 15 12C15.0092 11.6035 14.938 11.2093 14.7905 10.8411C14.643 10.473 14.4223 10.1386 14.1419 9.85812C13.8615 9.57768 13.527 9.35704 13.1589 9.20954C12.7907 9.06205 12.3965 8.99077 12 9Z'
        fill='#2D2D2D'
      />
    </svg>
  );
};

export default AccountSettingsIcon;