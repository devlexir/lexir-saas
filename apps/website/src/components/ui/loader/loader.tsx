import cn from 'classnames'
import Image from 'next/image'

import styles from './loader.module.css'

import loaderComponent from './loader-glass.svg'

interface Props {
  className?: string
  text?: string
  showText?: boolean
  simple?: boolean
}

const Loader = (props: Props) => {
  const { className, showText = true, text = 'Loading...', simple } = props
  return (
    <>
      {simple ? (
        <div className={cn(className, styles.simple_loading)} />
      ) : (
        <div
          className={cn(
            'flex w-full flex-col items-center justify-center',
            className
          )}
          style={{ height: 'calc(100vh - 200px)' }}
        >
          {/* <div className={styles.loading} /> */}
          <Image src={loaderComponent} />

          {/* {showText && (
            <h3 className="text-lg font-semibold italic text-body">{text}</h3>
          )} */}
        </div>
      )}
    </>
  )
}

export default Loader
