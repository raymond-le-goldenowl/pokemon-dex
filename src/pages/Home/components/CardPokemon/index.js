import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorFetchDataContext } from 'contexts/ErrorFetchDataContextProvider'
import pokemonService from 'services/pokemonService'

// Sub component for homepage render Pokemon Card.
export default function CardPokemon({ pokemon }) {
  // save state detail pokemon.
  const [detailPokemon, setDetailPokemon] = useState(() => ({
    id: '',
    name: '',
    frontDefault: '',
    types: ''
  }))
  const { handleErrorFetchData } = useContext(ErrorFetchDataContext)

  useEffect(() => {
    const idSplitFromUrl = `${pokemon?.url}`
      .match(/\/\d+\//g)
      .join('')
      .replaceAll('/', '')
      .trim()

    pokemonService
      .getOnePokemon(idSplitFromUrl)
      .then(data => {
        setDetailPokemon(data)
      })
      .catch(() => {
        handleErrorFetchData()
      })
  }, [pokemon])

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
      <div className="card card-pokemon">
        <img
          src={`${detailPokemon.frontDefault}`}
          className="card-img-top"
          alt={`${detailPokemon.name}`}
        />
        <div className="card-body">
          <h5 className="card-title">{detailPokemon.name}</h5>
          <p className="card-text">
            <b>Types</b>: {detailPokemon.types}
          </p>
          <div className="d-flex justify-content-end">
            <Link to={`/detail/${detailPokemon.id}`} className="btn btn-purple">
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
