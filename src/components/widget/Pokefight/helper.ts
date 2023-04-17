import { webpackContext_imagesPokeFight } from "../../../assets/images"
import { stripFileName } from "../../../utils"

const formatToPokeFightImages = (webpackContext: any) => {
  const pokeFightImages: I_CO_IM_Stage = {}
  const imageFilenames: string[] = webpackContext.keys().sort()

  imageFilenames.forEach((fileName) => {
    const name = stripFileName(fileName)
    const nameTrimmed = name.replace(/(_back)/g, "")

    if (!pokeFightImages[nameTrimmed])
      pokeFightImages[nameTrimmed] = { front: undefined, back: undefined }

    pokeFightImages[nameTrimmed][
      name.indexOf("_back") > -1 ? "back" : "front"
    ] = webpackContext(fileName) // url / raw image data
  })

  // console.log({ imageFilenames, images })
  //   const loadImageProps = (url: string) =>
  //   new Promise(resolve => {
  //     const img = new Image();
  //     img.onload = () => resolve({ url, width: img.naturalWidth, height: img.naturalHeight });
  //     img.src = url;
  //   });

  // Promise.all(imageProps.map(({ url }) => loadImageProps(url))).then(imagePropsWithSize => {
  //   // Use imagePropsWithSize here
  // });

  return pokeFightImages
}

export const pokeFightImages = formatToPokeFightImages(
  webpackContext_imagesPokeFight
)
