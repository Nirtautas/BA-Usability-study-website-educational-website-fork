"use client";

import { createContext, useContext, useState } from "react";
import { ElementInspectorContextInterface } from "./elementInspectorTypes";

const elementInspectorContext = createContext<ElementInspectorContextInterface | null>(null);

const ElementInspectorProvider = ({ children }: { children: React.ReactNode }) => {
  const [inspectMode, setInspectMode] = useState(false);

  return <elementInspectorContext.Provider value={{ inspectMode, setInspectMode }}>{children}</elementInspectorContext.Provider>;
};

const useElementInspector = () => {
  const context = useContext(elementInspectorContext);

  if (!context) {
    throw new Error("useElementInspector must be used inside ElementInspectorProvider");
  }

  return context;
};

export { ElementInspectorProvider, useElementInspector };
