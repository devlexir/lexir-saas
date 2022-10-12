import Section2ColumnsImageText from '@components/Section2ColumnsImageText';
import SectionTestimonialsImages from '@components/SectionTestimonialsImages';
import Button from '@components/ui/button';
import Select from '@components/ui/select/select';
import { NextPage } from 'next';

const DesignSystem: NextPage = () => {
  const srcs = [
    'https://www.datocms-assets.com/30257/1649689611-capertif-brand-tall-cover-image.png?auto=format&dpr=1&w=534',
    'https://www.datocms-assets.com/30257/1649689611-capertif-brand-tall-cover-image.png?auto=format&dpr=1&w=534',
    'https://www.datocms-assets.com/30257/1649689611-capertif-brand-tall-cover-image.png?auto=format&dpr=1&w=534',
    'https://www.datocms-assets.com/30257/1649689611-capertif-brand-tall-cover-image.png?auto=format&dpr=1&w=534',
  ];

  const testimonials = [
    {
      logo: '/brands/erika-logo.png',
      testimony:
        'We’ve worked with a lot of distributors over the years, but never found one that ticked all our boxes. Lexir is the solution that we’ve searching for for years.',
      author: 'Leslie Alexander ',
      enterprise: 'Little Red Door, Bar Manager ',
    },
    {
      logo: '/brands/erika-logo.png',
      testimony:
        'It’s a pleasure to finally work with a distributor that really understands what the craft sector really needs. They have the products, prices, and  flexibility in service that we need.',
      author: 'Leslie Alexander ',
      enterprise: 'Little Red Door, Bar Manager ',
    },
    {
      logo: '/brands/erika-logo.png',
      testimony:
        'When we couldn’t find the wine that we needed for our restaurant, Lexir came to the rescue and was able to get us a new distribution relationship directly with the brand.',
      author: 'Leslie Alexander ',
      enterprise: 'Little Red Door, Bar Manager ',
    },
    {
      logo: '/brands/erika-logo.png',
      testimony:
        'Lectus commodo nascetur pulvinar ac. Sed urna, sed risus sed tempus. Eget vitae cursus nullam sagitti.',
      author: 'Leslie Alexander ',
      enterprise: 'Little Red Door, Bar Manager ',
    },
  ];

  return (
    <>
      <Button variant='normal' size='medium' className='sm:w-64'>
        SEND
      </Button>
      <br />
      <br />
      <div className='z-20 w-full me-5'>
        <Select
          placeholder='asdasdasdasdad'
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.value}
          isMulti={true}
          isClearable={false}
          isLoading={false}
          options={[
            { name: 'France', value: 'France' },
            { name: 'Portugal', value: 'Portugal' },
            { name: 'UK', value: 'UK' },
          ]}
          //   defaultInputValue={defaultInputValue}
        />
      </div>
      <Section2ColumnsImageText
        src='https://uploads-ssl.webflow.com/6244bf46bcd92a0454153da0/625099751a6f6848e6250675_direct-distribution-photo.png'
        title='Hello World 123'
        description='Hello would asdsa asdfa asdfa sasdf'
      />
      <Section2ColumnsImageText
        src='https://uploads-ssl.webflow.com/6244bf46bcd92a0454153da0/625099751a6f6848e6250675_direct-distribution-photo.png'
        title='Hello World 123'
        description='Hello would asdsa asdfa asdfa sasdf'
        imageRight
      />

      <br />
      <br />

      <SectionTestimonialsImages images={srcs} testimonials={testimonials} />
    </>
  );
};
export default DesignSystem;
