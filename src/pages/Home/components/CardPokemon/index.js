import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

// Sub component for homepage render Pokemon Card.
export default function CardPokemon({ pokemon }) {
  // save state detail pokemon.
  const [detailPokemon, setDetailPokemon] = useState(() => ({
    id: '',
    name: '',
    front_default: '',
    types: ''
  }))

  // get detail of pokemon.
  const fetchDetailPokemon = useCallback(url => {
    return axios.get(url).then(response => response.data)
  }, [])

  useEffect(() => {
    fetchDetailPokemon(`${pokemon?.url}`).then(response => {
      // assignment data.
      let data = {}
      data.id = response?.id
      data.name = response?.name
      data.front_default = response?.sprites.front_default
      const types = Object.values(response?.types).map(type => type.type.name)
      data.types = types.join(', ') + '.'

      // set data for state.
      setDetailPokemon(data)
    })
  }, [pokemon?.url, fetchDetailPokemon])

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
      <div className="card card-pokemon">
        <img
          src={`${detailPokemon.front_default}`}
          className="card-img-top"
          alt={`${detailPokemon.name}`}
        />
        <div className="card-body">
          <h5 className="card-title">{detailPokemon.name}</h5>
          <p className="card-text">
            <b>Types</b>: {detailPokemon.types}
          </p>
          <div className="d-flex justify-content-end">
            <a href={`/detail/${detailPokemon.id}`} className="btn btn-purple">
              Detail
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
