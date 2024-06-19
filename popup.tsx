import { Storage } from "@plasmohq/storage"

import "./style.css"

import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
  const [isChecked, setIsChecked] = useStorage({
    key: "gifPFP",
    instance: new Storage({
      area: "local"
    })
  })

  const handleCheckboxChange = async (event) => {
    const newValue = event.target.checked
    setIsChecked(newValue)
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
        />
        <label className="ml-2" htmlFor="gifPFP">
          enable gif PFP
        </label>
      </div>
      <br />
    </div>
  )
}

export default IndexPopup
