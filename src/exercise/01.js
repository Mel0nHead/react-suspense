import * as React from 'react'
import {PokemonDataView, fetchPokemon, PokemonErrorBoundary} from '../pokemon'

function createResource(asyncResult) {
  let data
  let error

  const promise = asyncResult.then(
    resolvedData => (data = resolvedData),
    e => (error = e),
  )

  return {data, error, promise}
}

function PokemonInfo() {
  const {data: pokemon, error, promise} = createResource(
    fetchPokemon('pikachu'),
  )
  if (error) {
    throw error
  }

  if (!pokemon) {
    throw promise
  }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <React.Suspense fallback={<b>Loading...</b>}>
          <PokemonErrorBoundary>
            <PokemonInfo />
          </PokemonErrorBoundary>
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
