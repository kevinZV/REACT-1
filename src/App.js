import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        // création d'un constructeur contenant les éléments
        super();
        this.series = [];
        this.episodes = [];
        this.state = {
            matchedSeries: [],
            loading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.findEpisodesById = this.findEpisodesById.bind(this);
    }

    componentDidMount() {
        //fonction construction

        fetch('seriesList.json')
            .then(response => response.json()) //promesse
            .then(series => {
                //Nous avons recupere avec success la liste des series, recuperons les episodes
                fetch('seriesEpisodesList.json')
                    .then(res => res.json())   //promesse
                    .then(episodes => {
                        this.series = series;
                        this.episodes = episodes;

                        this.setState({
                            loading: false
                        });
                    });
            })
            .catch(error => {
                console.log(error);
            })
            .then(() => {
                alert("j'ai fait tout ce que je pouvais");
            });
    }

    handleChange(e) {
        // on cherche une série qui contient la chaîne d'entrée
        let matched = [];
        // création variable sous forme de tableau

        if (e.target.value.length > 0) {
            this.series.forEach(serie => {
                if (serie.seriesName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                    matched.push(serie);
                }
            });
        }

        this.setState({
            matchedSeries: matched
        });
    }

    findEpisodesById(id) {
        // on cherche à obtenir des episodes pour une serie par son #id
        for (let i = 0; i < this.episodes.length; i++) {
            if (this.episodes[i].serie_id === id) {
                return this.episodes[i].episodes_list;
            }
        }

        // ne retourne rien si rien n'est valide
        return [];
    }

    render() {
        // comme nous aurons quelques donnees, nous allons stocker la modification dans une variable
        let data;

        // charge les infos
        if (this.state.loading) {
            data = <div>Loading... <span className="loader">|</span></div>;
        } else {
            // affiche les resultats
            let matched = this.state.matchedSeries.map(serie => {
                let episodes_list = this.findEpisodesById(serie.id);


                let episodes = episodes_list.map(episode => {
                    return (
                        <li key={episode.id}>
                            {episode.episodeName}
                        </li>
                    );
                });
                //liste des episodes de la ou les serie(s)
                return (
                    <li key={serie.id}>
                        {serie.seriesName}
                        <ul>
                            {episodes}
                        </ul>
                    </li>
                );
            });
            // si on ne trouve rien dans la variable MATCHED afficher "Pas de résultat trouvé."
            if (matched.length === 0) {
                matched = <p>Aucun résultat.</p>;
            } else {
                // affiche ce qu'il y a dans la variable LET MATCHED
                matched = (
                    <ul>
                        {matched}
                    </ul>
                );
            }

            data = (
                <div>
                    <input type="text" id="seriesTitleSearch" onChange={this.handleChange} />
                    {matched}
                </div>
            )
        }

        // return donnees
        return (
            <div>
                {data}
            </div>
        )
    }
}


export default App;