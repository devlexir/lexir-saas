import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const boxVariant = {
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.6,
      delay: 0.1,
    },
  },
  hidden: { opacity: 0, scale: 0.8, y: 200 },
};

export default function AnimationWrapper({ children }: any) {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start('visible');
    }
    // else {
    //   control.start('hidden')
    // }
  }, [control, inView]);

  return (
    <motion.div
      className='box'
      ref={ref}
      variants={boxVariant}
      initial='hidden'
      animate={control}
    >
      {children}
    </motion.div>
  );
}
