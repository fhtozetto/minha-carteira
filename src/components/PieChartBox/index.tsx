import React from "react";

import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from "./styles";

// Tipagem dos dados do PieChartBox (alternativa)
interface IPieChartData {
  name: string;
  value: number;
  percent: number;
  color: string;
}

// Tipagem das props do componente PieChartBox
interface IPieChartBoxProps {
  data: IPieChartData[];
}

// Tipagem do componente PieChartBox usando a interface alternativa
interface IPieChartBoxProps {
  data: IPieChartData[];
}

// Tipa o shape com o payload sendo o seu dado customizado
type SliceShapeProps = PieSectorDataItem & {
  payload?: IPieChartData;
};

// Função que renderiza cada fatia usando a cor do próprio dado
const renderSlice = (props: SliceShapeProps) => {
  const { payload, ...sectorProps } = props;

  // fallback caso payload não venha preenchido
  const fill = payload?.color ?? "#8884d8";

  return <Sector {...sectorProps} fill={fill} />;
};

const PieChartBox: React.FC<IPieChartBoxProps> = ({ data }) => (
  <Container>
    <SideLeft>
      <h2>Relação (%)</h2>
      <LegendContainer>
        {data.map((indicator) => (
          <Legend key={indicator.name} color={indicator.color}>
            <div>{indicator.percent}</div>
            <span>{indicator.name}</span>
          </Legend>
        ))}
      </LegendContainer>
    </SideLeft>

    <SideRight>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="percent"
            nameKey="name"
            shape={renderSlice}
          />
        </PieChart>
      </ResponsiveContainer>
    </SideRight>
  </Container>
);

export default PieChartBox;
