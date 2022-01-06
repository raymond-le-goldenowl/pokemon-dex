import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const VarietyOfPokemon = ({ pokemon, index }) => {
  // save state detail pokemon.
  const [detailPokemon, setDetailPokemon] = useState(() => ({
    id: '',
    name: '',
    front_default: ''
  }))

  // get detail of pokemon.
  const fetchDetailPokemon = useCallback(url => {
    const _url = `${url}`.replaceAll('-species', '')
    return axios.get(_url).then(response => response.data)
  }, [])

  useEffect(() => {
    fetchDetailPokemon(`${pokemon?.url}`).then(response => {
      // assignment data.
      let data = {}
      data.id = response?.id
      data.name = response?.name
      data.front_default = response?.sprites?.front_default

      // set data for state.
      setDetailPokemon(data)
    })
  }, [pokemon, fetchDetailPokemon])

  return (
    <div className="col-4 text-center">
      <div>#{index + 1}</div>
      <Link to={`/detail/${detailPokemon.id}`}>
        <img
          src={`${detailPokemon.front_default}`}
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
