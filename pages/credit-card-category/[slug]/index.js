import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {

  const { query } = useRouter()

  console.log('CATEGORY ROUTHER', query)

  return (
    <div className={styles.container}>
      <Head>
        <title>Credit Card Category</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3> Category: {query?.slug}</h3>
        <Link href="/">
          <a>Next Link /</a>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </footer>
    </div>
  );
}
