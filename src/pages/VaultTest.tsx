import NodoAIVaultsMainCard from "../components/vault/NodoAIVaultsMainCard";
import { PageContainer } from "../components/layout/PageContainer";

export default function VaultCatalog() {
  return (
    <PageContainer className="page-container overflow-x-hidden">
      <div className="w-[550px]">
        <NodoAIVaultsMainCard />
      </div>
    </PageContainer>
  );
}
