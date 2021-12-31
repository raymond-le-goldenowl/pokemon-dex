import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './detail.css'

export default function DetailPage() {
  const params = useParams()

  const id = params.id || 1

  // save state detail pokemon.
  const [detailPokemon, setDetailPokemon] = useState(() => ({
    id: '',
    name: '',
    front_default: '',
    types: '',
    base_experience: '',
    weight: '',
    height: '',
    abilities: [],
    stats: [],
    url_species: ''
  }))

  const [evolutionChain, setEvolutionChain] = useState(() => ({}))

  // get detail of pokemon.
  const fetchDetailPokemon = useCallback(url => {
    return axios.get(url).then(response => response.data)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const species = await axios.get(`${detailPokemon.url_species}`)
    const _evolutionChain = await axios.get(
      `${species.data.evolution_chain?.url}`
    )
    const data = _evolutionChain.data?.chain
    const species1 = data.species.name
    const species1_url = data.species.url

    const species2 = data.evolves_to[0]?.species.name
    const species2_url = data.evolves_to[0]?.species.url

    const species3 = data.evolves_to[0]?.evolves_to[0]?.species.name
    const species3_url = data.evolves_to[0]?.evolves_to[0]?.species.url

    setEvolutionChain(() => [
      { name: species1, url: species1_url },
      { name: species2, url: species2_url },
      { name: species3, url: species3_url }
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
        data.front_default = response?.sprites.front_default
        const types = Object.values(response?.types).map(type => type.type.name)
        data.types = types.join(', ') + '.'
        data.base_experience = response?.base_experience
        data.weight = response?.weight
        data.height = response?.height
        data.abilities = response?.abilities
        data.stats = response?.stats
        data.url_species = response?.species.url

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
            src={`${detailPokemon.front_default}`}
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
            <b>Base experience:</b> {detailPokemon.base_experience}
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
                        <EffectItem key={index} url={ability?.ability?.url} />
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
                <Variety
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

const EffectItem = url => {
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

const Variety = ({ pokemon, index }) => {
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
