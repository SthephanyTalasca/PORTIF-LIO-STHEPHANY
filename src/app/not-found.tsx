import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container">
        <p className="eyebrow">Erro 404</p>
        <h1 className="section__title">Esta página não existe.</h1>
        <p className="section__lead">O endereço pode ter mudado. Que tal voltar para os projetos?</p>
        <Link href="/#projetos" className="btn btn--primary">Ver projetos</Link>
      </div>
    </section>
  );
}
