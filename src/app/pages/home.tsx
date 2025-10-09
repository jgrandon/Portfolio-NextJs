import Image from 'next/image';
import styles from './home.module.css';
import Button from '@/app/UI/atoms/Button/'
import Link from 'next/link'
import { ThreeTest } from '@/app/components/ThreeTest';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.grid}>
        <Image
          src='/jgrandon.jpg'
          alt='Juan Grandon'
          width={500}
          height={500}
          className={styles.profilePicture}
        />
        <div>
          Mi presentacion
        </div>
      </div>
        <ThreeTest />
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
