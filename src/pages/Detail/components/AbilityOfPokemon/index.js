import React, { useEffect, useState } from 'react'
import pokemonService from '../../../../services/pokemonService'
import { LANG } from './constants'
const AbilityOfPokemon = ({ url }) => {
  const [effect, setEffect] = useState('')

  useEffect(() => {
    pokemonService.getAbilityOfPokemon(url).then(effectEntries => {
      const effectEntriesElements = effectEntries.map((effect_entry, index) => {
        if (effect_entry?.language?.name === LANG) {
          return <li key={index + Date.now()}>{effect_entry.effect}</li>
        }
        return <React.Fragment key={index + Date.now()}></React.Fragment>
      })
      setEffect(effectEntriesElements)
    })
  }, [url])

  return <React.Fragment>{effect}</React.Fragment>
}
export default AbilityOfPokemon
