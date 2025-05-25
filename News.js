import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";


export class News extends React.Component {
  constructor(props) {
    super(props);
    console.log("hello Im a comstructor of news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  // async componentDidMount() {
  //  // let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=189cc2f9229748ab8c8f83b2f9cb0ce4&page=1&pageSize=${this.props.pageSize}`;
  //   let url =`https://newsapi.org/v2/top-headlines?country=us&apiKey=apiKey=189cc2f9229748ab8c8f83b2f9cb0ce4&page=1&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({ articles: parsedData.articles, 
  //     totalResults: parsedData.totalResults,
  //     loading: false });
  // }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=189cc2f9229748ab8c8f83b2f9cb0ce4&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ 
        articles: parsedData.articles, 
        totalResults: parsedData.totalResults,
        loading: false 
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({loading: false});
    }
  }

  // handlePrevClick = async () => {
  //   console.log("Prev click");
  //  // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e2c18d68a8974d4790003a0dd867b99c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=apiKey=189cc2f9229748ab8c8f83b2f9cb0ce4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   });
  // };
  handlePrevClick = async () => {
    console.log("Prev click");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=189cc2f9229748ab8c8f83b2f9cb0ce4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({loading: false});
    }
  };

  // handleNextClick = async () => {
  //   console.log("Next click");
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //  //   let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=189cc2f9229748ab8c8f83b2f9cb0ce4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=apiKey=189cc2f9229748ab8c8f83b2f9cb0ce4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     console.log(parsedData);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     });
  //   }
  // };
  

  handleNextClick = async () => {
    console.log("Next click");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=189cc2f9229748ab8c8f83b2f9cb0ce4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching news:", error);
        this.setState({loading: false});
      }
    }
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <h1 className="text-center">EchoNews - Top HeadLines</h1>
          {this.state.loading && <Spinner />}    {/*if this.state.loading is true then show spinner */}
          <div className="row">
            {!this.setState.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
              &larr; Previous
            </button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;