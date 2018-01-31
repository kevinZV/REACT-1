import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
//création d'un constructor
class App extends React.Component {
    constructor() {
        super();
        //on créer des tableau vide pour les séries et les épisodes qui se rempliront
        this.state = {
            seriesList: [],
            seriesEpisodesList: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChange(event) {
        this.setState({value: event.target.value.toLowerCase()});
    }

    componentDidMount() {
        //on recherche les series
        fetch('seriesList.json', {})
            //promesse d'afficher une réponse
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                /* alert("j'ai fait ce que j'ai pu");*/
            });
        //on recherche les épiosdes des séries
        fetch('seriesEpisodesList.json', {})
            //promesse d'afficher une réponse
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })

    }
    //on effectue un rendu
    render() {
        return (
            <div class="wrapper">
                <div id="header">
                    <h1>Catalogue de série</h1>
                    <input id="recherche" type="text" placeholder="Recherche une serie" value={this.state.value}
                           onChange={this.handleChange}/>
                    <ul>
                        {this.state.value !== "" ?
                            //fonction pour afficher les séries sous forme de liste
                            this.state.seriesList.filter(
                                e => e.seriesName.indexOf(this.state.value) > -1).map(item => <li
                                key={item.id}>{item.seriesName}

                                <ul>
                                    //on recupere les episodes en fonction de l'id de la série
                                    {this.state.seriesEpisodesList.filter(
                                        f => f.serie_id == item.id).map(episode => episode.episodes_list.filter(
                                        g => g.episodeName).map(name => <li>{name.episodeName}</li>)
                                    )

                                    }
                                </ul>
                            </li>)

                            //quand plus rien n'est marque
                            : <p>Rien n'est Marqué</p>

                        }

                    </ul>
                </div>

            </div>
        )
    }
}



export default App;