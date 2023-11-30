import type { ReactNode } from 'react';
import { createContext, useState } from 'react';

type StateContextType = [string, React.Dispatch<React.SetStateAction<string>>];

export const StateContext = createContext({} as StateContextType);
export const StateContextProvider = ({
  children,
}: {
  children: ReactNode[];
}) => {
  const [filename, setFileName] = useState('');

  return (
    <StateContext.Provider value={[filename, setFileName]}>
      {children}
    </StateContext.Provider>
  );
};
