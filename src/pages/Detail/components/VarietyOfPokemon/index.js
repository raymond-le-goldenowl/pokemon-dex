import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import pokemonService from '../../../../services/pokemonService'

const VarietyOfPokemon = ({ pokemon, index }) => {
  // save state detail pokemon.
  const [detailPokemon, setDetailPokemon] = useState(() => ({
    id: '',
    name: '',
    frontDefault: ''
  }))

  // get detail of pokemon.
  useEffect(() => {
    const replaceUrl = `${pokemon?.url}`.replaceAll('-species', '')
    pokemonService.getOnePokemon(replaceUrl).then(data => {
      setDetailPokemon(data)
    })
    return () => {
      setDetailPokemon({ id: '', name: '', frontDefault: '' })
    }
  }, [pokemon])

  // render ui.
  return (
    <div className="col-4 text-center">
      <div>#{index + 1}</div>
      <Link to={`/detail/${detailPokemon.id}`}>
        <img
          src={`${detailPokemon.frontDefault}`}
          alt={`${detailPokemon.name}`}
        />
      </Link>

      <Link
        className="d-block h5"
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/detail/${detailPokemon.id}`}
      >
        {detailPokemon.name}
      </Link>
    </div>
  )
}

export default VarietyOfPokemon
