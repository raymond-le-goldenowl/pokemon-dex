import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AbilityOfPokemon = ({ url }) => {
  const [effect, setEffect] = useState('')

  useEffect(() => {
    axios.get(`${url}`).then(response => {
      setEffect(() => {
        return response.data.effect_entries.map((effect_entry, index) => {
          if (effect_entry?.language?.name === 'en') {
            return <li key={index + Date.now()}>{effect_entry.effect}</li>
          }
        })
      })
    })
  }, [url])

  return <React.Fragment>{effect}</React.Fragment>
}
export default AbilityOfPokemon
