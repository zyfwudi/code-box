import { createContext, useMemo } from "react";
import { MAIN_FILE_NAME } from "./files";
import type { IBoxContext, BoxContextProps } from "./types";
import useBoxContext from "./hooks/useBoxContext";

const initialContext: Partial<IBoxContext> = {
  selectedFileName: MAIN_FILE_NAME
}

export const BoxContext = createContext<IBoxContext>(initialContext as IBoxContext);

const BoxProvider = (props: BoxContextProps) => {
  const { children, saveOnUrl = true } = props;

  const rest = useBoxContext({
    saveOnUrl,
    selectedFileNameOrigin: initialContext.selectedFileName!
  })

  const value = useMemo(() => ({
    ...rest
  }), [rest.filesHash, rest.files, rest.selectedFileName])

  return (
    <BoxContext.Provider value={value}>{children}</BoxContext.Provider>
  )
}

export default BoxProvider
