import FlavorIntensityProgressBar from './product-flavor-intensity';
import ProductSuggestedUse from './product-suggested-use';
import ProductTastingNotes from './product-tasting-notes';

const ProductDetail = ({ data }: any) => {
  return (
    <section className='mt-10 mb-10 flex flex-col gap-5 md:flex-row lg:mb-24 lg:mt-20'>
      <div className='md:w-[60.5%]'>
        <h3 className='text-[24px] font-bold text-brand-dark'>
          Product Details
        </h3>
        <div className='mt-8 text-brand-dark md:max-w-[697px]'>
          <p>
            Kiss My Rhubarb takes its origins from an old handwritten recipe
            from co-creators Niels’ and Wouters’ rebellious grandparents. Using
            carefully hand-selected stalks of rhubarb, and locally-sourced
            flowers and herbs, this summary aperitif perfectly expresses the
            brimming liveliness that characterizes the Belgian countryside in
            bloom.
          </p>
          <p>
            Kiss My Rhubarb is created in collaboration with local producers in
            Izegem that select only the freshest stalks of rhubarb using
            attentive and sustainable practices. By avoiding the pitfalls of
            overproduction and diminished flavour that large-scale harvesting
            methods can bring, Kiss My’s careful foraging process results in an
            aperitif that emphasises the tangy juiciness of its primary
            ingredient.
          </p>
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-y-8 md:mt-0 lg:w-[39.5%]'>
        <ProductTastingNotes data={data} />
        <FlavorIntensityProgressBar data={data} />
        <ProductSuggestedUse data={data} />
      </div>
    </section>
  );
};

export default ProductDetail;
