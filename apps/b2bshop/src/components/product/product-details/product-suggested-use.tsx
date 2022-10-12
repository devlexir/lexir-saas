import TagSuggestedUseLabel from '@components/ui/tag-suggested-use-label';

const ProductSuggestedUse = ({ data }: any) => {
  return (
    <div>
      <span className='font-bold text-brand-dark'>{'Suggested Use'}</span>
      <ul className='pt-6 '>
        {data?.tag?.map((item: any) => (
          <li className='inline-block p-[3px]' key={`tag-${item.id}`}>
            <TagSuggestedUseLabel data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSuggestedUse;
