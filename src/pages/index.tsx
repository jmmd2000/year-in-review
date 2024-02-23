import Head from "next/head";
import { api } from "~/utils/api";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Head>
        <title>YearInReview - Home</title>
        <meta
          name="description"
          content="YearInReview - A web-app for tracking your year"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
