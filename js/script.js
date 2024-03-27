window.addEventListener('load', () => {
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

    var language = "pt-br";

    fetch(`https://api.themoviedb.org/3/movie/popular?language=${language}&page=1`, options)
        .then(response => response.json())
        .then(filmes => exibirTitulos(filmes.results))
        .catch(err => console.error(err));

    function exibirTitulos(filmes) {
        filmes.some((filme, index) => {
            if (index < 10) {

                console.log(filme);

                var boxFilme = document.createElement("div");
                boxFilme.id = 'filme';
                var tituloFilme = document.createElement("p");
                tituloFilme.textContent = filme.title;
                var infoFilme = document.createElement("div");
                infoFilme.id = 'infoFilme';
                var verMais = document.createElement("p");
                verMais.textContent = "Ver mais"
                infoFilme.appendChild(verMais);



                infoFilme.addEventListener('click', () => {
                    window.location.href = `filme.html?id=${filme.id}`;
                });


                var capaFilme = document.createElement("img");
                var url = "https://image.tmdb.org/t/p/w500";
                capaFilme.setAttribute("src", `${url}${filme.poster_path}`);

                boxFilme.appendChild(tituloFilme);
                boxFilme.appendChild(capaFilme);

                // Chama a função generos e adiciona os nomes dos gêneros ao boxFilme
                generos(filme.genre_ids).then(generosNomes => {
                    generosNomes.forEach(generoNome => {
                        var elementoGenero = document.createElement("p");
                        elementoGenero.textContent = generoNome;
                        boxFilme.appendChild(elementoGenero);
                    });
                });
                boxFilme.appendChild(infoFilme);

                document.getElementById("boxFilmes").appendChild(boxFilme);

                return false;
            } else {
                return true;
            }
        });
    };


    // função que retorna os generos dos filmes com base nos ids dos generos

    function generos(ids) {
        return fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${language}`, options)
            .then(response => response.json())
            .then(data => {
                const generosMap = new Map();
                data.genres.forEach(genero => {
                    generosMap.set(genero.id, genero.name);
                });

                const generosNomes = [];
                ids.forEach(id => {
                    var generoNome = generosMap.get(id);
                    if (generoNome)
                        generosNomes.push(generoNome);

                });

                return generosNomes;
            })
            .catch(err => console.error(err));
    }

});
