'use client'
import styles from "./Button.module.css";


type ButtonProps = {
    children?: React.ReactNode
    className?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props:  ButtonProps) {
  const { 
    children,
    className = '',
    onClick = (e) => {}
  } = props
  
  return (
    <button
      onClick={onClick}
      className={className + styles.button}
    >
      {children}
    </button>
  );
}
