import React, { useState } from "react";
import { Container, Profile, Welcome, UserName } from "./styles";

import emojis from "../../utils/emojis";

const MainHeader: React.FC = () => {
  const [emoji] = useState(() => {
    const indice = Math.floor(Math.random() * emojis.length);
    return emojis[indice];
  });
  return (
    <Container>
      <h1>Toggle</h1>

      <Profile>
        <Welcome>Olá, {emoji}</Welcome>
        <UserName>Fernando Tozetto</UserName>
      </Profile>
    </Container>
  );
};

export default MainHeader;
