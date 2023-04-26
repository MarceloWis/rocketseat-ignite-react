import { MagnifyingGlass } from '@phosphor-icons/react'
import { SearchFormContainer } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TransactionsContext } from '../../../../contexts/transactions'
import { useContextSelector } from 'use-context-selector'

const schema = z.object({
  query: z.string()
})

type SearchFormInputs = z.infer<typeof schema>

export function SearchForm () {
  const { fetchTransactions } = useContextSelector(TransactionsContext, (context) => {
    return {
      fetchTransactions: context.fetchTransactions
    }
  })
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(schema)
  })

  function handleSearchTransaction (data: SearchFormInputs) {
    void fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        placeholder="Buscar por transações"
        {...register('query')}
      />
      <button disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
