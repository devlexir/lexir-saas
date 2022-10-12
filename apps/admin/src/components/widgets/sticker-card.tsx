const StickerCard = ({
  titleTransKey,
  subtitleTransKey,
  icon,
  iconBgStyle,
  price,
  link,
  linkText,
  disabled,
}: any) => {
  return (
    <div
      className={`flex flex-col w-full h-full p-7 bg-light rounded-lg border 
    border-[#E7E7E7] ${
      disabled ? 'bg-slate-200' : 'hover:shadow-[0_4px_15px_0_rgba(0,0,0,0.1)]'
    }`}
    >
      <div className='w-full flex justify-between mb-auto pb-8'>
        <div className='w-full flex flex-col'>
          <span className='text-base text-heading font-semibold mb-1'>
            {titleTransKey}
          </span>
          {subtitleTransKey && (
            <span className='text-xs text-body font-semibold'>
              {subtitleTransKey}
            </span>
          )}
        </div>

        <div
          className='w-12 h-12 rounded-full bg-gray-200 flex flex-shrink-0 items-center justify-center ms-3'
          style={iconBgStyle}
        >
          {icon}
        </div>
      </div>

      <span className='text-xl font-semibold text-heading mb-2'>{price}</span>

      {link && (
        <a
          className='text-xs text-purple-700 no-underline font-semibold'
          href={link}
          target='_blank'
          rel='noreferrer'
        >
          {linkText}
        </a>
      )}
    </div>
  );
};

export default StickerCard;
