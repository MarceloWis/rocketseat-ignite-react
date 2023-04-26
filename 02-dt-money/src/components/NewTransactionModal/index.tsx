import * as Dialog from '@radix-ui/react-dialog'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton
} from './styles'

import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TransactionsContext } from '../../contexts/transactions'
import { useContextSelector } from 'use-context-selector'

const schema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof schema>

export function NewTransactionModal () {
  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    reset
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'income'
    }
  })

  async function handleCreateNewTransaction ({ category, description, price, type }: NewTransactionFormInputs) {
    void createTransaction({ category, description, price, type })
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"

            {...register('description')}
          />
          <input
            placeholder="Preço"
            type="number"
            {...register('price', { valueAsNumber: true })}
          />
          {(errors.price != null) && <span>{errors.price.message}</span>}
          <input
            type="text"
            placeholder="Categoria"

            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton
                    value="income"
                    variant="income"
                    type="button"
                  >
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton
                    value="outcome"
                    variant="outcome"
                    type="button"
                  >
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
