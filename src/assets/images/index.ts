// CANNOT USE THIS FUNCTION BECAUSE OF WEBPACK LIMITATION ;(,
// require.context MUST receive literals in its parameters
export function getWebpackContext_listOfFiles(
  dir: string,
  searchSubdirectories: boolean,
  regexFilter: RegExp
) {
  return (require as any).context(dir, searchSubdirectories, regexFilter)
}

export const webpackContext_images = (require as any).context(
  "./",
  true,
  /\.(png|jpe?g|svg)$/
)

export const webpackContext_imagesPokeFight = (require as any).context(
  "./pokeFight/",
  false,
  /\.(png|jpe?g|svg)$/
)

export default webpackContext_images
