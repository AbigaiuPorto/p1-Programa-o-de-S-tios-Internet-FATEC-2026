'use strict'

function criarCard(serie){
    const galeria = document.getElementById('card-container')

    const card = document.createElement('div')
    card.classList.add('card')

    const imagem = document.createElement('img')
    if (serie.image) {
        imagem.src = serie.image.medium
    }

    const titulo = document.createElement('h3')
    titulo.textContent = serie.name

    const idioma = document.createElement('p')
    idioma.textContent = "Idioma: " + serie.language

    const genero = document.createElement('p')
    genero.textContent = "Gênero: " + serie.genres.join(', ')

    const botao = document.createElement('button')
    botao.textContent = "Ver mais"
    botao.addEventListener('click', function(){
        abrir(serie.url)
    })

    card.append(imagem)
    card.append(titulo)
    card.append(idioma)
    card.append(genero)
    card.append(botao)

    galeria.append(card)
}

async function carregarSeries(){
    const nome = document.getElementById('nome').value
    const url = `https://api.tvmaze.com/search/shows?q=${nome}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    document.getElementById('card-container').replaceChildren()

    data.forEach(function(item){
        criarCard(item.show)
    })
}

function abrir(url){
    window.open(url)
}

document.getElementById('botao-pesquisar').addEventListener('click', carregarSeries)