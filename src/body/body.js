import React from 'react';
import "./body.css";


async function first_articles(){
    let url = "https://api.jornalia.net/api/v1/articles?apiKey=51e3d6603d0544d9b4dca7c465d46076";
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

let data = first_articles();


class Body extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            articles : [],
            news_index : 0
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        // data es la respuesta de la api (jornalia), en base a la busqueda principal de noticias 
        data.then(resp => {
            
            const array_new_array = [];
            
            resp = resp.articles.filter(el =>
                el.imageUrl != null);

                while (resp.length){
                    array_new_array.push(resp.splice(0,9));
                }
             
            // this.setState modifica el estado con array_new_array que tiene todas las noticias que si tienen imagenes en su objeto
            this.setState({
                articles : array_new_array
            });
        })
    }

    handleClick(e){
        let number = e.target.id;

        this.setState({
            news_index : number
        })
    }

   
    render(){

        console.log(this.state.articles);
        // console.log(this.state.news_index);

        return(
            <div id = "conteiner_section">
                <CREATE_NEWS    articles = {this.state.articles} news_index = {this.state.news_index} />
                <CREATE_POINTS  articles = {this.state.articles}  onClick = {this.handleClick}  />
            </div>
        )
    }
}




function CREATE_NEWS(props){
    let articles = props.articles;
    let news_index = props.news_index;

    console.log(news_index)
    // articles carga con las props de la funcion, a esta le daremos el contenido del state en la clase

    // IMPORTANTICIMO: ? CLAVE EN ESTE TIPO DE OCACIONES DONDE TE TIRA UNDEFINED CUANDO NO LO ES
    let news = articles[news_index]?.map((element, idx) => {
        
        let imageUrl = element.imageUrl;
        let title = element.title;
        let description = element.description;
        let name = element.provider.name;

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


    function CREATE_POINTS(props){
        let points = props.articles;
        let lenght_points = points?.length;
        let array = [];

        for (let index = 0; index < lenght_points; index++) {
            let point = <div    key= {index} 
                                id ={index} 
                                onClick = {props.onClick}> 

                                <p> {index + 1} </p> 

                        </div>
            array.push(point);
        }

        let slider = array.map((element) => {
            return element
        })

        return(
            <div className = "slider_section">
                {slider}
            </div>
        )
    }





export default Body;