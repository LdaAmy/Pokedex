const pokeNameView = document.querySelector('.poke-name-view');
        const tipoPoke = document.querySelector('.tipo-poke');
        const pokeImg = document.querySelector('.img-poke');
        const listPoke = document.getElementById('list-poke');
    
        // Função para buscar informações do Pokémon
        async function fetchPokemon(pokemonId) {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                const data = await response.json();
    
                // Atualiza as informações na interface
                pokeNameView.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
                tipoPoke.textContent = data.types.map(type => type.type.name).join(', ');
                pokeImg.src = data.sprites.front_default;
            } catch (error) {
                console.error(error);
                pokeNameView.textContent = 'Pokémon não encontrado.';
                tipoPoke.textContent = '';
                pokeImg.src = '';  // Limpa a imagem
            }
        }
    
        // Função para listar todos os Pokémon
        async function fetchAllPokemons() {
            const url = 'https://pokeapi.co/api/v2/pokemon?limit=150'; // Limite de 150 para não sobrecarregar
            try {
                const response = await fetch(url);
                const data = await response.json();
    
                data.results.forEach(pokemon => {
                    const div = document.createElement('div');
                    div.classList.add('poke-item');
                    div.innerHTML = `
                        <img src="https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png" alt="${pokemon.name}" class="poke-img">
                        <p class="poke-name">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                    `;
                    div.addEventListener('click', () => fetchPokemon(pokemon.url.split('/')[6]));
                    listPoke.appendChild(div);
                });
            } catch (error) {
                console.error(error);
            }
        }
    
        // Carregar Pokémon ao abrir a página
        fetchAllPokemons();
