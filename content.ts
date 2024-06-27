import type { PlasmoCSConfig } from "plasmo";



import { Storage } from "@plasmohq/storage";





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

  async function changeFont(selector: string, color: string) {
    const isThemeActive = await getThemeActive()
    if (color === "" || !isThemeActive) return

    let style = document.getElementById(
      `custom-font-style-${selector}`
    ) as HTMLStyleElement

    const css = `
    ${selector} {
      color: ${color} !important;
    }
  `
    if (!style) {
      style = document.createElement("style")
      style.id = `custom-font-style-${selector}`
      style.appendChild(document.createTextNode(css))
      document.head.appendChild(style)
    } else {
      style.textContent = css
    }
  }

  async function getThemeActive() {
    const value: boolean = (await storage.get("ThemeActive")) ?? false
    return value
  }

  async function getMainColorValue() {
    const value: string = (await storage.get("fontColorMain")) ?? ""
    return value
  }

  changeFont(".text-default", await getMainColorValue())

  storage.watch({
    fontColorMain: (c) => {
      const color = c.newValue
      changeFont(".text-default", color)
    }
  })

  async function getSecondColorValue() {
    const value: string = (await storage.get("fontColorSecond")) ?? ""
    return value
  }

  changeFont("#root, body, html", await getSecondColorValue())

  storage.watch({
    fontColorSecond: (c) => {
      const color = c.newValue
      changeFont("#root, body, html", color)
    }
  })

  async function setBackgroundImage(url: string, innerBack: string | boolean) {
    if (
      window.location.hostname === "warpcast.com" &&
      (await getThemeActive())
    ) {
      let rootDiv = document.querySelector("div[data-rk]")

      if (innerBack) {
        let interval = 100
        let intervalId

        const checkAndSetBackground = () => {
          rootDiv = document.querySelector(
            ".flex.min-h-screen.flex-row.justify-center > .h-full.w-full.shrink-0.justify-center.sm\\:mr-4.sm\\:w-\\[540px\\].lg\\:w-\\[620px\\] > div.h-full.w-full"
          )

          if (rootDiv instanceof HTMLDivElement) {
            const expandedDiv = rootDiv.querySelector(
              "div.h-full.min-h-screen.border-default.sm\\:border-x.flex.flex-col.lg\\:w-\\[1023px\\].lg\\:flex-row"
            )

            if (expandedDiv) {
              rootDiv = expandedDiv
            }

            if (rootDiv instanceof HTMLDivElement) {
              interval = 1000
              clearInterval(intervalId)
              rootDiv.style.backgroundImage = `url("${url}")`
              rootDiv.style.backgroundAttachment = "fixed"
              rootDiv.style.backgroundPosition = "center"
              rootDiv.style.backgroundSize = "cover"
              rootDiv.style.backgroundRepeat = "no-repeat"

              intervalId = setInterval(checkAndSetBackground, interval)
            }
          }
        }

        intervalId = setInterval(checkAndSetBackground, interval)
      } else {
        if (rootDiv instanceof HTMLDivElement) {
          rootDiv.style.backgroundImage = `url("${url}")`
          rootDiv.style.backgroundAttachment = "fixed"
          rootDiv.style.backgroundPosition = "center"
          rootDiv.style.backgroundSize = "cover"
          rootDiv.style.backgroundRepeat = "no-repeat"
        }
      }
    }
  }

  async function getBackgroundImage() {
    const value: string = (await storage.get("imageUrl")) ?? ""
    return value
  }

  async function getInnerBackground() {
    const value: boolean = (await storage.get("innerBackground")) ?? false
    return value
  }

  setBackgroundImage(await getBackgroundImage(), await getInnerBackground())

  storage.watch({
    imageUrl: async (c) => {
      const url = c.newValue
      setBackgroundImage(url, await getInnerBackground())
    }
  })
})