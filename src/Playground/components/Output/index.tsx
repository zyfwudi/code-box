import { useContext, useMemo } from "react"
import { BoxContext } from "@/playground/box-context"
import { IMPORT_MAP_FILE_NAME } from "@/playground/files"
import { Preview } from "./preview"
import type { IOutput } from "./types"
import { getMergedCustomFiles } from "@/playground/utils"
import useOutput from "./hooks/use-output"
import useStyle from "./style"
import classNames from "classnames"

const Output = (props: IOutput) => {
  const { files: filesProps, importMap: importMapProps, style, className, importUrl } = props

  const styles = useStyle()

  const { files: filesContext } = useContext(BoxContext)

  const files = useMemo(() => {
    if (!filesProps) return filesContext

    return getMergedCustomFiles(filesProps, importMapProps) || filesContext
  }, [filesProps, filesContext])

  const {
    compiledFiles
  } = useOutput({ files, importUrl })

  const rootClassName = classNames(styles.output, className)

  return (
    <div className={rootClassName} style={style}>
      <Preview
        iframeKey={files[IMPORT_MAP_FILE_NAME]?.value}
        data={compiledFiles}
      />
    </div>
  )
}

export default Output