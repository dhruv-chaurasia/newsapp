import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 5,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            presentResults: 0
            // pageSize: this.props.pageSize
        }
        document.title = `${this.capitalize(this.props.category)} - News Monkey`;
        // console.log(this.props.pageSize)
    }
    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.substring(1, word.length).toLowerCase();

    }
    async update() {
        this.props.progress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.progress(30)
        let parsedData = await data.json()
        this.props.progress(70)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        }
        )
        this.props.progress(100)
    }
    fetchMoreData = async () => {
        await this.setState({ page: this.state.page + 1 }, async() => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
            }
            )
        })

    }
    async componentDidMount() {
        this.update();
    }

    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 }, () => { // Passed as a callback function so that update() works only after setState is over
    //         this.update()
    //     })
    // }

    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 }, () => {


    //         this.update()
    //     })
    // }
    render() {
        return (
            <>
                <div className="container my-3">
                    <h1 className='text-center' style={{ margin: "35px 0px" }}>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            {<div className="row my-3">
                                {this.state.articles.map((element) => {
                                    return <div className="d-inline-flex col-md-4 " key={element.url}>
                                        <NewsItem title={element.title ? element.title : ""} desc={element.description ? element.description: ""} imageUrl={element.urlToImage ? element.urlToImage : "https://static.toiimg.com/photo/msid-99416197/99416197.jpg?pl=37494"} newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>}
                        </div>
                    </InfiniteScroll>
                    {/* {<div className="container d-flex justify-content-between">
                        <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}> &larr; Previous</button>
                        <button type="button" className="btn btn-dark" disabled={!(this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize))} onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>} */}
                </div>
            </>
        )
    }
}

export default News