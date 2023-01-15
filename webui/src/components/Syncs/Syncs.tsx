import React, { useState } from "react";

import Breadcrumb from "./Breadcrumb";

function Syncs() {
  const [activeSync, setActiveSync] = useState("test");
  const clearActiveSync = () => setActiveSync("");

  return <Breadcrumb activeSync={activeSync} navigateHome={clearActiveSync} />;
}

export default Syncs;
