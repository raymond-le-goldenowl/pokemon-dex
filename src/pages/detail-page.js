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
    stats: []
  }))

  // get detail of pokemon.
  const fetchDetailPokemon = useCallback(url => {
    return axios.get(url).then(response => response.data)
  }, [])

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
        console.log(data)

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
            <div className="col-4">hihi</div>
            <div className="col-4">hihi</div>
            <div className="col-4">hihi</div>
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
    console.log()
    axios.get(`${url.url}`).then(response => {
      // eslint-disable-next-line array-callback-return
      Object.values(response.data?.effect_entries).map(effect_entry => {
        // console.log(effect_entry.language)
        if (effect_entry?.language?.name === 'en') {
          setEffect(effect_entry.effect)
        }
      })
    })
  }, [url])

  return <li>{effect}</li>
}
