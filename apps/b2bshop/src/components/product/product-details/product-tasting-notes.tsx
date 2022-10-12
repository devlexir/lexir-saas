import SentTasteIcon from '@components/icons/sent-taste-icon';
import TasteTasteIcon from '@components/icons/taste-taste-icon';
import EllipseIcon from '@components/icons/ellipse-icon';

const ProductTastingNotes = ({ data }: any) => {
  return (
    <div>
      <span className='font-bold text-brand-dark'>{'Tasting Notes'}</span>

      <ul className=' flex items-center pt-6'>
        <li className='relative inline-flex items-center justify-center text-sm text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 md:text-15px'>
          <SentTasteIcon className='ltr:mr-2 rtl:ml-2' />
        </li>

        <div className='flex items-center'>
          {data?.tasting_notes?.scent.map((item: any) => {
            if (
              data?.tasting_notes?.scent[data?.tasting_notes?.scent.length - 1]
                .id === item.id
            ) {
              return (
                <li className='px-2' key={`tag-${item.id}`}>
                  {item?.name}
                </li>
              );
            } else {
              return (
                <>
                  <li className='px-2' key={`tag-${item.id}`}>
                    {item?.name}
                  </li>
                  <EllipseIcon />
                </>
              );
            }
          })}
        </div>
      </ul>

      <ul className='flex items-center pt-6'>
        <li className='relative inline-flex items-center justify-center text-sm text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 md:text-15px'>
          <TasteTasteIcon className='ltr:mr-2 rtl:ml-2' />
        </li>
        <div className='flex items-center'>
          {data?.tasting_notes?.taste.map((item: any) => {
            if (
              data?.tasting_notes?.taste[data.tasting_notes.taste.length - 1]
                .id === item.id
            ) {
              return (
                <li className='px-2' key={`tag-${item.id}`}>
                  {item?.name}
                </li>
              );
            } else {
              return (
                <>
                  <li className='px-2' key={`tag-${item.id}`}>
                    {item?.name}
                  </li>
                  <EllipseIcon />
                </>
              );
            }
          })}
        </div>
      </ul>
    </div>
  );
};

export default ProductTastingNotes;
