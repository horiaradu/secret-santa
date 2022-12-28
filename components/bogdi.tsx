import Image from 'next/image';

export default function Bogdi() {
  return (
    <div className="container mx-auto px-5 flex flex-col gap-2 pt-5">
      <p>Pe langa tricoul de mai sus, ai mai primti ceva!</p>
      <p>
        Anu asta nu am mers la cabana, deci nu ai apucat sa-ti antrenezi
        skill-urile de sah, asa ca mai primesti cadou un abonament pe cateva
        luni la <a href="https://www.chess.com/lessons">Chess.com</a>. Acolo
        poti juca online sah (mai multe feluri, pe timp, blitz, etc.), dar au si
        lectii de tactica si de deschideri. Poate inlocuiesti scrollingu cu sahu
        :P.
      </p>

      <Image src={require(`public/bogdi2.png`)} alt="shirt" />
    </div>
  );
}
