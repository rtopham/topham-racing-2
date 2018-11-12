import React, {Component} from 'react'
import {Image} from "react-bootstrap"
import {listBannerLinksByUserNoAuth} from '../bannerlink/api-bannerLink'

class BannerLink extends Component {
state={
  banners:[],
  currentBanner:0
}


componentDidMount = () => {
  this.loadBanners(this.props.userId)

    }

loadBanners = (user) =>{

    listBannerLinksByUserNoAuth({
      userId: user
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({banners: data, currentBanner: Math.floor(Math.random()*data.length)})

      }
    })
  }

render() {
  if(!this.state.banners[0]) return null


//const bannerURL='/api/banners/photo/'+this.state.banners[currentBanner]._id
const bannerURL='/banners/'+this.state.banners[this.state.currentBanner].filename
    return (
      <Image responsive rounded src={bannerURL}/>

    )
  }


}

export default BannerLink
