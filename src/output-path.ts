import path from 'path'

type ResolveOutputPathOptions = {
  destPath: string
  folderName: string
  extension: string
  useCustomPath: boolean
  customPath: unknown
}

const OUTPUT_ROOT = 'docs'

export function resolveOutputPath({
  destPath,
  folderName,
  extension,
  useCustomPath,
  customPath
}: ResolveOutputPathOptions): string {
  const requestedPath = useCustomPath
    ? getCustomPath(customPath)
    : path.join(destPath, folderName, `index${extension}`)
  const outputPath = path.resolve(requestedPath)
  const outputRoot = path.resolve(OUTPUT_ROOT)
  const relativePath = path.relative(outputRoot, outputPath)

  if (
    relativePath === '' ||
    (!relativePath.startsWith('..') && !path.isAbsolute(relativePath))
  ) {
    return outputPath
  }

  throw new Error(`Output path must stay within ${OUTPUT_ROOT}/.`)
}

function getCustomPath(customPath: unknown): string {
  if (typeof customPath === 'string' && customPath.trim() !== '') {
    return customPath
  }

  throw new Error(
    `Custom output path must be a non-empty string inside ${OUTPUT_ROOT}/.`
  )
}
