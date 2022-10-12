import ProgressBar from '../flavourIntensity/progressBar';

const FlavorIntensityProgressBar = ({ data }: any) => {
  return (
    <div>
      <span className='font-bold text-brand-dark'>{'Flavour Intensity'}</span>
      <ul className='pt-6 '>
        <div>
          <ProgressBar intensity={data?.intensity as number} />
        </div>
      </ul>
    </div>
  );
};

export default FlavorIntensityProgressBar;
