import React, { useState } from "react";

import Breadcrumb from "./Breadcrumb";
import Create from "./Create";
import List from "./List";

function Syncs() {
  const [activeSync, setActiveSync] = useState("test");
  const clearActiveSync = () => setActiveSync("");

  return (
    <div>
      <Breadcrumb activeSync={activeSync} navigateHome={clearActiveSync} />
      <Create />
      <List />
    </div>
  );
}

export default Syncs;
