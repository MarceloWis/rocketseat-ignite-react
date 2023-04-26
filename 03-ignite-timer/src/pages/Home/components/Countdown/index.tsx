import { useContext, useEffect, useState } from 'react';
import { ContdownContainer, Separator } from './styles';

import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secoundsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const secounds = String(secoundsAmount).padStart(2, '0');

  useEffect(() => {
    document.title = `${minutes}:${secounds}`;
  }, [minutes, secounds]);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startedDate)
        );
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  return (
    <ContdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]} </span>
      <Separator>:</Separator>
      <span>{secounds[0]}</span>
      <span>{secounds[1]}</span>
    </ContdownContainer>
  );
}
