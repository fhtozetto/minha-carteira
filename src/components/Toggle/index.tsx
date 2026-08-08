import React, { useState } from "react";

import { Container, ToggleLabel, ToggleSelector } from "./style";

const Toggle: React.FC = () => {
  const [online, setOnline] = useState<boolean>(false);

  return (
    <Container>
      <ToggleLabel>Light</ToggleLabel>
      <ToggleSelector
        checked={online}
        checkedIcon={false}
        uncheckedIcon={false}
        onChange={() => setOnline(!online)}
      />
      <ToggleLabel>Dark</ToggleLabel>
    </Container>
  );
};

export default Toggle;
