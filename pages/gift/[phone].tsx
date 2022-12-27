import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import shirt from '../../public/shirt.png';

interface Props {
  phone: string;
  name: string;
  url: string;
}

export default function Gift({ phone, name, url }: Props) {
  return (
    <>
      <Head>
        <title>Secret Santa 2022</title>
        <meta name="description" content="Secret Santa 2022" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen relative overflow-y-scroll">
        <h1 className="container mx-auto px-5 text-3xl font-bold text-center pt-5">
          Felicitari {name}!
        </h1>

        <p className="container mx-auto px-5 pt-10 text-lg">
          Cadou ii{' '}
          <a className="underline cursor-pointer" href={url}>
            acest
          </a>{' '}
          tricou de pe{' '}
          <a className="underline cursor-pointer" href="https://inkspired.ro">
            inkspired
          </a>
          . Sper ca-ti place!
          <br />
          Daca nu, poti sa-ti iei altceva.
        </p>

        <Image
          src={shirt}
          className="container mx-auto px-5 pt-10"
          alt="shirt"
        />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { phone } = context.query;
  return {
    props: {
      phone,
      name: 'Horia',
      url: 'https://www.inkspired.ro/santa-claws-ugly-sweater-by-tobe-fonseca.html',
    },
  };
};
