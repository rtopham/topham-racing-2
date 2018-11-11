import React, {Component} from 'react'
import {Image} from "react-bootstrap"
import {listBannersByUserNoAuth} from '../banner/api-banner'

class Banner extends Component {
state={
  banners:[]
}


componentDidMount = () => {
  this.loadBanners(this.props.userId)
    }

loadBanners = (user) =>{

    listBannersByUserNoAuth({
      userId: user
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({banners: data})

      }
    })
  }

render() {
  if(!this.state.banners[0]) return null

const currentBanner= Math.floor(Math.random()*this.state.banners.length)
const bannerURL='/api/banners/photo/'+this.state.banners[currentBanner]._id
    return (
      <Image responsive rounded src={bannerURL}/>

    )
  }


}

export default Banner
