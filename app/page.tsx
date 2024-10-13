import { title, subtitle } from "@/components/primitives";
import SearchBar from "@/components/search-bar";

export default async function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Discover&nbsp;</span>
        <span className={title({ color: "green" })}>an amazing&nbsp;</span>
        <br />
        <span className={title()}>collection of developer portfolios.</span>
        <div className={subtitle({ class: "mt-4" })}>
          Get inspired by these exceptional sites!
        </div>
      </div>

      <SearchBar />
    </section>
  );
}
