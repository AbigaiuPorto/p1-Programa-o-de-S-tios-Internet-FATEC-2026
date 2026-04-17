'use strict'

function criarCard(serie) {

    const lista = document.getElementById('lista-cards')

    const card = document.createElement('div')
    card.className = 'card-serie'

    const imagem = document.createElement('img')
    if (serie.image) {
        imagem.src = serie.image.medium
    }
    imagem.alt = serie.name

    const titulo = document.createElement('h3')
    titulo.textContent = serie.name

    const idioma = document.createElement('p')
    idioma.textContent = "Idioma: " + serie.language

    const genero = document.createElement('p')
    genero.textContent = "Gênero: " + serie.genres.join(', ')

    const botao = document.createElement('button')
    botao.textContent = "Ver mais"
    botao.onclick = function () {
        window.open(serie.url)
    }

    card.append(imagem, titulo, idioma, genero, botao)

    lista.append(card)
}


async function carregarSeries() {

    const nome = document.getElementById('nome').value
    const lista = document.getElementById('lista-cards')

    const url = "https://api.tvmaze.com/search/shows?q=" + nome

    try {

        const response = await fetch(url)
        const data = await response.json()

        console.log(data)

        lista.replaceChildren()

        data.forEach(function(item){
            criarCard(item.show)
        })

    } catch (erro) {

        console.log(erro)

        const msg = document.createElement('p')
        msg.textContent = "Erro ao buscar dados"
        lista.append(msg)
    }
}

document
    .getElementById('botao-pesquisar')
    .addEventListener('click', carregarSeries)

    document
    .getElementById('nome')
    .addEventListener('keypress', function (evento) {

        if (evento.key === 'Enter') {
            carregarSeries()
        }

    })