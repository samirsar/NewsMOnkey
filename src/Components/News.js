import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
// rce
export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:5
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number

  }
  constructor(props){
    super(props); 
    // console.log("constructor");
    this.state = {
      items: [],
      DataisLoaded: false,
      page:1,
      Newarticle:[]
      
      
  };

  }
  
 async componentDidMount(){
  //  console.log("cmd");
  this.setState({DataisLoaded:false});

  this.props.setprogress(10);
     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=0482f8e79dd34e53a53d1a89bfad632f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     
     let res=await fetch(url);
     let data=await res.json();
    //  console.log(data);
     this.setState({
       items: data,
       DataisLoaded:true,
       Newarticle:data.articles,
       
      });
      
      this.props.setprogress(100);
    //  console.log("cmd",this.state.page);

    

  

  }
  // this next btn for the next page's newz;
  Nextbtn=  ()=>{
    // console.log("next",this.state.page);
    this.setState({DataisLoaded:false,
      items:[],
      page:1+this.state.page
      
    });
     setTimeout(async () => {
      
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=0482f8e79dd34e53a53d1a89bfad632f&page=${this.state.page}&pageSize=${this.props.pageSize}`;

  
      // console.log(url);
  
      let res=await fetch(url);
       let data=await res.json();
  
       this.setState({
      items: data,
      DataisLoaded:true,
  
      
       });
  
      //  console.log(this.state.page);
    }, 1000);
    
  
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // this page for previous page
  Prevbtn=()=>{
    // console.log("previous");
    
    this.setState({DataisLoaded:false,items:[],page:this.state.page-1});
    setTimeout(async () => {
      
       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=0482f8e79dd34e53a53d1a89bfad632f&page=${this.state.page}&pageSize=${this.props.pageSize}`;

      let res=await fetch(url);
  
       let data=await res.json();
        // console.log(data);
       this.setState({
      items: data,
      DataisLoaded:true,
      
       });
    }, 1000);

  }
  
  /////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  fetchMoreData = async () => {
       // a fake async api call like which sends
       // 20 more records in 1.5 secs
       this.setState({page:this.state.page+1});
      setTimeout(async () => {
         
         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=0482f8e79dd34e53a53d1a89bfad632f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
         let res=await fetch(url);
     
          let data=await res.json();
          //  console.log(data);
           this.setState({
             Newarticle:this.state.Newarticle.concat(data.articles)
           });
       }, 1000);

       

    
     };
  render() {
    console.log("it is third last latest  commit");
    console.log("what is your view");
    const article=this.state.items.articles;
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // this commented line is another type of using map key
    // const article=this.state.items.results;
  /*
    var p=[];
    for(let key in article)
    {
      p.push(
        
        <NewsItem title={article[key].title} description={article[key].description} url={article[key].url}  imageurl={article[key].urlToImage  } source={article[key].source.name}  />
        
        );
        
      }
      */
      // console.log("reder",p.length);

      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return (
      <div>
        
        <div className="container  ">
        

          <div className="row">
           
                <div className="col-6">
                  <h1>Top Headline-NewsMonkey</h1>
                </div>
          </div>
          <div className="row ">
           
              
                  {/* {!this.state.DataisLoaded && <Spinner/>} */}
              
          </div>
          <div className="row   justify-content-around">
          <InfiniteScroll className="row"
          dataLength={this.state.Newarticle.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<Spinner/>}
        >
                {(this.state.Newarticle)?.map((elem)=>{
                  return  <div key={elem.urlToImage} className="col">
                  <NewsItem  title={elem.title} description={elem.description} url={elem.url}  imageurl={elem.urlToImage  } source={elem.source.name}  />
                  </div>
                  
                })}
                </InfiniteScroll>
          </div>
          <div className="row my-5 ">
             <div className="col-6 d-flex flex-row-reverse">
             <button type="button" className="btn btn-dark" disabled={this.state.page<=1} onClick={this.Prevbtn}>&laquo; Previous</button>
             </div>
             <div className="col-6 ">
             <button type="button" className="btn btn-dark" disabled={this.state.page>=Math.ceil(this.state.items.totalResults)/(this.props.pageSize)} onClick={this.Nextbtn}>Next &raquo;</button>
             </div>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
