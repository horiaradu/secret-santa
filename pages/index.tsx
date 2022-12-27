import { doc, setDoc } from '@firebase/firestore';
import { Field, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { firestore } from '../lib/firebase';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Secret Santa 2022</title>
        <meta name="description" content="Secret Santa 2022" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen relative">
        <h1 className="container mx-auto px-5 text-3xl font-bold text-center pt-5">
          Ho-Ho-Ho
        </h1>

        <h3 className="container mx-auto px-5 text-xl font-semi-bold text-center pt-10">
          Daca vrei sa-ti primesti cadoul, baga numarul de telefon mai jos.
        </h3>

        <Formik
          initialValues={{
            phone: '',
          }}
          validateOnChange={false}
          validate={({ phone }) => {
            const errors: Record<string, string> = {};

            if (
              !phone?.match(/07[0-9]{8}/g) &&
              !phone?.match(/0043[0-9]{10}/g)
            ) {
              errors.phone = `Numarul de telefon nu-i ok. Baga-l in formatul 07xxxxxxxx sau 0043xxxxxxxxxx.`;
            }

            return errors;
          }}
          onSubmit={(values) => {
            router.push(`/gift/${values.phone}`);
          }}>
          {({ errors, handleSubmit, isSubmitting }) => (
            <form
              onSubmit={handleSubmit}
              className="container mx-auto px-5 pt-10">
              <Field
                type="text"
                inputMode="numeric"
                placeholder="07xxxxxxxx / 0043xxxxxxxxxx"
                className="input border border-1 border-gray-200 rounded-2xl p-2 focus:border-gray-900 focus:outline-none w-full text-gray-900 dark:text-gray-900"
                name="phone"
              />
              {errors.phone && (
                <div className="text-red-500 text-sm pt-2">{errors.phone}</div>
              )}

              <button
                disabled={isSubmitting}
                type="submit"
                className="absolute bottom-0 left-0 rounded-lg bg-emerald-500 w-full text-gray-900 dark:text-gray-900 font-bold text-xl p-4 uppercase">
                Vreau cadou
              </button>
            </form>
          )}
        </Formik>
      </main>
    </>
  );
}
