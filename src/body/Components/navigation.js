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
                return(<option key = {idx}>{elemento._id}</option>)
            })

            return(
                <div>
                    <p><label htmlFor= "media" className="h4">Medios: </label></p>
                    <select name= "media" id= "medios" onChange={props.onChange} >
                        <option value="">elija su medio...</option>
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

        const {handleSearch, handleButton} = this.props;
       
        return(
            <nav id="nav" ref = {this.props.ref_nav}>
                <form>
                    <div>
                        <p className="h4">Busqueda:</p>
                        <input type= "text" placeholder= "inserte busqueda" onKeyUp={handleSearch} name="name"/>
                    </div>
                    <div>
                        <Nameofmedia media = {this.state.media} 
                                    onChange = {handleSearch}    />
                            
                    </div>
                    <div>
                        <p><label htmlFor= "category" className="h4">Categorias:</label></p>
                        <select name= "category" id="categorias" onChange={handleSearch} ref={this.props.Ref_select} >
                            <option value="">elija su categoria...</option>
                            <option value="ULTIMAS_NOTICIAS">Ultimas noticias</option>
                            <option value="LOCALES">Locales</option>
                            <option value="NACIONALES">Nacionales</option>
                            <option value="INTERNACIONALES">Internacionales</option>
                            <option value="ECONOMIA">Economia</option>
                            <option value="POLITICA">Politica</option>
                            <option value="POLICIALES">Policiales</option>
                            <option value="SOCIEDAD">Sociedad</option>
                            <option value="SALUD">Salud</option>
                            <option value="CULTURA">Cultura</option>
                            <option value="DEPORTES">Deportes</option>
                            <option value="TECNOLOGIA">Tecnologia</option>
                        </select>
                    </div>
                    <div>
                        <p className="h4">Desde:</p> 
                        <input type="date" min="2020-01-01" onChange={handleSearch} name="date1"/>
                    </div>
                    <div>
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