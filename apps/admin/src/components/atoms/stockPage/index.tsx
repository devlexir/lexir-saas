import Cards from './cardsStock';
import ProductList from './listProductStock';

const StockPage = () => {
  return (
    <div className='p-8'>
      <Cards />
      <ProductList />
    </div>
  );
};

export default StockPage;
