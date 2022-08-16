/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React, { memo, useState, useCallback, CSSProperties } from "react"
import SingleInput from "./SingleInput"
import WinModal from "@/components/WinModal"
import useWindowSize, { Size } from "@/hooks/useWindowSize"
import Confetti from "react-confetti"
export interface OTPInputProps {
  length: number

  autoFocus?: boolean
  disabled?: boolean

  className?: string

  goal: string
}

export function OTPInputComponent(props: OTPInputProps) {
  const { width, height }: Size = useWindowSize()
  let [isOpen, setIsOpen] = useState(false)
  const { goal, length, autoFocus, disabled, ...rest } = props

  const [activeInput, setActiveInput] = useState(0)
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(""))

  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues]
      updatedOTPValues[activeInput] = str[0] || ""
      setOTPValues(updatedOTPValues)
    },
    [activeInput, otpValues]
  )

  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
      setActiveInput(selectedIndex)
    },
    [length]
  )

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1)
  }, [activeInput, focusInput])

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1)
  }, [activeInput, focusInput])

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index)
    },
    [focusInput]
  )

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.currentTarget.value
      if (!val) {
        e.preventDefault()
        return
      }
      changeCodeAtFocus(val)
      focusNextInput()
    },
    [changeCodeAtFocus, focusNextInput]
  )

  // Handle onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1)
  }, [])

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key

      switch (pressedKey) {
        case "Backspace":
        case "Delete": {
          e.preventDefault()
          if (otpValues[activeInput]) {
            changeCodeAtFocus("")
          } else {
            focusPrevInput()
          }
          break
        }
        case "ArrowLeft": {
          e.preventDefault()
          focusPrevInput()
          break
        }
        case "ArrowRight": {
          e.preventDefault()
          focusNextInput()
          break
        }
        default: {
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault()
          }

          break
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  )

  // Handle Submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const goalLetters = goal.split("")
    otpValues.forEach((letter, i) => {
      if (letter.toUpperCase() !== goalLetters[i]) {
        otpValues[i] = ""
      }
    })
    setOTPValues(otpValues)
    changeCodeAtFocus("")
    if (goalLetters.join("") === otpValues.join("").toUpperCase()) {
      setIsOpen(true)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className='my-2 flex flex-col'>
        <div {...rest}>
          {Array(length)
            .fill("")
            .map((_, index) => (
              <SingleInput
                key={`SingleInput-${index}`}
                className={
                  otpValues[index] === ""
                    ? "bg-neutral-100 otpInput"
                    : "bg-yellow-300 otpInput"
                }
                focus={activeInput === index}
                value={otpValues && otpValues[index]}
                autoFocus={autoFocus}
                onFocus={handleOnFocus(index)}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                onBlur={onBlur}
                disabled={disabled}
              />
            ))}
        </div>
        <button
          type='submit'
          className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded my-4'>
          Submit
        </button>
      </form>
      {isOpen && (
        <>
          <Confetti width={width} height={height} recycle={false} />
        </>
      )}
      <WinModal open={isOpen} setIsOpen={setIsOpen} source={"today"} />
    </>
  )
}

const OTPInput = memo(OTPInputComponent)
export default OTPInput
