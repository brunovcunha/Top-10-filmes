window.addEventListener('load', () => {
    const urlId = new URLSearchParams(window.location.search);
    const filmeId = urlId.get('id');
    var language = 'pt-br';
    document.querySelector(".netpix").addEventListener("click", () => {
        window.location.href = `index.html`;
    });

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGE5MWRhOWVjYTBjNWZjMDUyMmRlMzMyZjE4Njk2ZiIsInN1YiI6IjY1ZmI3ZWRjNjA2MjBhMDE2MzI1OTMxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V2ak-sf-w7sj0i5aCbpRtpid6kIUNMvoRtu6bz5lo_Y'
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/${filmeId}?language=${language}&append_to_response=videos`, options)
        .then(response => response.json())
        .then(filmeDetalhes => { exibirDetalhesFilme(filmeDetalhes) })
        .catch(err => console.error(err));

    function exibirDetalhesFilme(filme) {
        var boxInfoFilme = document.createElement("div");
        boxInfoFilme.id = 'boxInfoFilme';
        var boxTextoFilme = document.createElement("div");
        boxTextoFilme.id = 'boxTextoFilme';
        var tituloFilme = document.createElement("h1");
        var sinopseFilme = document.createElement("p");
        var dataLancamentoFilme = document.createElement("p");

        tituloFilme.innerText = filme.title;
        sinopseFilme.innerText = filme.overview;

        dataLancamentoFilme.innerText = dataLancamento(filme);
        boxTextoFilme.appendChild(tituloFilme);
        boxTextoFilme.appendChild(sinopseFilme);
        boxTextoFilme.appendChild(dataLancamentoFilme);
        boxTextoFilme.appendChild(avaliacao(filme));


        var bannerFilme = document.createElement("img");
        var url = "https://image.tmdb.org/t/p/w500";
        bannerFilme.setAttribute("src", `${url}${filme.backdrop_path}`);

        boxInfoFilme.appendChild(bannerFilme);
        boxInfoFilme.appendChild(boxTextoFilme);

        var caixaPrincipal = document.getElementById("boxfilmeInfo");
        caixaPrincipal.appendChild(boxInfoFilme);
        caixaPrincipal.appendChild(boxTextoFilme);


        // Botao para voltar a página inicial
        var btnVoltar = document.createElement("button");
        btnVoltar.innerText = "Voltar";
        btnVoltar.addEventListener("click", ()=>{window.location.href = `index.html`;});
        document.getElementById("boxTotalFilmes").appendChild(btnVoltar);

        // exibição do trailer
        var exibeTrailer = document.createElement("iframe");
        exibeTrailer.id = "exibeTrailer";
        exibeTrailer.setAttribute("src", trailer(filme));

        document.getElementById("boxTrailer").appendChild(exibeTrailer)
    };

    function avaliacao(filme) {
        var icon = document.createElement("img");
        icon.setAttribute("src", "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/48193/popcorn-emoji-clipart-md.png");
        const average = Math.round(filme.vote_average * 100) / 10;
        var avaliacaoFilme = document.createElement("p");
        avaliacaoFilme.innerText = "Avaliação: " + average + "%";

        average > 60 ? avaliacaoFilme.style.color = "green" : avaliacaoFilme.style.color = "red";

        var boxAvaliacao = document.createElement("div");
        boxAvaliacao.id = 'boxAvaliacao';
        boxAvaliacao.appendChild(icon);
        boxAvaliacao.appendChild(avaliacaoFilme);

        return boxAvaliacao;

    }

    function dataLancamento(filme) {
        const date = new Date(filme.release_date);
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();
        const dataFormatada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${ano}`;
        return "Data de Lançamento: " + dataFormatada;
    }

    function trailer(filme) {
        const trailerKey = filme.videos.results[0].key;
        console.log(trailerKey);
        return `https://www.youtube.com/embed/${trailerKey}`;
    }
});
