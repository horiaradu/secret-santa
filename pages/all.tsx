import { collection, getDocs, orderBy, query } from '@firebase/firestore';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { firestore } from '../lib/firebase';
import { MaybeMember, Member } from '../types';

interface Props {
  accessed: Array<MaybeMember & { id: string }>;
}

export default function All({ accessed }: Props) {
  return (
    <>
      <Head>
        <title>Secret Santa 2022</title>
        <meta name="description" content="Secret Santa 2022" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <h1 className="container mx-auto px-5 text-3xl font-bold text-center pt-5">
          Ho-Ho-Ho
        </h1>

        <ul className="container mx-auto px-5 pt-10 flex flex-col gap-4">
          {accessed.map((member) => (
            <li key={member.phone}>
              <p className="text-lg">
                {member.status === 'found' ? (
                  <span>
                    {member.phone}&nbsp;({member.name})
                  </span>
                ) : (
                  <span className="text-red-500">{member.phone}</span>
                )}
                <br />
                <span className="text-sm">
                  {new Date(parseInt(member.id)).toISOString()}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const members = collection(firestore, 'members');
  const memberQuery = query(members);

  const accessed = collection(firestore, 'accessed');
  const accessedQuery = query(accessed);

  const [membersSnapshot, accessedSnapshot] = await Promise.all([
    getDocs(memberQuery),
    getDocs(accessedQuery),
  ]);

  const allMembers = membersSnapshot.docs.map((doc) => doc.data()) as Member[];

  const allAccessed = accessedSnapshot.docs
    .map((doc) => {
      const data = doc.data() as { phone: string };
      const found = allMembers.find((member) => member.phone === data.phone);
      if (found) {
        return { status: 'found' as const, ...found, id: doc.id };
      } else {
        return { status: 'not-found' as const, ...data, id: doc.id };
      }
    })
    .reverse();

  return {
    props: {
      accessed: allAccessed,
    },
  };
};
