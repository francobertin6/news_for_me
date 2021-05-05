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
                    <select name= "media" id= "medios" onChange={props.onChange} >
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

        const {handleSearch, handleButton} = this.props;

        return(
            <nav id="nav">
                <form>
                    <div>
                        <p className="h4">Busqueda:</p> <br />
                        <input type= "text" placeholder= "inserte busqueda" onDoubleClick={handleSearch} name="name"/>
                    </div>
                    <div>
                        <Nameofmedia media = {this.state.media} 
                                    onChange = {handleSearch}    />
                            <br />

                        <label htmlFor= "category" className="h4">Categorias:</label> <br />
                        <select name= "category" id="categorias" onChange={handleSearch} ref={this.props.Ref_select} >
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
                        <input type="date" min="2020-01-01"  onChange={handleSearch} name="date1"/>
                        <br />
                        <p className="h4">Hasta:</p>
                        <input type="date" onChange={handleSearch} name="date2"/>
                    </div>
                    <div>
                        <button onClick={handleButton} id="button-send">Send!</button>
                    </div>
                </form>
            </nav>
        )
    }
}

export default Navigation;