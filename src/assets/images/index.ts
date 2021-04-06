const stripFileName = (name: string) =>
  name.replace(/(\.\/)/g, "").replace(/(\.png)/g, "")

// @ts-ignore
const importAll = (r) => {
  const images: PokeFightImages = {}
  const setImage = (name: string, nameTrimmed: string, fileName: any) => {
    if (name.indexOf("_back") > -1)
      images[nameTrimmed].back = r(fileName).default
    else images[nameTrimmed].front = r(fileName).default
  }

  r.keys()
    .sort()
    // @ts-ignore
    .forEach((fileName) => {
      const name = stripFileName(fileName)
      const nameTrimmed = name.replace(/(_back)/g, "")
      if (!images[nameTrimmed])
        images[nameTrimmed] = { front: undefined, back: undefined }
      setImage(name, nameTrimmed, fileName)
    })
  return images
}

// @ts-ignore
const images = importAll(require.context("./", false, /\.(png|jpe?g|svg)$/))

export default images
