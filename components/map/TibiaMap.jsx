import React, { Component } from 'react'
import L from 'leaflet'

import { Map } from './styled'
import crosshairs from './crosshairs'
import levelButtons from './levelButtons'
import coordinates from './coordinates'
import TibiaMap from './tibiaMap'

export default class BoundsExample extends Component {
  componentDidMount() {
    // Customized version of https://github.com/frankrowe/Leaflet.Crosshairs
    crosshairs(L)
    levelButtons(L)
    coordinates(L)

    var tibiaMap = new TibiaMap()
    tibiaMap.init()
    L.LevelButtons.btns.setTibiaMap(tibiaMap)

    tibiaMap.map.on('baselayerchange', this.handleLayerChange)

    const dragonIcon = new L.Icon({
      iconUrl: '/static/images/creature/Dragon.gif',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    const markers = [
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([L.marker(tibiaMap.map.unproject([32385, 31708]), { icon: dragonIcon })]),
      L.layerGroup([L.marker(tibiaMap.map.unproject([32385, 31708]), { icon: dragonIcon })]),
      L.layerGroup([L.marker(tibiaMap.map.unproject([32385, 31708]), { icon: dragonIcon })]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
      L.layerGroup([]),
    ]

    console.log(tibiaMap.map.unproject([0, 0]).lng - tibiaMap.map.unproject([1, 1]).lng)
    console.log(tibiaMap.map.unproject([0, 0]).lat - tibiaMap.map.unproject([1, 1]).lat)

    markers[tibiaMap.floor].addTo(tibiaMap.map)

    this.setState({
      tibiaMap,
      markers,
    })
  }

  handleLayerChange = layer => {
    const {
      tibiaMap: { map },
      markers,
    } = this.state
    const floor = layer.layer.options.floor

    markers.forEach((item, index) => {
      if (index === floor) {
        item.addTo(map)
      } else {
        item.remove()
      }
    })
  }

  render() {
    return <Map id="map" style={{ width: '900px', height: '800px' }} />
  }
}
