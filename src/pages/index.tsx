import { Header } from "../components";
import { MintFeltProjects } from "../components/mintFeltProjects";
import { MintNFT } from "../components/mintNFT";
import { MintZORANFT } from "../components/mintZoraProject";

function Page() {
  return (
    <>
      <Header />
      <MintZORANFT address="0xf1a08861ba3c8788cda11481d807a9e5d3e3e114" />
    </>
  );
}

export default Page;
