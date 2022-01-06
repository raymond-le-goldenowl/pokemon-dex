import axios from 'axios'
import { useEffect, useState } from 'react'

const AbilityOfPokemon = url => {
  const [effect, setEffect] = useState('')

  useEffect(() => {
    axios.get(`${url.url}`).then(response => {
      // eslint-disable-next-line array-callback-return
      Object.values(response.data?.effect_entries).map(effect_entry => {
        if (effect_entry?.language?.name === 'en') {
          setEffect(effect_entry.effect)
        }
      })
    })
  }, [url])

  return <li>{effect}</li>
}
export default AbilityOfPokemon
