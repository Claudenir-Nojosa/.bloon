import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "./shared/icons";
import { TwitterIcon } from "./shared/icons";
import MaxWidthWrapper from "./shared/MaxWidthWrapper";

export default function Footer() {
  return (
    <footer className="border-t-1 border-green-500 rounded-2xl mt-20">
      <MaxWidthWrapper>
        <div className="flex justify-center md:flex-row flex-col items-center gap-2">
          <div className="flex-shrink-0 w-64 mx-auto mt-10 text-center md:mx-0 md:text-left">
            <Image
              src="https://github.com/Claudenir-Nojosa/servidor_estaticos/raw/main/site-bloon-favicon.ico"
              alt="Logo"
              height={60}
              width={60}
            />
            <p className="mt-5 text-xs text-justify dark:text-gray-400">
              Encerramos esta jornada financeira com gratidão, desejando que o
              controle de suas finanças seja a alavanca para a realização de
              seus maiores sonhos. Conte conosco para construir um futuro
              financeiro sólido e próspero.
            </p>
          </div>
          <div className="justify-end w-full text-center  items-center lg:flex">
            <div className="w-full px-4 lg:w-1/3 md:w-1/2 flex flex-col items-center">
              <h2 className="mb-2 font-bold tracking-widest dark:text-gray-100">
                Redes Sociais
              </h2>
              <ul className="space-y-2 text-sm list-none">
                <li className="mt-5">
                  <Link href={"/"}>
                    <GithubIcon />
                  </Link>
                </li>
                <li className="mt-5">
                  <Link href={"/"}>
                    <TwitterIcon />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center flex items-center mt-12 justify-center dark:text-zinc-300 pb-10">
          Todos os direitos reservados © Bloon - Gerenciando seu sucesso
          financeiro com eficiência e simplicidade.
        </p>
      </MaxWidthWrapper>
    </footer>
  );
}
