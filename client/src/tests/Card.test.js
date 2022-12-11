import React from "react"
import { render } from "@testing-library/react"

import CardComponent from "../components/Card"

const setup = () => {
  const utils = render(<CardComponent />)
  console.log("*** utils? ", utils.screen)
  const retnetionInput = utils.getByTestId("retentaion-time-input")

  return {
    retnetionInput,
    ...utils,
  }
}

test("It should retrun no retention time", () => {
  const { retnetionInput } = setup()

  expect(retnetionInput.value).toBe(undefined)
})

test("It should retrun 1000 milisecond retention time", () => {
  const { retnetionInput } = setup()
  retnetionInput.value = "1000"
  // fireEvent.change(retnetionInput, { target: { value: "1000" } })
  expect(retnetionInput.value).toBe("1000")
})
