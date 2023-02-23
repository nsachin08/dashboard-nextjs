import Head from "next/head";
import styles from "@/styles/Home.module.css";
import SignUp from "./signup";

export default function Home() {
  return (
    <>
      <Head>
        <title>Web-Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SignUp></SignUp>
      </main>
    </>
  );
}
