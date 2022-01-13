import React, { useContext, useEffect, useState } from 'react'
import { ErrorFetchDataContext } from '../../../../contexts/ErrorFetchDataContextProvider'
import pokemonService from '../../../../services/pokemonService'
import { LANG } from './constants'
const AbilityOfPokemon = ({ url }) => {
  const [effect, setEffect] = useState('')

  const { handleErrorFetchData } = useContext(ErrorFetchDataContext)

  useEffect(() => {
    pokemonService
      .getAbilityOfPokemon(url)
      .then(effectEntries => {
        const effectEntriesElements = effectEntries.map(
          (effect_entry, index) => {
            if (effect_entry?.language?.name === LANG) {
              return <li key={index + Date.now()}>{effect_entry.effect}</li>
            }
            return null
          }
        )
        setEffect(effectEntriesElements)
      })
      .catch(() => {
        handleErrorFetchData()
      })
    return () => {
      setEffect('')
    }
  }, [url])

  return <React.Fragment>{effect}</React.Fragment>
}
export default AbilityOfPokemon
