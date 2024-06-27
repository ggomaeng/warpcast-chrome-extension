import { Storage } from "@plasmohq/storage";






import "./style.css"

import { useRef } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { PopoverPicker } from "~components/PopoverPicker"

function IndexPopup() {
  const [colorMain, setColorMain] = useStorage<string>({
    key: "fontColorMain",
    instance: new Storage({
      area: "local"
    })
  })

  const [colorSecond, setColorSecond] = useStorage<string>({
    key: "fontColorSecond",
    instance: new Storage({
      area: "local"
    })
  })

  const [imageUrl, setImageUrl] = useStorage<string>({
    key: "imageUrl",
    instance: new Storage({
      area: "local"
    })
  })

  const [isChecked, setIsChecked] = useStorage({
    key: "gifPFP",
    instance: new Storage({
      area: "local"
    })
  })

  const [isInnerChecked, setIsInnerChecked] = useStorage({
    key: "innerBackground",
    instance: new Storage({
      area: "local"
    })
  })

  const [isThemeActive, setThemeActive] = useStorage({
    key: "ThemeActive",
    instance: new Storage({
      area: "local"
    })
  })

  const imageUrlText = useRef<HTMLInputElement>(null)

  const handleCheckboxChange = async (event) => {
    const newValue = event.target.checked
    setIsChecked(newValue)
  }

  const handleImageUrlChange = async () => {
    if (imageUrlText.current) {
      const newValue = imageUrlText.current.value
      setImageUrl(newValue)
    }
  }

  const handleInnerBackgroundChange = async (event) => {
    const newValue = event.target.checked
    setIsInnerChecked(newValue)
  }

  const handleThemeActiveChange = async (event) => {
    const newValue = event.target.checked
    setThemeActive(newValue)
  }

  return (
    <div className="p-5 min-w-[300px]">
      <div>
        Made with ❤️ by{" "}
        <a
          className="text-blue-500"
          href="https://warpcast.com/undefined"
          target="_blank">
          @undefined
        </a>{" "}
        &{" "}
        <a
          className="text-blue-500"
          href="https://warpcast.com/jumble"
          target="_blank">
          @jumble
        </a>
      </div>
      <div className="flex items-center mt-5">
        <input
          type="checkbox"
          id="gifPFP"
          name="option"
          value="gifPFP"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="hidden peer"
        />
        <label
          htmlFor="gifPFP"
          className={`relative flex items-center cursor-pointer border-2 border-gray-300 w-10 h-5 rounded-full transition-colors duration-300 ${isChecked ? "bg-blue-500" : "bg-gray-200"}`}>
          <span
            className={`absolute left-1 top-0 w-4 h-4 bg-white border border-gray-300 rounded-full transition-transform duration-300 transform ${isChecked ? "translate-x-4" : ""}`}></span>
        </label>
        <span className="ml-2">enable gif PFP</span>
      </div>
      <div
        className={`flex items-center mt-5 gap-3 ${isThemeActive ? "" : "hidden"}`}>
        <PopoverPicker color={colorMain} onChange={setColorMain} />
        <label>Main Font Color</label>
      </div>
      <div
        className={`flex items-center mt-5 gap-3 ${isThemeActive ? "" : "hidden"}`}>
        <PopoverPicker color={colorSecond} onChange={setColorSecond} />
        <label>Secondary Font Color</label>
      </div>
      <div
        className={`flex items-center mt-5 gap-3 ${isThemeActive ? "" : "hidden"}`}>
        <button
          className="px-6 py-2 rounded-md font-semibold transition-colors duration-200 ease-in-out bg-blue-600 text-white
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800"
          onClick={handleImageUrlChange}>
          Enter
        </button>
        <input
          type="text"
          ref={imageUrlText}
          className="px-4 py-2 border rounded-md outline-none transition-colors duration-200 ease-in-out
                bg-white text-gray-900
                border-gray-300 focus:ring-2 focus:ring-blue-500
                focus:border-blue-500"
          placeholder={imageUrl ? imageUrl : "Image Url"}
        />
      </div>
      <div
        className={`flex items-center mt-5 ${isThemeActive ? "" : "hidden"}`}>
        <input
          type="checkbox"
          id="innerBackground"
          name="option"
          value="innerBackground"
          checked={isInnerChecked}
          onChange={handleInnerBackgroundChange}
          className="hidden peer"
        />
        <label
          htmlFor="innerBackground"
          className={`relative flex items-center cursor-pointer border-2 border-gray-300 w-10 h-5 rounded-full transition-colors duration-300 ${isInnerChecked ? "bg-blue-500" : "bg-gray-200"}`}>
          <span
            className={`absolute left-1 top-0 w-4 h-4 bg-white border border-gray-300 rounded-full transition-transform duration-300 transform ${isInnerChecked ? "translate-x-4" : ""}`}></span>
        </label>
        <span className="ml-2">Inner Background</span>
      </div>
      <div className="flex items-center mt-5">
        <input
          type="checkbox"
          id="ThemeActive"
          name="option"
          value="ThemeActive"
          checked={isThemeActive}
          onChange={handleThemeActiveChange}
          className="hidden peer"
        />
        <label
          htmlFor="ThemeActive"
          className={`relative flex items-center cursor-pointer border-2 border-gray-300 w-10 h-5 rounded-full transition-colors duration-300 ${isThemeActive ? "bg-blue-500" : "bg-gray-200"}`}>
          <span
            className={`absolute left-1 top-0 w-4 h-4 bg-white border border-gray-300 rounded-full transition-transform duration-300 transform ${isThemeActive ? "translate-x-4" : ""}`}></span>
        </label>
        <span className="ml-2">
          Theme {isThemeActive ? "Enabled" : "Disabled"}
        </span>
      </div>
      <br />
    </div>
  )
}

export default IndexPopup