// import Image from "next/image";

import styles from "./home.module.css";
import Button from "@/app/UI/atoms/Button/"
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.home}>
        <div className={styles.grid}>
            <Button >Maps Utils</Button>
            
            <Button >
              <Link
                href={{
                  pathname: '/about',
                  query: { name: 'test' },
                }}
              >Wheather Utils</Link>
            </Button>
            <Button >API Demos</Button>
            <Button >Others</Button>
        </div>
    </div>
  );
}
