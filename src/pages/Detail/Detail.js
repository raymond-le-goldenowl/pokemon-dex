import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AbilityOfPokemon from './components/AbilityOfPokemon'
import VarietyOfPokemon from './components/VarietyOfPokemon'
import './styles.css'

export default function Detail() {
  const params = useParams()

  const id = params.id || 1

  // save state detail pokemon.
  const [detailPokemon, setDetailPokemon] = useState(() => ({
    id: '',
    name: '',
    frontDefault: '',
    types: '',
    baseExperience: '',
    weight: '',
    height: '',
    abilities: [],
    stats: [],
    speciesUrl: ''
  }))

  const [evolutionChain, setEvolutionChain] = useState(() => ({}))

  // get detail of pokemon.
  const fetchDetailPokemon = useCallback(url => {
    return axios.get(url).then(response => response.data)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const species = await axios.get(`${detailPokemon.speciesUrl}`)
    const resEvolutionChain = await axios.get(
      `${species.data.evolution_chain?.url}`
    )
    const data = resEvolutionChain.data?.chain
    const speciesOne = data.species.name
    const urlOfSpeciesOne = data.species.url

    const speciesTwo = data.evolves_to[0]?.species.name
    const urlOfSpeciesTwo = data.evolves_to[0]?.species.url

    const speciesThree = data.evolves_to[0]?.evolves_to[0]?.species.name
    const urlOfSpeciesThree = data.evolves_to[0]?.evolves_to[0]?.species.url

    setEvolutionChain(() => [
      { name: speciesOne, url: urlOfSpeciesOne },
      { name: speciesTwo, url: urlOfSpeciesTwo },
      { name: speciesThree, url: urlOfSpeciesThree }
    ])
  }, [detailPokemon])

  useEffect(() => {
    fetchDetailPokemon(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(
      response => {
        // assignment data.
        let data = {}
        data.id = response?.id
        data.name = response?.name
        data.types = response?.types
        data.frontDefault = response?.sprites.front_default
        const types = Object.values(response?.types).map(type => type.type.name)
        data.types = types.join(', ') + '.'
        data.baseExperience = response?.base_experience
        data.weight = response?.weight
        data.height = response?.height
        data.abilities = response?.abilities
        data.stats = response?.stats
        data.speciesUrl = response?.species.url

        // set data for state.
        setDetailPokemon(data)
      }
    )
  }, [id, fetchDetailPokemon])

  return (
    <div className="container mb-4">
      {/* Logo */}
      <h1 className="text-center mb-5" id="logo-page">
        Pokemon Dex
      </h1>

      {/* Detail a pokemon */}

      <div className="row mb-5">
        <div className="col-md-6">
          <img
            src={`${detailPokemon.frontDefault}`}
            className="img-fluid"
            alt={detailPokemon.name}
            width="100%"
            height="100%"
          />
        </div>
        <div className="col-md-6 pts-content-b">
          <h3 className="title">Bio</h3>
          <p>
            <b>Name:</b> {`${detailPokemon.name}`.toUpperCase()}
          </p>
          <p>
            <b>Types: </b>
            {detailPokemon.types}
          </p>
          <p>
            <b>Base experience:</b> {detailPokemon.baseExperience}
          </p>
          <p>
            <span>
              <b>Weight:</b> {detailPokemon.weight} KG
            </span>
            {` `}
            <span>
              <b>Height:</b> {detailPokemon.height} M
            </span>
          </p>
          <div className="pts-content-sm">
            <b>Effect entries: </b>
            <ul>
              {
                // eslint-disable-next-line array-callback-return
                Object.values(detailPokemon?.abilities).map(
                  (ability, index) => {
                    if (ability?.is_hidden === false) {
                      return (
                        <AbilityOfPokemon
                          key={index}
                          url={ability?.ability?.url}
                        />
                      )
                    }
                  }
                )
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-6">
          <h3 className="title">Stats</h3>
          <div className="row pts-content-sm-l text-center">
            {Object.values(detailPokemon.stats).map((stat, index) => (
              <div
                className="col-4 d-flex flex-column mt-3"
                key={index + Date.now()}
              >
                <span>
                  <strong>{stat.stat.name}</strong>
                </span>
                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="title">Evolution</h3>
          <div className="row pts-content-sm">
            {Object.values(evolutionChain).map((chain, index) => {
              return (
                <VarietyOfPokemon
                  key={index + Date.now()}
                  pokemon={chain}
                  index={index}
                />
              )
            })}
          </div>
        </div>
      </div>
      <hr className="mb-5" />
      <Link to={'/home'} className="btn btn-purple pts-content-sm">
        Back home
      </Link>
    </div>
  )
}
