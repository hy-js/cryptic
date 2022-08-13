import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
type Props = {
  open: boolean
  setIsOpen: (val: boolean) => void
}

export const HelpModal: React.FC<Props> = ({ open, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false)
  }
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-2xl font-medium leading-6 text-gray-900 text-center'>
                    <div>
                      {/* <h2 className='text-xl text-[1.75rem] leading-normal font-extrabold cursor-pointer'>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          W
                        </span>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          E
                        </span>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          L
                        </span>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          C
                        </span>
                      </h2>
                      <h2 className='text-xl text-[1.75rem] leading-normal font-extrabold cursor-pointer'>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          O
                        </span>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          M
                        </span>
                        <span className='bg-yellow-300  border-2 px-2 m-1 border-gray-500'>
                          E
                        </span>
                        <span className='px-2 m-1 '>to</span>
                      </h2>
                      <br /> */}
                      <h2 className='text-xl text-[1.75rem] leading-normal font-extrabold cursor-pointer'>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          C
                        </span>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          R
                        </span>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          Y
                        </span>
                      </h2>
                      <h2 className='text-xl text-[1.75rem] leading-normal font-extrabold cursor-pointer'>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          P
                        </span>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          T
                        </span>
                        <span className='bg-white border-2 px-2.5 m-1 border-gray-500'>
                          I
                        </span>
                      </h2>
                      <h2 className='text-xl text-[1.75rem] leading-normal font-extrabold cursor-pointer'>
                        <span className='bg-white border-2 px-2 m-1 border-gray-500'>
                          X
                        </span>
                        <span className='bg-yellow-300 border-2 px-2 m-1 border-gray-500'>
                          L
                        </span>
                        <span className='bg-yellow-300 border-2 px-2 m-1 border-gray-500'>
                          E
                        </span>
                      </h2>
                    </div>
                  </Dialog.Title>
                  <div className='mt-4'>
                    <p className='text-lg  my-2'>
                      Solve both Cryptic Crossword clues to win.
                    </p>

                    <details className='mt-4'>
                      <summary className='text-gray-500'>
                        How do I play?
                      </summary>
                      <p className='text-lg  my-2'>
                        After each guess, hit the Enter button to submit. The
                        color of the input will change to show you got it right!
                      </p>
                      <p className='text-lg  my-2'>
                        Answer both clues to win the game. Come back tomorrow!
                      </p>
                      <p className='text-lg  my-2'>
                        Want to keep playing? Press the refresh icon to get a
                        random cryptic clue.
                      </p>
                    </details>
                    <details className='mt-4'>
                      <summary className='text-gray-500'>
                        How do I solve a Cryptic Crossword Clue?
                      </summary>
                      <p className='text-lg  my-2'>
                        Happy to help! Basically each clue is made up of a
                        definition and indicators.
                      </p>
                      <h3 className='text-xl my-2'>Definition:</h3>
                      <p className='text-lg my-2'>
                        Just like in a regular crossword this is the meaning of
                        the solution and occurs at the beginning or end of the
                        clue.
                      </p>
                      <h3 className='text-xl my-2'>Indicators:</h3>
                      <p className='text-lg my-2'>
                        These help you reach the solution. They could suggest
                        you anagram part of the clue, remove letters or find a
                        hidden word. Take a look at this example:
                      </p>
                      <p className='text-xl  my-2'>
                        <span>{"15D)"}</span>
                        <span className='italic'>
                          Very sad unfinished story about rising smoke (8)
                        </span>
                      </p>
                      <details>
                        <summary>Solution</summary>
                        <p className='text-lg  my-2 uppercase'>tragical</p>
                        <p className='text-lg my-2'>
                          <a
                            href='https://en.wikipedia.org/wiki/Cryptic_crossword#:~:text=Here%20is%20an%20example'
                            target='_blank'
                            className='text-blue-400 underline'
                            rel='noreferrer'>
                            Explanation
                          </a>{" "}
                          on Wikipedia.
                        </p>
                      </details>

                      <hr />
                      <p className='text-lg  my-2'>
                        <a
                          href='https://www.newyorker.com/puzzles-and-games-dept/cryptic-crossword/reintroducing-the-new-yorkers-cryptic-crossword'
                          target='_blank'
                          className='text-blue-400 underline'
                          rel='noreferrer'>
                          The New Yorker
                        </a>{" "}
                        and{" "}
                        <a
                          href='https://www.newyorker.com/puzzles-and-games-dept/cryptic-crossword/reintroducing-the-new-yorkers-cryptic-crossword'
                          target='_blank'
                          className='text-blue-400 underline'
                          rel='noreferrer'>
                          The Guardian
                        </a>{" "}
                        have great introductions if you want to learn more.
                      </p>
                    </details>
                    <details className='mt-4'>
                      <summary className='text-gray-500'>
                        How do you get the clues?
                      </summary>
                      <p className='text-lg my-2'>
                        <a
                          href='https://cryptics.georgeho.org/'
                          target='_blank'
                          className='text-blue-400 underline'
                          rel='noreferrer'>
                          George Ho
                        </a>{" "}
                        has created a brilliant dataset of past newspaper clues.
                        The source of each clue is linked.
                      </p>
                    </details>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2'
                      onClick={closeModal}>
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default HelpModal
