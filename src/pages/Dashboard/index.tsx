import React, { useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listOfMonths from "../../utils/months";

import happyImg from "../../assets/happy.svg";
import sadImg from "../../assets/sad.svg";
import grinningImg from "../../assets/grinning.svg";

import { Container, Content } from "./styles";

const Dashboard: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1,
  );

  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear(),
  );

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

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        key: String(index),
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount. Amount must be a number.");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error("Invalid amount. Amount must be a number.");
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance > 0) {
      return {
        title: "Muito Bem!",
        description: "Sua carteira está positiva!",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happyImg,
      };
    } else if (totalBalance < 0) {
      return {
        title: "Que Pena!",
        description: "Sua carteira está negativa!",
        footerText: "Tente reduzir seus gastos.",
        icon: sadImg,
      };
    } else {
      return {
        title: "Ufa!",
        description: "Sua carteira está equilibrada!",
        footerText: "Mantenha o equilíbrio para evitar problemas futuros.",
        icon: grinningImg,
      };
    }
  }, [totalBalance]);

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
          amount={totalBalance}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="dollar"
          color="#4E41f0"
        />
        <WalletBox
          title="Entradas"
          amount={totalGains}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowUp"
          color="#F7931B"
        />
        <WalletBox
          title="Saídas"
          amount={totalExpenses}
          footerlabel="atualizado com base nas entradas e saídas"
          icon="arrowDown"
          color="#E44c4E"
        />
        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
