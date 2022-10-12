import CartItem from "@components/cart/item";
import CartCheckBagIcon from "@components/icons/cart-check-bag";
import { CloseIcon } from "@components/icons/close-icon";
import { EmptyCartIcon } from "@components/icons/empty-cart";
import { useCart } from "@contexts/quick-cart/cart.context";
import { useUI } from "@contexts/ui.context";
import { formatString } from "@utils/format-string";
import { fadeInOut } from "@utils/motion/fade-in-out";
import { ROUTES } from "@utils/routes";
import usePrice from "@utils/use-price";
import { AnimateSharedLayout,motion } from "framer-motion";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Cart = () => {
  const { t } = useTranslation("common");
  const { items, totalUniqueItems, total } = useCart();
  const { closeCartSidebar } = useUI();

  const router = useRouter();
  function handleCheckout() {
    router.push(ROUTES.CHECKOUT);
  }

  const { price: totalPrice } = usePrice({
    amount: total,
  });
  return (
    <section className="relative flex flex-col h-full bg-white">
      <header className="fixed top-0 z-10 flex items-center justify-between w-full h-16 max-w-md px-6 border-b border-opacity-75 bg-light border-border-200">
        <div className="flex font-semibold text-accent">
          <CartCheckBagIcon className="flex-shrink-0" width={24} height={22} />
          <span className="flex ms-2">
            {formatString(totalUniqueItems, "item")}
          </span>
        </div>
        <button
          onClick={closeCartSidebar}
          className="flex items-center justify-center transition-all duration-200 bg-gray-100 rounded-full w-7 h-7 ms-3 -me-2 text-muted focus:outline-none hover:bg-accent focus:bg-accent hover:text-light focus:text-light"
        >
          <span className="sr-only">{t("text-close")}</span>
          <CloseIcon className="w-3 h-3" />
        </button>
      </header>
      {/* End of cart header */}

      <AnimateSharedLayout>
        <motion.div layout className="flex-grow pb-20">
          {items.length > 0 ? (
            items?.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <motion.div
              layout
              initial="from"
              animate="to"
              exit="from"
              variants={fadeInOut(0.25)}
              className="flex flex-col items-center justify-center h-full"
            >
              <EmptyCartIcon className="h-28 w-28 text-accent-300" />
              <h4 className="mt-6 text-base font-semibold">
                No products found
              </h4>
            </motion.div>
          )}
        </motion.div>
      </AnimateSharedLayout>
      {/* End of cart items */}

      <footer className="fixed bottom-0 z-10 w-full max-w-md px-6 py-5 bg-light">
        <button
          className="flex justify-between w-full h-12 p-1 text-sm font-bold transition-colors rounded-full md:h-14 bg-accent shadow-700 focus:outline-none hover:bg-accent-hover focus:bg-accent-hover"
          onClick={handleCheckout}
        >
          <span className="flex items-center flex-1 h-full px-5 text-light">
            Place Order
          </span>
          <span className="flex items-center flex-shrink-0 h-full px-5 rounded-full bg-light text-accent">
            {totalPrice}
          </span>
        </button>
      </footer>
      {/* End of footer */}
    </section>
  );
};

export default Cart;
