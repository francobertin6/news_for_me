import React from 'react';
import "./body.css";
import "./Components/navigation.css"
import Navigation from "./Components/navigation";


async function first_articles(){
    let url = "https://api.jornalia.net/api/v1/articles?apiKey=51e3d6603d0544d9b4dca7c465d46076";
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

async function search(url){
    const resp = await fetch(url);
    const data = await resp.json();
    return data
}

let data = first_articles();

const history_array = [];

let object_search = {
    name: "",
    media: "",
    category: "",
    date1: "",
    date2: ""
}


class Body extends React.Component{
    constructor(props){
        super(props);
        this.Ref_select = React.createRef();
        
        this.state = {
            // articles es el array que contiene las noticias
            articles : [],
            // news_index es el numero de pagina concurrente, aumenta o disminuye segun contacto con el usuario
            news_index : 0,
            // history_search contiene objetos con parametros de busqueda pasados
            history_search: [],
            // categories va a ser un array donde se guardaran todas las categorias de mi diario
            categories: []
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    componentDidMount(){
          // intento de sacarles las categorias a navigation
        const Categories_array = [];

        let elements = this.Ref_select.current.children;
          
        for (let index = 1; index < elements.length; index++) {
            const element = elements[index].textContent;
            Categories_array.push(element);
        }

        this.setState({
            categories : Categories_array
        })


 // data es la respuesta de la api (jornalia), en base a la busqueda principal de noticias 
        data.then(resp => {

            let resp1 = resp.articles.filter(el => el.imageUrl != null);

            // contiene todos los arrays juntados por categoria
            const array_new_array = [];

            for (let index = 0; index < this.state.categories.length; index++) {
                const category = this.state.categories[index];

                let array_category = resp1.filter(element => element.category === category);
                
                array_new_array.push(array_category);
                
            }

            // este array agarra los arrays vacios y los elimina
            const array_definitivo = array_new_array.filter(el => el.length !== 0);
            
            // this.setState modifica el estado con array_new_array que tiene todas las noticias que si tienen imagenes en su objeto
            this.setState({
                articles : array_definitivo
            });
        })

    }

    handleClick(e){
        let number = e.target.id;

        this.setState({
            news_index : number
        })
    }


    // averigua el valor del SEARCH en la navegacion
    handleSearch(e){

        let name = e.target.name;

        if(name === "name"){
            object_search.name = e.target.value;
        }
        if(name === "media"){
            object_search.media = e.target.value;
        }
        if(name === "category"){
            object_search.category = e.target.value;
        }
        if(name === "date1"){
            object_search.date1 = e.target.value;
        }
        if(name === "date2"){
            object_search.date2 = e.target.value;
        }
    }

    //boton que manda el objeto a history_search y realiza la llamada a la api    
   handleButton(e){
    e.preventDefault()
    history_array.push(object_search);

        this.setState({
            history_search: history_array
        });

        let url = 'https://api.jornalia.net/api/v1/articles?apiKey=51e3d6603d0544d9b4dca7c465d46076&search='+object_search.name+'&providers='+object_search.media+'&categories='+object_search.category+'&startDate='+object_search.date1+'&endDate='+ object_search.date2;
        
        let data = search(url);
        console.log(url);

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

  

    render(){

        // console.log(this.state.history_search);
        console.log(this.state.articles);
        console.log(this.state.categories);

        return(
            <div id = "conteiner_section">
                <Navigation 
                handleSearch = {this.handleSearch} 
                handleButton = {this.handleButton}
                Ref_select = {this.Ref_select}
                />
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

   /* function CREATE_CATEGORY_NEWS(props){

    }*/




export default Body;