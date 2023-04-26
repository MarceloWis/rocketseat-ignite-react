import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles';
import { useContext } from 'react';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleValidationSchema = z.object({
  task: z.string().min(1, 'Informa a tarefa'),
  minutesAmount: z
    .number()
    .min(1, 'O tempo minimo é de 5 minutos')
    .max(60, 'O tempo máximo é de 60 minutos'),
});

type NewCycleFormData = z.infer<typeof newCycleValidationSchema>;

export function HomePage() {
  const { activeCycle, interruptCurrentCycle, createNewCycle } =
    useContext(CyclesContext);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { reset, handleSubmit, watch } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
