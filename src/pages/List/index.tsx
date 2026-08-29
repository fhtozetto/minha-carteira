import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

import { Container, Content, Filters } from "./styles";

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC = () => {
  const { type = "" } = useParams<{ type: string }>();
  const params = useMemo(() => {
    return type === "entry-balance"
      ? {
          title: "Entradas",
          lineColor: "#f7931b",
          data: gains,
        }
      : {
          title: "Saídas",
          lineColor: "#e44c4e",
          data: expenses,
        };
  }, [type]);

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

  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const response = params.data.map((item, index) => {
      return {
        id: String(index),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4e41f0" : "#e44c4e",
      };
    });

    setData(response);
  }, [params.data]);

  return (
    <Container>
      <ContentHeader title={params.title} lineColor={params.lineColor}>
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
