// Render as you fetch
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import {createResource} from '../utils'

function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.read()

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
  const [pokemonName, setPokemonName] = React.useState('')
  const [pokemonResource, setPokemonResource] = React.useState(null)

  React.useEffect(() => {
    if (pokemonName) {
      const resource = createResource(fetchPokemon(pokemonName))
      setPokemonResource(resource)
    } else {
      setPokemonResource(null)
    }
  }, [pokemonName])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <h2>jdlfkjd;slfkjds;</h2>
          {pokemonResource ? (
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <h1>ldfhdlfkhsd;lfhkdslfkh</h1>
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          ) : (
            'Submit a pokemon'
          )}
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
