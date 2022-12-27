import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { firestore } from '../../lib/firebase';
import shirt from '../../public/shirt.png';
import { MaybeMember, Member } from '../../types';

interface Props {
  member: MaybeMember;
}

export default function Gift({ member }: Props) {
  useEffect(() => {
    if (member.phone) {
      const timestamp = Date.now().toString();
      const document = doc(firestore, `accessed/${timestamp}`);
      const data = {
        phone: member.phone,
      };
      setDoc(document, data);
    }
  }, [member.phone]);

  return (
    <>
      <Head>
        <title>Secret Santa 2022</title>
        <meta name="description" content="Secret Santa 2022" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen overflow-y-scroll">
        {member.status === 'found' ? renderFound(member) : renderNotFound()}
      </main>
    </>
  );

  function renderFound({ name, url }: Member) {
    return (
      <>
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
      </>
    );
  }

  function renderNotFound() {
    return <p>Nush cine esti...</p>;
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const { phone } = context.query as { phone: string };

  const members = collection(firestore, 'members');
  const memberQuery = query(members, where('phone', '==', phone));
  const found = await getDocs(memberQuery);

  if (found.empty) {
    return {
      props: {
        member: {
          status: 'not-found',
          phone,
        },
      },
    };
  }

  const { name, url } = found.docs[0].data();

  return {
    props: {
      member: {
        status: 'found',
        phone,
        name,
        url,
      },
    },
  };
};
