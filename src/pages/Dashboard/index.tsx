import React, { useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import { Container } from "./styles";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listOfMonths from "../../utils/months";

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
    </Container>
  );
};

export default Dashboard;
