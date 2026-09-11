import React, { useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listOfMonths from "../../utils/months";

import { Container, Content } from "./styles";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1,
  );

  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear(),
  );

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        key: String(index),
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const years = useMemo(() => {
    const uniqueYears: number[] = [];

    [...expenses, ...gains].forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    return uniqueYears.map((year, index) => {
      return {
        key: String(index),
        value: year,
        label: year,
      };
    });
  }, []);

  const handleMonthSelected = (month: string) => {
    const parsedMonth = Number(month);

    if (Number.isNaN(parsedMonth)) {
      throw new Error("Invalid month value.");
    }

    setMonthSelected(parsedMonth);
  };

  const handleYearSelected = (year: string) => {
    const parsedYear = Number(year);

    if (Number.isNaN(parsedYear)) {
      throw new Error("Invalid year value.");
    }

    setYearSelected(parsedYear);
  };

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#f7931b">
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          title="Saldo"
          amount={150.0}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="dollar"
          color="#4E41f0"
        />
        <WalletBox
          title="Entradas"
          amount={5000.0}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#F7931B"
        />
        <WalletBox
          title="Saídas"
          amount={4850.0}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#E44c4E"
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
