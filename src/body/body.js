import React from 'react';
import "./body.css";
import "./Components/navigation.css";
import Navigation from "./Components/navigation";
import arrow1 from "./images/play.svg";
import arrow2 from "./images/play1.svg";

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
        this.ref_nav = React.createRef();
        this.category_ref = React.createRef();
        this.create_news_ref = React.createRef();
        this.points_ref = React.createRef();
        
        this.state = {
            // articles es el array que contiene las noticias
            articles : [],
            // news_index es el numero de pagina concurrente, aumenta o disminuye segun contacto con el usuario
            news_index : 0,
            // history_search contiene objetos con parametros de busqueda pasados
            history_search: [],
            // categories va a ser un array donde se guardaran todas las categorias de mi diario
            categories: [],
            // category news si o no
            category_news : true
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleArrow = this.handleArrow.bind(this);
        this.handleArrow1 = this.handleArrow1.bind(this);
        this.handleButton_news = this.handleButton_news.bind(this);
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

            let resp1 = resp.articles.filter(el => el.imageUrl !== null);

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
                articles : array_definitivo,
            });
        })

    }

    handleClick(e){
        let number = e.target.id;
        console.log(e.target.id)

        this.setState({
            news_index : number
        })

    }


    // averigua el valor del SEARCH en la navegacion
    handleSearch(e){

        let name = e.target.name;

        if(name === "name"){
            setTimeout(() => {
                object_search.name = e.target.value;
            }, 350);
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

    // establezco el array articles de donde se sacan las noticias en un array vacio
    this.setState({
        articles : []
    })

    history_array.push(object_search);

        this.setState({
            history_search: history_array
        });

        let url = 'https://api.jornalia.net/api/v1/articles?apiKey=51e3d6603d0544d9b4dca7c465d46076&search='+object_search.name+'&providers='+object_search.media+'&categories='+object_search.category+'&startDate='+object_search.date1+'&endDate='+ object_search.date2;
        
        let data = search(url);
        
        data.then(resp => {
            const array_new_array = [];
            
            resp = resp.articles.filter(el =>
                el.imageUrl != null);

                while (resp.length >= 8){
                    array_new_array.push(resp.splice(0,8));
                }
             
            // this.setState modifica el estado con array_new_array que tiene todas las noticias que si tienen imagenes en su objeto
            this.setState({
                articles : array_new_array
            });

        })

        this.setState({
            category_news: false
        })

        console.log(object_search)
   }

   handleArrow(e){
        e.preventDefault();
        

        let number = e.target.offsetParent.id;
        let div_category = this.category_ref.current.children[number].children[1];

        console.log(this.category_ref.current.children[number].children[1]);
        console.log(this.category_ref);

        let scroll_widht = div_category.scrollWidth;

        if(div_category.scrollLeft <= scroll_widht){

            let n = div_category.scrollLeft;

            div_category.scrollLeft = n + 400;

        } 
   }

   handleArrow1(e){
        e.preventDefault();
        

        let number = e.target.offsetParent.id;
        let div_category = this.category_ref.current.children[number].children[1];

        let scroll_widht = div_category.scrollWidth;

        if(div_category.scrollLeft <= scroll_widht){

            let n = div_category.scrollLeft;

            div_category.scrollLeft = n - 400;

        } 
   }

   handleButton_news(e){

        e.preventDefault();

        // data es la respuesta de la api (jornalia), en base a la busqueda principal de noticias 
        data.then(resp => {

            let resp1 = resp.articles.filter(el => el.imageUrl !== null);

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
                articles : array_definitivo,
                category_news : true
            });

            
        })
   }

    render(){

        console.log(this.state.category_news)

        if(this.state.category_news === true){
        return(
            <div id = "conteiner_section">
                <Navigation 
                handleSearch = {this.handleSearch} 
                handleButton = {this.handleButton}
                ref_nav = {this.ref_nav}
                Ref_select = {this.Ref_select}
                />
                <CREATE_CATEGORY_NEWS 
                articles = {this.state.articles} 
                articles_lenght = {this.state.articles_lenght} 
                category_ref = {this.category_ref}
                handleArrow1 = {this.handleArrow1}
                handleArrow2 = {this.handleArrow}
                />
            </div>
        )}
        else{
            return(
            <div id = "conteiner_section">
                <Navigation 
                handleSearch = {this.handleSearch} 
                handleButton = {this.handleButton}
                ref_nav = {this.ref_nav}
                Ref_select = {this.Ref_select}
                />
                <CREATE_NEWS    
                articles = {this.state.articles} 
                news_index = {this.state.news_index} 
                create_news_ref = {this.create_news_ref}
                handleButton_news = {this.handleButton_news}
                />   
                <CREATE_POINTS  
                articles = {this.state.articles}  
                onClick = {this.handleClick} 
                points_ref = {this.points_ref}
                />  
            </div>
            )}
    }
}




    function CREATE_NEWS(props){
    let articles = props.articles;
    let news_index = props.news_index;

    // articles carga con las props de la funcion, a esta le daremos el contenido del state en la clase

    if(articles.length === 0){
        return(
            <div className="loading_container" ref={props.create_news_ref}>
                <div className="loading_title">
                    <h1>Tus noticias se estan cargando...</h1>
                </div>
                <div className="main_span">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }else{

    // IMPORTANTICIMO: ? CLAVE EN ESTE TIPO DE OCACIONES DONDE TE TIRA UNDEFINED CUANDO NO LO ES
    let news = articles[news_index]?.map((element, idx) => {
        
        let imageUrl = element.imageUrl;
        let title = element.title;
        let name = element.provider.name;
        let url = element.sourceUrl;

        // devuelve un div dividido en dos partes, uno con la imagen de la noticia y su titulo y otro con la descripcion

        

        return(
            <div key = {idx}>
                <div className = "image_and_title">
                    <img src = {imageUrl} alt = "imagen" />
                </div>
                <div className = "description">
                    <a target="_blank" href={url} rel="noreferrer"><h3>{title}</h3></a>
                    <p className = "names">{name}</p>
                </div>
            </div>
        )

    });

    function object_search_result (){

            if(object_search.name !== "" ){
                return object_search.name
            }
            else if(object_search.media !== "" ){
                return object_search.media
            }
            else if(object_search.category !== "" ){
                return object_search.category
            }
            else if(object_search.date1 !== "" ){
                return object_search.date1
            }
            else if(object_search.date2 !== ""){
                return object_search.date2
            }
        }

    console.log(object_search_result())

        // lo que en realidad devuelve la funcion, un div grande que va a ir al contenedor donde guarda todas las noticias
        return(
            <div className = "div_news" ref={props.create_news_ref} >

                <button onClick={props.handleButton_news}>Volver</button>
                
                <div className= "name">
                    <p>{object_search_result()}</p>
                </div>

                <div className = "news">
                    {news}
                </div>

            </div>
        )

    }
} 


    function CREATE_POINTS(props){
        let points = props.articles;
        let lenght_points = points?.length;
        let number_props = props?.news_index;
        let array = [];

        console.log(number_props);

        let style_point;
        for (let index = 0; index < lenght_points; index++) {

            if(number_props !== index){
                style_point = {
                    background : "rgb(70, 70, 218)"
                }
            }else{
                style_point = {
                    background : "black"
                }
            }
            // point es el punto para pasar pagina
            let point = <div    key= {index} 
                                id ={index} 
                                onClick = {props.onClick}
                                style ={style_point}
                                > 
                                
                                <p 
                                id={index} 
                                onClick= {props.onClick}
                                > 
                                {index + 1} 
                                </p> 

                        </div>

            array.push(point);
        }

        let slider = array.map((element) => {
            return element
        })

        return(
            <div className = "slider_section" ref={props.points_ref}>
                {slider}
            </div>
        )
    }

    function CREATE_CATEGORY_NEWS(props){
        let articles = props.articles;

        if(articles.length === 0){
            return(
                <div className="loading_container" ref={props.category_ref}>
                    <div className="loading_title">
                        <h1>Tus noticias se estan cargando...</h1>
                    </div>
                    <div className="main_span">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )}
            else{

        let category_div = articles?.map((element, idx) => {
 
            let category = element[0].category;

            let news = element.map((news) => {
                let imageUrl = news.imageUrl;
                let title = news.title;
                let category = news.category;
                let url = news.sourceUrl;
                
                return(
                    <div className={category}>
                        <img src = {imageUrl} alt="imagen"></img>
                        <p><a href={url} target="_blank" rel="noreferrer">{title}</a></p>
                    </div>
                )
            })

            return( 
                <div className={idx}>
                    <div className="category">
                        <p>{category}</p>
                    </div>
                    <div className="category_content">
                        {news}
                    </div> 
                    <div className="arrows" id={idx}>
                        <img src={arrow1} alt="arrow1" width="25px" height="25px" className="black" id="black1" onClick = {props.handleArrow1}/>
                        <img src={arrow1} alt="arrow1" width="25px" height="25px" className="black" id="black2" onClick = {props.handleArrow2} />
                    </div>
                </div>
            )
        });

        return (
            <div id="category_container" ref={props.category_ref}>
                {category_div}
            </div>
        )
    }
}

    



export default Body;