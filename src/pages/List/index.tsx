import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

import { Container, Content, Filters } from "./styles";
//import { PiUniteSquare } from "react-icons/pi";

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC = () => {
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1),
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear()),
  );
  const [selectedFrequency, setSelectedFrequency] = useState([
    "recorrente",
    "eventual",
  ]);
  const { type = "" } = useParams<{ type: string }>();
  const params = useMemo(() => {
    return type === "entry-balance"
      ? {
          title: "Entradas",
          lineColor: "#4ad306",
          data: gains,
        }
      : {
          title: "Saídas",
          lineColor: "#e44c4e",
          data: expenses,
        };
  }, [type]);

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

    params.data.forEach((item) => {
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
  }, [params.data]);

  const [data, setData] = useState<IData[]>([]);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(
      (item) => item === frequency,
    );

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter((item) => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency]);
    }
  };

  useEffect(() => {
    const filteredData = params.data.filter((item) => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency)
      );
    });

    const formattedData = filteredData.map((item, index) => {
      return {
        id: String(index),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
      };
    });

    setData(formattedData);
  }, [params.data, monthSelected, yearSelected, selectedFrequency]);

  return (
    <Container>
      <ContentHeader title={params.title} lineColor={params.lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => setMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => setYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent
            ${selectedFrequency.includes("recorrente") && "tag-activated"}
            `}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual
            ${selectedFrequency.includes("eventual") && "tag-activated"}
            `}
          onClick={() => handleFrequencyClick("eventual")}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item) => {
          return (
            <HistoryFinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dateFormatted}
              amount={item.amountFormatted}
            />
          );
        })}
      </Content>
    </Container>
  );
};

export default List;
