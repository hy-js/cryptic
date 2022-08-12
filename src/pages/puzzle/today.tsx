import type { NextPage } from 'next';
import { prisma } from '@/server/db/client';
import { useState, useEffect } from 'react';
import useWindowSize, { Size } from '@/hooks/useWindowSize';
import Confetti from 'react-confetti';
import getDate from '@/utils/getDate';

const Today: NextPage = ({ firstClue, secondClue }) => {
  const { width, height }: Size = useWindowSize();
  const [across, setAcross] = useState('');
  const [down, setDown] = useState('');

  const [showDown, setDownShow] = useState(false);
  const [showAcross, setAcrossShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onSubmitAcross = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (across.toUpperCase() === firstClue.answer) {
      setAcrossShow(true);
    }
  };
  const onSubmitDown = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (down.toUpperCase() === secondClue.answer) {
      setDownShow(true);
    }
  };

  return (
    <div className='flex flex-col w-min-screen justify-center'>
      <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
        <h3 className='text-xl'>{firstClue.clue}</h3>
        <form onSubmit={onSubmitAcross}>
          {showAcross ? (
            <input
              type='text'
              disabled
              value={firstClue.Answer}
              className='border border-gray-500 w-full text-xl my-2 bg-yellow-300 uppercase'
            />
          ) : (
            <input
              autoFocus
              name='across'
              id='across'
              type='text'
              autoComplete='off'
              onChange={(e) => setAcross(e.target.value)}
              maxLength={firstClue.answer.length}
              className='border border-gray-500 w-full text-xl my-2 focus:bg-slate-300 uppercase'
            />
          )}
          <button
            type='submit'
            className='hidden bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full'>
            Submit
          </button>
        </form>
        <hr />
        <form onSubmit={onSubmitDown}>
          <h3 className='text-xl'>{secondClue.clue}</h3>
          {showDown ? (
            <input
              type='text'
              disabled
              value={secondClue.Answer}
              className='border border-gray-500 w-full text-xl my-2 bg-yellow-300 uppercase'
            />
          ) : (
            <input
              autoFocus
              name='down'
              id='down'
              type='text'
              autoComplete='off'
              onChange={(e) => setDown(e.target.value)}
              maxLength={secondClue.answer.length}
              className='border  border-gray-500 w-full text-xl my-2 focus:bg-neutral-100 uppercase'
            />
          )}
          <button
            type='submit'
            className='bg-white hidden hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full'>
            Submit
          </button>
        </form>
      </div>
      {showAcross && showDown && (
        <Confetti width={width} height={height} recycle={false} />
      )}
      {/* {showAcross && (
        <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
          <h2>{firstClue.clue}</h2>
          <h2>{firstClue.answer}</h2>
          <a href={firstClue.sourceURL}>
            <h4 className='text-md italic'>{firstClue.source}</h4>
          </a>
          <h2>{firstClue.definition}</h2>
        </div>
      )}
      {showDown && (
        <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
          <hr />
          <h2>{secondClue.answer}</h2>
          <a href={secondClue.sourceURL}>
            <h4 className='text-md italic'>{secondClue.source}</h4>
          </a>
          <h2>{secondClue.definition}</h2>
        </div>
      )} */}
    </div>
  );
};

export default Today;

// Sever Side Rendering
export async function getServerSideProps(context) {
  const { currentDay, currentMonth, currentYear } = getDate();
  const dbClues = await prisma.puzzle.findMany({
    take: 2,
    where: {
      setDate: `${currentYear}-${currentMonth}-${currentDay}`
    }
  });
  console.log(dbClues);
  if (dbClues.length > 0) {
    return {
      props: {
        firstClue: dbClues[0],
        secondClue: dbClues[1]
      }
    };
  }

  // Otherwise get ser new clues for the day

  // Randomizer
  const puzzlesCount = await prisma.puzzle.count();
  const skip = Math.floor(Math.random() * puzzlesCount);
  // Get two clues
  const clues = await prisma.puzzle.findMany({
    take: 2,
    skip: skip,
    where: {
      setDate: {
        contains: 'NIL'
      }
    }
  });

  await prisma.puzzle.update({
    where: {
      rowId: clues[0].rowId
    },
    data: {
      setDate: `${currentYear}-${currentMonth}-${currentDay}`
    }
  });

  await prisma.puzzle.update({
    where: {
      rowId: clues[1].rowId
    },
    data: {
      setDate: `${currentYear}-${currentMonth}-${currentDay}`
    }
  });

  console.log(clues);

  return {
    props: {
      firstClue: clues[0],
      secondClue: clues[1]
    }
  };
}

