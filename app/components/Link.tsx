import NextLink from 'next/link';
import { Link as Redlink } from '@radix-ui/themes';

interface Props {
    href: string,
    children: string
}

const Link = ({href, children}: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
        <Redlink>{children}</Redlink>
    </NextLink>
  )
}

export default Link