import React from "react";

export const combineComponents = (components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) =>
      ({ children }) =>
        (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        ),
    ({ children }) => <>{children}</>
  );
};
