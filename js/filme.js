window.addEventListener('load', () => {
    const urlId = new URLSearchParams(window.location.search);
    const filmeId = urlId.get('id');
    var language = 'pt-br';

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
        var avaliacaoFilme = document.createElement("p");
        var dataLancamentoFilme = document.createElement("p");

        tituloFilme.innerText = filme.title;
        sinopseFilme.innerText = filme.overview;
        dataLancamentoFilme.innerText = dataLancamento(filme);
        avaliacaoFilme.innerText = avaliacao(filme);
        boxTextoFilme.appendChild(tituloFilme);
        boxTextoFilme.appendChild(sinopseFilme);
        boxTextoFilme.appendChild(dataLancamentoFilme);
        boxTextoFilme.appendChild(avaliacaoFilme);

        var bannerFilme = document.createElement("img");
        var url = "https://image.tmdb.org/t/p/w500";
        bannerFilme.setAttribute("src", `${url}${filme.backdrop_path}`);

        boxInfoFilme.appendChild(bannerFilme);
        boxInfoFilme.appendChild(boxTextoFilme);

        var caixaPrincipal = document.getElementById("boxfilmeInfo");
        caixaPrincipal.appendChild(boxInfoFilme);
        caixaPrincipal.appendChild(boxTextoFilme);

        var exibeTrailer = document.createElement("iframe");
        exibeTrailer.id = "exibeTrailer";
        exibeTrailer.setAttribute("src", trailer(filme));

        document.getElementById("boxTrailer").appendChild(exibeTrailer)
    };

    function avaliacao(filme) {
        const average = Math.round(filme.vote_average * 100) / 10;
        return "Avaliação: " + average + " %";
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
