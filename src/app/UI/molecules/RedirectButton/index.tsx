import {Url} from 'next/Url'
import Button from "@/app/UI/atoms/Button/"

import Link from 'next/link'

type RedirectButtonProps = {
    children?: React.ReactNode
    href: Url
}

export default function RedirectButton(props:  RedirectButtonProps) {
  const { 
    children,
    href
  } = props
  
  return (
    <Button
    >
      <Link
          href={href}
      >{children}</Link>
      
    </Button>
  );
}
