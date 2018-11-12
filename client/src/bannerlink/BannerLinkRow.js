import React, {Component} from 'react'
import DeleteBanner from './DeleteBannerLink'
import "./Banner.css"

class BannerLinkRow extends Component {

render() {

const imgUrl='/banners/'+this.props.banner.filename


const divStyle={
  height: "220px",
  width: "100%",
  backgroundImage: 'url(' + imgUrl + ')',
  backgroundSize: "cover",
  marginBottom: "20px"
}

 return (
        <div className="modal-container" style={divStyle}>
        <DeleteBanner container={this} userId={this.props.banner.postedBy._id} bannerId={this.props.banner._id} reloadBanners={this.props.reloadBanners}/> 
        </div>
     
    )
  }


}

export default BannerLinkRow
