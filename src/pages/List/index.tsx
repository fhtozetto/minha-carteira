import React from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import { Container, Content, Filters } from "./styles";

const List: React.FC = () => {
  const month = [
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
  ];

  const years = [
    { value: 2026, label: "2026" },
    { value: 2025, label: "2025" },
    { value: 2024, label: "2024" },
  ];

  return (
    <Container>
      <ContentHeader title="Saídas" lineColor="#e44c4e">
        <SelectInput options={month} />
        <SelectInput options={years} />
      </ContentHeader>

      <Filters>
        <button type="button" className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>
        <button type="button" className="tag-filter tag-filter-eventual">
          Eventuais
        </button>
      </Filters>

      <Content>
        <HistoryFinanceCard
          tagColor="#e44c4e"
          title="Conta de Luz"
          subtitle="14/08/2026"
          amount="R$ 130,00"
        />
      </Content>
    </Container>
  );
};

export default List;
