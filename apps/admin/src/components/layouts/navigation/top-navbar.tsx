import { NavbarIcon } from '@components/icons/navbar-icon';
import Logo from '@components/ui/logo';

import { useUI } from '@contexts/ui.context';
import { motion } from 'framer-motion';

import AuthorizedMenu from './authorized-menu';

const Navbar = () => {
  const { toggleSidebar } = useUI();

  return (
    <header className='fixed z-[999] w-full bg-white shadow-[0_4px_15px_0_rgba(0,0,0,0.1)] '>
      <nav className='flex items-center justify-between px-5 py-4 md:px-5'>
        {/* <!-- Mobile menu button --> */}
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={toggleSidebar}
          className='flex h-full items-center justify-center pr-4 focus:text-accent focus:outline-none lg:hidden'
        >
          <NavbarIcon />
        </motion.button>

        <div className='hidden me-auto md:flex'>
          <Logo />
        </div>

        <div className='flex items-center space-s-8'>
          <AuthorizedMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
