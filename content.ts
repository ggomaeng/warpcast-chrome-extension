import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["https://warpcast.com/*"]
}

const storage = new Storage({
  area: "local"
})

window.addEventListener("load", async () => {
  console.log("hello from @undefined :)")

  // Function to replace all img src props on the page
  function replaceImgSrc(checked: boolean) {
    const images = document.getElementsByTagName("img")
    for (let i = 0; i < images.length; i++) {
      const src = images[i].src
      if (src.endsWith("anim=false") || src.endsWith("anim=true")) {
        if (checked) {
          images[i].src = src.replace("anim=false", "anim=true")
        } else {
          images[i].src = src.replace("anim=true", "anim=false")
        }
      }
    }
  }

  async function getCheckedValue() {
    const value: boolean = (await storage.get("gifPFP")) ?? false
    return value
  }

  // Call the function initially to replace all existing img src props
  replaceImgSrc(await getCheckedValue())

  // Mutation observer to watch for changes in the DOM
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(async (mutation) => {
      if (mutation.type === "childList") {
        replaceImgSrc(await getCheckedValue())
      }
    })
  })

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true })

  storage.watch({
    gifPFP: (c) => {
      const checked = c.newValue
      replaceImgSrc(checked)
    }
  })
})
