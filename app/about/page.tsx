import { title } from "@/components/primitives";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
      <h1 className={title()}>About Dev Portfolio Hub</h1>

      <p className="text-lg mt-2">
        This project was sparked by Emma Bostian's Developer Portfolios. Dev Portfolio Hub aims to be a one-stop shop for devs seeking design inspiration and showcasing their GitHub repos. Currently, the portfolio data is being fetched from a community-driven source:{" "}
        <Link href="https://github.com/emmabostian/developer-portfolios" target="_blank" showAnchorIcon color="success">
          emmabostian/developer-portfolios
        </Link>
      </p>

      <h2 className={title()}>Future Features in the Pipeline</h2>

      <p>
        This project is still under active development. Feel free to jump into the <Link href="https://github.com/larry-xue/dev-portfolio-hub" target="_blank" showAnchorIcon color="success">
          codebase
        </Link> or reach out via {" "}
        <Link href="https://larryxue.dev/contact" target="_blank" showAnchorIcon color="success">
          larryxue.dev/contact
        </Link>
      </p>

      <p>If you dig this project, give it a star on GitHub! </p>

      <ul className="text-left">
        <li>
          <Checkbox defaultSelected color="success">Random Portfolio Tour</Checkbox>
        </li>
        <li><Checkbox color="success">Onboard Your Own Portfolio</Checkbox></li>
        <li><Checkbox color="success">Enhanced Navigation Menu</Checkbox></li>
        <li><Checkbox color="success">Site Summary Feature</Checkbox></li>
        <li><Checkbox color="success">Categorization System (coming soon!)</Checkbox></li>
      </ul>
    </div>
  );
}
