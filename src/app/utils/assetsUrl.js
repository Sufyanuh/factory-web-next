export const renderUrl = (url) => {
    const oldUrl = "https://factory-universe-co.mo.cloudinary.net/dev/"
    const newUrl = "https://factory-universe-co.mo.cloudinary.net/a/dev/"

    const finalUrl = url?.replace(oldUrl, newUrl)

    return finalUrl
}