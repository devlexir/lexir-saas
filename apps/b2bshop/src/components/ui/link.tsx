import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface Props extends NextLinkProps {
  children: React.ReactNode;
}

const Link: React.FC<Props & { className?: string }> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
