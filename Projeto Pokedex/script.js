document.getElementById("buscarPokemon").addEventListener("click", async function Busca() {

    try {
        const imagem = document.getElementById("pokemon");
        const pokemon = document.getElementById("nomePokemon").value.toLowerCase();
        const servidor = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const nomePokemon = document.getElementById("nome");
        const tipoPokemon = document.getElementById("tipo");

        if(!servidor.ok){
            throw new Error("Erro na resposta do servidor");
        }

        const dados = await servidor.json(); //Pegando as informações json da API

        //Atualizando a imagem usando os elementos do objeto da API e imprimindo a imagem na tela
        imagem.src = dados.sprites.front_default;
        imagem.alt = `${pokemon}`;
        console.log(dados); //Visualizando os elementos atribuídos aos pokemons da API no console

        //Exibindo informações sobre o pokemon escolhido
        nomePokemon.textContent = `Nome: ${dados.name}`;
        tipoPokemon.textContent = `Tipo: ${dados.types.map(t => t.type.name).join(", ")}`;

        //Evento que exibe o alt da imagem de id pokemon caso a imagem do pokemon não carrege
        imagem.onerror = function(){
            imagem.alt = `Não foi possível carregar a imagem do pokemon ${dados.name}`;
        }

        //Verificando qual o tipo do pokemon selecionado
        const figure = document.querySelector("figure");
        const tipos = dados.types.map(t => t.type.name);

        //Função que muda a cor do background da tag figure dependendo do tipo do pokemon(Se for fogo,muda para red e assim vai)
        function mudarBackgroundColor(tipo){
            switch (tipo) {
                case 'fire' : return 'red';
                case 'grass' : return 'green';
                case 'water' : return 'blue';
                case 'ice' : return 'ligthblue';
                case 'electric' : return 'yellow';
                case 'poison' : return 'purple';
                case 'normal' : return 'ligthgray';
                case 'dragon' : return 'darkviolet';
                case 'psychic' : return 'pink';
                default : return 'white';

            }
        }

        figure.style.backgroundColor = mudarBackgroundColor(tipos[0]);

    } catch (error) {
        console.error(error);
        alert("Erro: Pokemón não encontrado ou erro na resposta do servidor");
    }
 
});
