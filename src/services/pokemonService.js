import axios from 'axios'

class PokemonService {
  async getOnePokemon(id) {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(response => response.data)
      .then(data => {
        // assignment data.
        let result = {}
        result.id = data?.id
        result.name = data?.name
        result.types = data?.types
        result.frontDefault = data?.sprites.front_default
        const types = Object.values(data?.types).map(type => type.type.name)
        result.types = types.join(', ') + '.'
        result.baseExperience = data?.base_experience
        result.weight = data?.weight
        result.height = data?.height

        // Refactor object key.
        result.abilities = data?.abilities.map(item => {
          item = {
            ...item,
            isHidden: item.is_hidden
          }
          delete item.is_hidden
          return item
        })

        // Refactor object key.
        result.stats = data?.stats.map(item => {
          item = {
            ...item,
            baseStat: item.base_stat
          }
          delete item.base_stat
          return item
        })

        result.speciesUrl = data?.species.url

        // set data for state.
        return result
      })
  }

  async getEvolutionChain(url) {
    const species = await axios.get(`${url}`)
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
    return [
      { name: speciesOne, url: urlOfSpeciesOne },
      { name: speciesTwo, url: urlOfSpeciesTwo },
      { name: speciesThree, url: urlOfSpeciesThree }
    ]
  }

  async getAbilityOfPokemon(url) {
    // get Ability Of Pokemon.
    return (
      axios
        .get(`${url}`)
        // get effect_entries.
        .then(response => response.data?.effect_entries || [])
        .then(effectEntries => {
          // update object key.
          return effectEntries.map(effect_entry => {
            effect_entry = {
              ...effect_entry,
              shortEffect: effect_entry.short_effect
            }
            delete effect_entry.short_effect
            return effect_entry
          })
        })
    )
  }

  async getPokemonWithLimit(offset = 0, limit = 20) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return axios.get(url).then(response => response.data?.results)
  }

  async searchPokemonByType(keywords) {
    return (
      axios
        .get('https://pokeapi.co/api/v2/type/')
        .then(res => res.data.results)
        .then(types => {
          return types.filter(type => {
            return type.name.trim().includes(`${keywords}`.trim())
          })
        })
        // filter type and get all pokemon with type name.
        .then(resultTypeFilter => {
          return axios
            .get(`${resultTypeFilter[0]?.url}`)
            .then(response => response.data)
            .then(typeDetail => {
              const result = typeDetail?.pokemon.map(pokemon => pokemon.pokemon)
              // set result filter for display pokemon.
              return result
            })
        })
    )
  }
}

export default new PokemonService()
