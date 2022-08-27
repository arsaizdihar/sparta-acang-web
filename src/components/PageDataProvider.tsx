import React from 'react';

const PageDataContext = React.createContext<any>(undefined);

export const PageDataProvider = ({
  children,
  data,
}: {
  children?: React.ReactNode;
  data: any;
}) => {
  return (
    <PageDataContext.Provider value={data}>{children}</PageDataContext.Provider>
  );
};

export function usePageData<T = any>() {
  return React.useContext(PageDataContext) as T;
}
