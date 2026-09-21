import React from "react";

// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {
  Container,
  SideLeft,
  LegendContainer,
  Legend,
  SideRight,
} from "./styles";

const PieChart: React.FC = () => (
  <Container>
    <SideLeft>
      <h2>Relação</h2>
      <LegendContainer>
        <Legend color="#F7931B">
          <div>45%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>55%</div>
          <span>Saídas</span>
        </Legend>
        <Legend color="#F7931B">
          <div>45%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>55%</div>
          <span>Saídas</span>
        </Legend>
        <Legend color="#F7931B">
          <div>45%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>55%</div>
          <span>Saídas</span>
        </Legend>
        <Legend color="#F7931B">
          <div>45%</div>
          <span>Entradas</span>
        </Legend>
        <Legend color="#E44C4E">
          <div>55%</div>
          <span>Saídas</span>
        </Legend>
      </LegendContainer>
    </SideLeft>

    <SideRight>
      {/* <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={[{ value: 5 }]}
            cx="50%"
            cy="50%"
            outerRadius={50}
          >
            <Cell fill="#FF0000" />
          </Pie>
        </PieChart>
      </ResponsiveContainer> */}
    </SideRight>
  </Container>
);

export default PieChart;
