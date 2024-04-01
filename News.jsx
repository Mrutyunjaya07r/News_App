import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  article=[]
  constructor(){
    super();
    console.log("hello");
    this.state={
        articles: this.article,
        loading:false
    }

  }
  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=76925ee493424bffa63b855acd5e322a&page=1";
    let data=await fetch(url);
    let parseddata=await data.json();
    console.log(parseddata);
    this.setState({articles:parseddata.articles})
  }
  handlePrevClick = async() =>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=76925ee493424bffa63b855acd5e322a&page=${this.state.page-1}`;
    let data=await fetch(url);
    let parseddata=await data.json();
    console.log(parseddata);
    this.setState({
      page: this.state.page-1,
      articles:parseddata.articles
    })

  }
  handleNextClick = async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=76925ee493424bffa63b855acd5e322a&page=${this.state.page+1}`;
    let data=await fetch(url);
    let parseddata=await data.json();
    console.log(parseddata);
    this.setState({
      page: this.state.page+1,
      articles:parseddata.articles
    })
  }
  render() {

    return (
      <div className='container my-3'>
        <h2>Top Headline</h2>
        <div className='row'>
        {this.state.articles.map((element)=>{
          return  <div className='col-md-4' key={element.url}>
                  <NewsItem  title={element.title} decprection={element.description}  imageUrl={element.urlToImage} newsUrl={element.url} /> 
                   </div>
        })} 
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-primary" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button type="button" class="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
       
      </div>
    )
  }
}
