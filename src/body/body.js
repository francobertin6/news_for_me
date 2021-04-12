import React from 'react';
import "./body.css";


async function first_articles(){
    let url = "https://api.jornalia.net/api/v1/articles?apiKey=51e3d6603d0544d9b4dca7c465d46076";
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

let data = first_articles();


function CREATE_NEWS(props){
    let articles = props.articles;
    // articles carga con las props de la funcion, a esta le daremos el contenido del state en la clase
    
    let news = articles.map((elements, idx) =>  {

        let imageUrl = elements[idx].imageUrl;
        let title = elements[idx].title;
        let description = elements[idx].description;
        let name = elements[idx].provider.name;

        // devuelve un div dividido en dos partes, uno con la imagen de la noticia y su titulo y otro con la descripcion
        return(
            <div key = {idx}>
                <div className = "image_and_title">
                    <img src = {imageUrl} alt = "imagen" />
                    <h3>{title}</h3>
                </div>
                <div className = "description">
                    <p>{description}</p>
                    <p className = "name">{name}</p>
                </div>
            </div>
        )
        
    });

        // lo que en realidad devuelve la funcion, un div grande que va a ir al contenedor donde guarda todas las noticias
        return(
            <div className = "news">
                {news}
            </div>
        )

    }






class Body extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            articles : []
        }
    }

    componentDidMount(){
        // data es la respuesta de la api (jornalia), en base a la busqueda principal de noticias 
        data.then(resp => {
            
            const array_new_array = [];
            
            resp = resp.articles.filter(el =>
                el.imageUrl != null);

                while (resp.length){
                    array_new_array.push(resp.splice(0,8));
                }
             
            // this.setState modifica el estado con array_new_array que tiene todas las noticias que si tienen imagenes en su objeto
            this.setState({
                articles : array_new_array
            });
        })
    }

    
    render(){

        console.log(this.state.articles)

        return(
            <div id = "conteiner_section">
                <CREATE_NEWS articles = {this.state.articles} />
            </div>
        )
    }
}

export default Body;