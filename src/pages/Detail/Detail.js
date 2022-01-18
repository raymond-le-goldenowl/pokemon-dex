import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import pokemonService from 'services/pokemonService'
import { ErrorFetchDataContext } from 'contexts/ErrorFetchDataContextProvider'

import AbilityOfPokemon from './components/AbilityOfPokemon'
import VarietyOfPokemon from './components/VarietyOfPokemon'
import './styles.css'

export default function Detail() {
  const params = useParams()

  const id = params.id || 1

  const { handleErrorFetchData } = useContext(ErrorFetchDataContext)

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
    speciesUrl: null
  }))

  const [evolutionChain, setEvolutionChain] = useState(() => ({}))

  useEffect(() => {
    if (detailPokemon.speciesUrl !== null) {
      pokemonService
        .getEvolutionChain(detailPokemon.speciesUrl)
        .then(data => {
          setEvolutionChain(data)
        })
        .catch(() => {
          handleErrorFetchData()
        })
    }
  }, [detailPokemon])

  useEffect(() => {
    pokemonService
      .getOnePokemon(id)
      .then(data => {
        setDetailPokemon(data)
      })
      .catch(() => {
        handleErrorFetchData()
      })
  }, [id])

  return (
    <div className="container mb-4">
      {/* Logo */}
      <h1 className="text-center mb-5" id="logo-page">
        Pokemon Dex
      </h1>

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
              <b>Weight:</b> {detailPokemon.weight}kg
            </span>
            {` `}
            <span>
              <b>Height:</b> {detailPokemon.height}m
            </span>
          </p>
          <div className="pts-content-sm">
            <b>Effect entries: </b>
            <ul>
              {Object.values(detailPokemon?.abilities).map(ability => {
                if (ability?.isHidden === false) {
                  return (
                    <AbilityOfPokemon
                      key={ability.id}
                      url={ability?.ability?.url}
                    />
                  )
                }
                return null
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-6">
          <h3 className="title">Stats</h3>
          <div className="row pts-content-sm-l text-center">
            {Object.values(detailPokemon.stats).map((stat, index) => (
              <div className="col-4 d-flex flex-column mt-3" key={stat.id}>
                <span>
                  <strong>{stat.stat.name}</strong>
                </span>
                <span>{stat.baseStat}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="title">Evolution</h3>
          <div className="row pts-content-sm">
            {Object.values(evolutionChain).map((chain, index) => {
              if (chain?.name && chain?.url) {
                return (
                  <VarietyOfPokemon
                    key={chain.id}
                    pokemon={chain}
                    index={index}
                  />
                )
              }
              return null
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
