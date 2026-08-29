import React from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container } from "./styles";

const Dashboard: React.FC = () => {
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
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput options={month} onChange={() => {}} />
        <SelectInput options={years} onChange={() => {}} />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
