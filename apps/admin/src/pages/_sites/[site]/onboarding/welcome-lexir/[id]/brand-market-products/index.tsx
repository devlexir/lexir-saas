import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Checkbox from '@components/ui/checkbox/checkbox';
import FormButtons from '@components/welcome-lexir/form/form-buttons';
import WelcomeLexirFormLastStep from '@components/welcome-lexir/form/form-last-step';

import { BottlesLargeSvg } from '@assets/welcome-lexir/formSteps/bottles_large_svg';
import { SpiritTypeProductSvg } from '@assets/welcome-lexir/formSteps/spirit-type-product';
import { SpiritTypeProductActivatedSvg } from '@assets/welcome-lexir/formSteps/spirit-type-product-activated';
import { WineTypeProductSvg } from '@assets/welcome-lexir/formSteps/wine-type-product';
import { WineTypeProductActivatedSvg } from '@assets/welcome-lexir/formSteps/wine-type-product-activated';
import { useStateMachine } from 'little-state-machine';

import updateAction from '../updateAction';

type FormValues = {
  input?: any;
  type_spirit?: any;
  type_wine?: any;
};

const productsOptions = [
  {
    product: <SpiritTypeProductSvg className='h-14 w-24 xl:h-28 xl:w-36' />,
    productActivated: (
      <SpiritTypeProductActivatedSvg className='h-14 w-24 xl:h-28 xl:w-36' />
    ),
    name: 'Spirit',
  },
  {
    product: <WineTypeProductSvg className='h-14 w-24 xl:h-28 xl:w-36' />,
    productActivated: (
      <WineTypeProductActivatedSvg className='h-14 w-24 xl:h-28 xl:w-36' />
    ),
    name: 'Wine',
  },
];

const spiritisList = [
  'Aperitif',
  'Aquavit',
  'Armagnac',
  'Bitter',
  'Brandy',
  'Cachaça',
  'Cognac',
  'Destilado de Agave',
  'Eau-de-Vie',
  'Genever',
  'Gin',
  'Liqueur',
  'Mezcal',
  'Non-alcoholic Spirits',
  'Pastis',
  'Pisco',
  'Port',
  'Ready to Drink Cocktail',
  'Rum',
  'Spirit',
  'Tequila',
  'Vermouth',
  'Vodka',
  'Whisky',
  'Other',
];
const wineList = ['Orange', 'Red', 'Rosé', 'Sparkling', 'White', 'Other'];

const BrandProduct = () => {
  const { actions, state } = useStateMachine({ updateAction });

  const [selectedProduct, setSelectedProduct] = useState('');

  const router = useRouter();
  const { query } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  async function onSubmit({ type_spirit, type_wine }: FormValues) {
    type_spirit &&
      actions.updateAction({
        formDetail: {
          brand_name: state.formDetail?.brand_name,
          brand_based: state.formDetail?.brand_based,
          brand_market: state.formDetail?.brand_market,
          brand_website: state.formDetail?.brand_website,
          brand_website_url: state.formDetail?.brand_website_url,
          bottles_annually: state.formDetail?.bottles_annually,
          market_begin: state.formDetail?.market_begin,
          type_spirit: type_spirit,
          type_wine: state.formDetail?.type_wine,
        },
      });
    type_wine &&
      actions.updateAction({
        formDetail: {
          brand_name: state.formDetail?.brand_name,
          brand_based: state.formDetail?.brand_based,
          brand_market: state.formDetail?.brand_market,
          brand_website: state.formDetail?.brand_website,
          brand_website_url: state.formDetail?.brand_website_url,
          bottles_annually: state.formDetail?.bottles_annually,
          market_begin: state.formDetail?.market_begin,
          type_spirit: state.formDetail?.type_spirit,
          type_wine: type_wine,
        },
      });

    router.push(`/onboarding//welcome-lexir/${query.id}/congrats`);
  }

  function handleSelection(name: string) {
    setSelectedProduct(name);
  }

  return (
    <WelcomeLexirFormLastStep
      selectedProduct={selectedProduct}
      step='7/7'
      progress={100}
      title='What type of products do you make?'
      subTitle='Please select the main type of products you make'
      image={<BottlesLargeSvg className='z-10 w-full' />}
      input={
        <>
          <span className='mt-4 flex flex-col items-center gap-4 md:flex-row'>
            {productsOptions.map((product) => (
              // eslint-disable-next-line react/jsx-key
              <button onClick={() => handleSelection(product.name)}>
                <div
                  className={`flex h-28 w-48 cursor-pointer items-center justify-center rounded-lg ${
                    selectedProduct === product.name
                      ? 'border-4 border-[#1C8C64] bg-[#F9F9F9] shadow-lg'
                      : 'border border-[#85CDB4] bg-white'
                  } p-4 hover:shadow-lg active:bg-[#1C8C64] xl:h-56 xl:w-96`}
                >
                  <span className='flex flex-col items-center gap-y-2 align-middle'>
                    <span>
                      {selectedProduct === product.name
                        ? product.productActivated
                        : product.product}
                    </span>
                    <span className=' text-base font-bold text-[#6F6F6F] xl:text-xl'>
                      {product.name}
                    </span>
                  </span>
                </div>
              </button>
            ))}
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            {selectedProduct === 'Spirit' ? (
              <div className='pt-10'>
                <div>
                  <h1 className='text-lg text-[#6F6F6F]'>
                    Please select the main types of{' '}
                    <span className='font-bold'>SPIRITS</span> you make
                  </h1>
                  <div className='grid w-[80vw] grid-cols-2 gap-x-3 gap-y-1 pt-8 md:grid-cols-3 md:gap-y-0 lg:grid-cols-4'>
                    {spiritisList.map((spirit) => (
                      // eslint-disable-next-line react/jsx-key
                      <Checkbox
                        {...register('type_spirit')}
                        label={spirit}
                        className='flex h-10'
                        value={spirit}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            {selectedProduct === 'Wine' ? (
              <div className='pt-10'>
                <div>
                  <h1 className='text-lg text-[#6F6F6F]'>
                    Please select the main types of{' '}
                    <span className='font-bold'>WINE</span> you make
                  </h1>
                  <div className='flex flex-col gap-2 pt-8 md:gap-0'>
                    {wineList.map((wine) => (
                      // eslint-disable-next-line react/jsx-key
                      <Checkbox
                        {...register('type_wine')}
                        label={wine}
                        className='flex h-10'
                        value={wine}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
            <FormButtons isDirty={isDirty} isValid={isValid} />
          </form>
        </>
      }
    />
  );
};

export default BrandProduct;
