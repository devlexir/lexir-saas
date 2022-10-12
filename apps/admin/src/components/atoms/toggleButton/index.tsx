const ToggleButton = ({ toggle, setToggle }: any) => {
  return (
    <div className='top-7 right-8 flex w-28 justify-center'>
      <div
        className={
          'flex h-8 w-14 cursor-pointer items-center justify-center rounded-l border p-1 duration-300  ease-in-out md:h-8 md:w-14' +
          (toggle
            ? '  border-[#CCCCCC] bg-[#FFFFFF]'
            : '  border-[#1C8C64] bg-[#1C8C64]')
        }
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <span
          className={'text-xs ' + (toggle ? 'text-[#6F6F6F]' : 'text-white')}
        >
          Sales
        </span>
      </div>
      <div
        className={
          'flex h-8 w-14 cursor-pointer items-center justify-center rounded-r border p-1 duration-300  ease-in-out md:h-8 md:w-14' +
          (toggle
            ? ' border-[#1C8C64] bg-[#1C8C64]'
            : ' border-[#CCCCCC] bg-[#FFFFFF]')
        }
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <span
          className={'text-xs ' + (toggle ? 'text-white' : 'text-[#6F6F6F]')}
        >
          Bottles
        </span>
      </div>
    </div>
  );
};

export default ToggleButton;
