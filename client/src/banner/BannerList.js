import React, {Component} from 'react'
import BannerRow from './BannerRow'

class BannerList extends Component {
  state={

    openBanner:''
  }

updateOpenBanner = (banner) =>{

//  console.log(race)
  this.setState({openBanner:banner})
}

  render() {

return (
      
        this.props.banners.map((item, i) => {
          const open = item===this.state.openRace? true:false
          return<BannerRow open={open} banner={item} key={i} updateOpenBanner={this.updateOpenBanner} reloadBanners={this.props.reloadBanners} />
                             
          })
      
    )
  }
}

export default BannerList
