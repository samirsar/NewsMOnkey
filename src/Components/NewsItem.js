import React, { Component } from "react";
import PropTypes from "prop-types";

export class NewsItem extends Component {
  static propTypes = {};

  render() {
    const { imageurl, title, description, url, source } = this.props;
    let des = description;

    if (!des) {
      des = "Not Available";
    } else {
      if (des.length > 50) {
        des = des.slice(0, 50) + "......";
      }
    }

    return (
          <div className="row justify-content-center my-3" style={{ width: "20rem" } }>
            <div className="button  d-flex justify-content-end" >
              <button type="button" className="btn btn-danger" style={{borderRadius:27,height:25,paddingTop:0}}>{source}</button>
            </div>
          <div className="card  " style={{ width: "18rem" }}>
            <img
              src={
                imageurl ? imageurl : "https://images.mktw.net/im-468257/social"
              }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{des}</p>
              <a href={url} className="btn btn-dark">
                Read More
              </a>
            </div>
          </div>
          </div>
      
    );
  }
}

export default NewsItem;
