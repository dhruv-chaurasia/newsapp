import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, desc, imageUrl, newsUrl, author, time, source } = this.props
        return (
            <>
                <div>
                    <div className="card my-2" style={{ cursor: 'pointer' }} onClick={() => {
                        window.open(newsUrl, "_blank")
                    }} >
                        <div>
                            <span className="badge rounded-pill bg-danger" style={{
                                display: 'inline-flex',
                                position: 'absolute',
                                right: '0'
                            }}>
                                {source}
                            </span>
                        </div>
                        <img src={imageUrl} alt="Not able to load" style={{ height: "180px" }} className="card-img-top" />
                        <div className="card-body">
                            <div style={{}}>
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text"><small className="text-body-secondary">Published by {author ? author : "Unknown"} at {new Date(time).toUTCString()}</small></p>
                                <p className="card-text">{desc}</p>
                            </div>
                            <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-sm btn-dark">Read More</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem