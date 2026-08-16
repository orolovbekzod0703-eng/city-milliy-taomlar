// Rasmni markazdan kvadrat shaklga keltirib, belgilangan o'lchamga siqadi.
// Har qanday o'lchamdagi rasm yuklansa ham, natija har doim 1:1 (kvadrat) bo'ladi.
export function fileToSquareBlob(file, size = 900, quality = 0.88) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onerror = () => reject(new Error("Rasmni o'qib bo'lmadi"))
    reader.onload = () => {
      img.onload = () => {
        const minSide = Math.min(img.width, img.height)
        const sx = (img.width - minSide) / 2
        const sy = (img.height - minSide) / 2

        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size)

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Rasmni qayta ishlab bo'lmadi"))
              return
            }
            resolve(blob)
          },
          'image/jpeg',
          quality
        )
      }
      img.onerror = () => reject(new Error("Rasm formatini o'qib bo'lmadi"))
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export function squarePreviewUrl(file) {
  return URL.createObjectURL(file)
}
