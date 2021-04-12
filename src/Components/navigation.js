import React from 'react';
import "./navigation.css"


// datos de medios de comunicacion API JORNALIA

async function media_data(){
    let url = "https://api.jornalia.net/api/v1/providers?apiKey=51e3d6603d0544d9b4dca7c465d46076";
    const resp = await fetch(url);
    const datos = await resp.json();
    return datos
};

const data = media_data();



function Nameofmedia(props){
            let media = props.media;
            let options = media.map((element, idx) => {
                let elemento = element;
                return(<option key = {idx}>{elemento.name}</option>)
            })

            return(
                <div>
                    <label htmlFor= "media" className="h4">Medios: </label><br />
                    <select name= "media" id= "medios" className="form-select form-select-lg mb-3" >
                        <option>elija su medio...</option>
                        {options}
                    </select>
                    
                </div>

            )
            
        }



class Navigation extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            media: []
        }; 
    }

    componentDidMount(){
     data.then(result => {
            this.setState({
                media: result.providers
            });
        })
    }

    

    render(){

        console.log(this.state.media);

        return(
            <nav className = "navbar navbar-expand-lg navbar-light bg-light">
                <form>
                    <div>
                        <p className="h4">Busqueda:</p> <br />
                        <input type= "text" placeholder= "inserte busqueda" className="form-control form-control-lg" />
                    </div>
                    <div>
                        <Nameofmedia media = {this.state.media} />
                            <br />

                        <label htmlFor= "category" className="h4">Categorias:</label> <br />
                        <select name= "category" id="categorias" className="form-select form-select-lg mb-3" >
                            <option>elija su categoria...</option>
                            <option>Ultimas noticias</option>
                            <option>Locales</option>
                            <option>Nacionales</option>
                            <option>Internacionales</option>
                            <option>Economia</option>
                            <option>Politica</option>
                            <option>Policiales</option>
                            <option>Sociedad</option>
                            <option>Salud</option>
                            <option>Cultura</option>
                            <option>Deportes</option>
                            <option>Tecnologia</option>
                        </select>
                    </div>
                    <div>
                        <p className="h4">Desde:</p> <br />
                        <input type="date" min="2020-01-01" className="form-control form-control-lg"/>
                        <br />
                        <p className="h4">Hasta:</p>
                        <input type="date" className="form-control form-control-lg"/>
                    </div>
                </form>
            </nav>
        )
    }
}

export default Navigation;