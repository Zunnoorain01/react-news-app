import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export class News extends Component {
    static defaultProps ={
        country:"us",
        pageSize:10,
        category:"general"
    }
    static propsTypes ={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5fed673c7b04db48890cfd661cf2d6e&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData.articles[0].author);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading:false

        });
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5fed673c7b04db48890cfd661cf2d6e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({loading:false})
        // console.log(parseData.articles[0].author);
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles
        });
    }
    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
            // // alert("No More News");
        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5fed673c7b04db48890cfd661cf2d6e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({loading:false})
            // console.log(parseData.articles[0].author);
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles
            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                {this.state.loading&&<Spinner />}
                <h2 className='my-5'>Top Headings ({this.props.category})</h2>
                <div className='d-flex justify-content-between text-secondary'>

                    <h2 className='my-5'>Total News : {Math.ceil(this.state.totalResults / 20) * 20}</h2>
                    <h2 className='my-5'>Page : {this.state.page}</h2>
                </div>
                <div className="row">
                    {!this.state.loading&&this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4 my-3" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 45) : ""}
                                    description={element.description ? element.description.slice(0, 88) : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : "data:image/png;base64,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"}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                />
                            </div>

                        );
                    })}

                </div>

                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} className='btn btn-dark btn-lg' onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-primary btn-lg' onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News


