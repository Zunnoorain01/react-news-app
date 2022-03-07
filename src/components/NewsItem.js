import React, { Component } from 'react'
import "../App.css"
export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl,author,date} = this.props;
        return (
            <div>
                <div className="card" >
                    <img className="card-img-top" src={imageUrl} alt="Card image" />
                    <div className="card-body">
                        <h4 className="card-title text-center">{title}...</h4>
                        
                        <p className="card-text text-center">{description}....<span class="badge badge-secondary bg-dark">New</span></p>
                        
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} | Last updated {new Date(date).toGMTString().slice(0,16)}</small></p>
                        <a rel='norefenece' href={newsUrl} className="btn btn-dark linkBtn" target={"_blank"}>Go to Link</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem