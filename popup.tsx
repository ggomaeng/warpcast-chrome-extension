import { useEffect, useState } from "react"

import "./style.css"

import { Storage } from "@plasmohq/storage"

const storage = new Storage()

function IndexPopup() {
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    storage.get("gifPFP").then((value) => {
      if (value !== null) {
        setIsChecked(value === "true")
      }
    })
  }, [])

  const handleCheckboxChange = (event) => {
    const newValue = event.target.checked
    setIsChecked(newValue)
    storage.set("gifPFP", newValue)
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
