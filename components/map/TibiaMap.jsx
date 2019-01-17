import React, { Component } from 'react'
import L from 'leaflet'
import styled from 'styled-components'

const Map = styled.div`
  canvas {
    image-rendering: -webkit-optimize-contrast; /* Old Android, Safari, UC Browser */
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: crisp-edges; /* Safari */
    image-rendering: pixelated; /* Chrome & Opera */
    /* Note: keep this declaration at the bottom until
	   https://github.com/postcss/autoprefixer/issues/632 is fixed. */
    -ms-interpolation-mode: nearest-neighbor; /* IE */
  }

  canvas,
  .leaflet-container {
    background: #000;
  }

  .leaflet-zoom-anim .leaflet-zoom-animated {
    transition-duration: 0.15s;
  }

  .leaflet-control-layers {
    display: none;
  }

  .leaflet-control-zoom-in {
    line-height: 1.3;
  }

  .leaflet-control-zoom-out {
    line-height: 1.1;
  }
`

const outer = [[50.505, -29.09], [52.505, 29.09]]
const inner = [[49.505, -2.09], [53.505, 2.09]]

export default class BoundsExample extends Component {
  componentDidMount() {
    // Customized version of https://github.com/frankrowe/Leaflet.Crosshairs
    L.Crosshairs = L.LayerGroup.extend({
      options: {
        style: {
          opacity: 1,
          fillOpacity: 0,
          weight: 2,
          color: '#333',
          clickable: false,
          pointerEvents: 'none',
        },
      },
      initialize: function(options) {
        L.LayerGroup.prototype.initialize.call(this)
        L.Util.setOptions(this, options)
        this.crosshair = {
          rectangle: L.rectangle([[0, 0], [1, 1]], this.options.style),
          longitude_line_north: L.polyline([], this.options.style),
          longitude_line_south: L.polyline([], this.options.style),
          latitude_line_east: L.polyline([], this.options.style),
          latitude_line_west: L.polyline([], this.options.style),
        }
        for (var layer in this.crosshair) {
          this.addLayer(this.crosshair[layer])
        }
      },
      onAdd: function(map) {
        this._map = map
        this._moveCrosshairs({
          latlng: this._map.getCenter(),
        })
        this._map.on('click', this._moveCrosshairs.bind(this))
        this._map.on('move', this._moveCrosshairs.bind(this))
        this._map.on('zoomend', this._moveCrosshairs.bind(this))
        this._map.on('mouseover', this._show.bind(this))
        this.eachLayer(map.addLayer, map)
      },
      onRemove: function(map) {
        this._map.off('click', this._moveCrosshairs)
        this._map.off('zoomend', this._moveCrosshairs)
        this.eachLayer(this.removeLayer, this)
      },
      _show: function() {
        this.eachLayer(function(l) {
          this._map.addLayer(l)
        }, this)
      },
      _hide: function() {
        this.eachLayer(function(l) {
          this._map.removeLayer(l)
        }, this)
      },
      _moveCrosshairs: function(e) {
        var bounds
        if (e.latlng) {
          var pos = this._map.project(e.latlng, 0)
          var x = Math.floor(pos.x)
          var y = Math.floor(pos.y)
          bounds = L.latLngBounds(this._map.unproject([x, y], 0), this._map.unproject([x + 1, y + 1], 0))
        } else {
          bounds = this.crosshair.rectangle.getBounds()
        }
        var latlng = bounds.getCenter()
        this.crosshair.rectangle.setBounds(bounds)
        var point = this._map.project(latlng)
        this.crosshair.longitude_line_north.setLatLngs([
          this._map.unproject([point.x, point.y]),
          this._map.unproject([point.x, this._map.getPixelBounds().min.y]),
        ])
        this.crosshair.longitude_line_south.setLatLngs([
          this._map.unproject([point.x, point.y]),
          this._map.unproject([point.x, this._map.getPixelBounds().max.y]),
        ])
        this.crosshair.latitude_line_east.setLatLngs([
          this._map.unproject([point.x, point.y]),
          this._map.unproject([this._map.getPixelBounds().min.x, point.y]),
        ])
        this.crosshair.latitude_line_west.setLatLngs([
          this._map.unproject([point.x, point.y]),
          this._map.unproject([this._map.getPixelBounds().max.x, point.y]),
        ])
      },
    })
    L.crosshairs = function(options) {
      return new L.Crosshairs(options)
    }

    L.LevelButtons = L.Control.extend({
      options: {
        position: 'topleft',
        autoZIndex: true,
      },
      onAdd: function(map) {
        this._map = map
        var plugin_container = L.DomUtil.create('div', 'leaflet-control-level-buttons-panel leaflet-bar')

        var up_button = L.DomUtil.create('a', 'leaflet-control-level-buttons-a', plugin_container)
        up_button.textContent = '\u25B2'
        up_button.href = '#'
        L.DomEvent.addListener(up_button, 'click', this._onUpButton, this)
        L.DomEvent.disableClickPropagation(up_button)
        plugin_container.appendChild(up_button)

        var floor_button = L.DomUtil.create('span', 'leaflet-control-level-buttons-span', plugin_container)
        floor_button.id = 'floor_button'

        plugin_container.appendChild(floor_button)

        var down_button = L.DomUtil.create('a', 'leaflet-control-level-buttons-a', plugin_container)
        down_button.textContent = '\u25BC'
        down_button.href = '#'
        L.DomEvent.addListener(down_button, 'click', this._onDownButton, this)
        L.DomEvent.disableClickPropagation(down_button)
        plugin_container.appendChild(down_button)

        return plugin_container
      },
      onRemove: function() {},
      _onUpButton: function(event) {
        var upper_floor_index = this._tibia_map_obj.floor - 1

        if (upper_floor_index >= 0) {
          this._bringToFront(upper_floor_index)
          this._setFloor(upper_floor_index)
          this._updateUrl(upper_floor_index)
        }
        event.preventDefault()
      },
      _onDownButton: function(event) {
        var lower_floor_index = this._tibia_map_obj.floor + 1
        if (lower_floor_index <= 15) {
          this._bringToFront(lower_floor_index)
          this._setFloor(lower_floor_index)
          this._updateUrl(lower_floor_index)
        }

        event.preventDefault()
      },
      setTibiaMap: function(tibia_map_obj) {
        this._tibia_map_obj = tibia_map_obj
        var floor_button = L.DomUtil.get('floor_button')
        this._setFloor(this._tibia_map_obj.floor)
      },
      _bringToFront: function(layer_index) {
        // Simulate a click on the chosen option.
        this.options.layers_widget._form[layer_index].click()
      },
      _setFloor: function(floor) {
        var floor_button = L.DomUtil.get('floor_button')
        var ground_floor = 7 // 0: high above ground; 15: deep underground
        var text = ''
        if (floor == ground_floor) {
          text = '0'
        } else if (floor < ground_floor) {
          text = '+' + String(ground_floor - floor)
        } else {
          text = '-' + String(floor - ground_floor)
        }
        floor_button.textContent = text
      },
      _updateUrl: function(floor) {
        var coordinates = this._tibia_map_obj.getUrlPosition()
        coordinates.floor = floor
        this._tibia_map_obj.setUrlPosition(coordinates, true)
      },
    })

    L.levelButtons = function(options) {
      return new L.LevelButtons(options)
    }

    L.Control.Coordinates = L.Control.extend({
      options: {
        position: 'bottomright',
        decimals: 4,
        decimalSeperator: '.',
        labelTemplateLat: 'X: {y}',
        labelTemplateLng: 'Y: {x}',
        labelFormatterLat: undefined,
        labelFormatterLng: undefined,
        enableUserInput: true,
        useLatLngOrder: false,
        centerUserCoordinates: false,
      },
      onAdd: function(map) {
        this._map = map
        var className = 'leaflet-control-coordinates'
        var container = (this._container = L.DomUtil.create('div', className))
        var options = this.options
        this._labelcontainer = L.DomUtil.create('div', 'uiElement label', container)
        this._label = L.DomUtil.create('span', 'labelFirst', this._labelcontainer)
        this._inputcontainer = L.DomUtil.create('div', 'uiElement input uiHidden', container)
        var xSpan, ySpan
        if (options.useLatLngOrder) {
          ySpan = L.DomUtil.create('span', '', this._inputcontainer)
          this._inputY = this._createInput('inputY', this._inputcontainer)
          xSpan = L.DomUtil.create('span', '', this._inputcontainer)
          this._inputX = this._createInput('inputX', this._inputcontainer)
        } else {
          xSpan = L.DomUtil.create('span', '', this._inputcontainer)
          this._inputX = this._createInput('inputX', this._inputcontainer)
          ySpan = L.DomUtil.create('span', '', this._inputcontainer)
          this._inputY = this._createInput('inputY', this._inputcontainer)
        }
        xSpan.innerHTML = options.labelTemplateLng.replace('{x}', '')
        ySpan.innerHTML = options.labelTemplateLat.replace('{y}', '')
        L.DomEvent.on(this._inputX, 'keyup', this._handleKeypress, this)
        L.DomEvent.on(this._inputY, 'keyup', this._handleKeypress, this)
        map.on('mousemove', this._update, this)
        map.on('dragstart', this.collapse, this)
        map.whenReady(this._update, this)
        this._showsCoordinates = true
        if (options.enableUserInput) {
          L.DomEvent.addListener(this._container, 'click', this._switchUI, this)
        }
        return container
      },
      _createInput: function(classname, container) {
        var input = L.DomUtil.create('input', classname, container)
        input.type = 'text'
        L.DomEvent.disableClickPropagation(input)
        return input
      },
      _clearMarker: function() {
        this._map.removeLayer(this._marker)
      },
      _handleKeypress: function(event) {
        switch (event.keyCode) {
          case 0x1b: // Esc
            this.collapse()
            break
          case 0x0d: // Enter
            this._handleSubmit()
            this.collapse()
            break
          default:
            this._handleSubmit()
            break
        }
      },
      _handleSubmit: function() {
        var x = L.NumberFormatter.createValidNumber(this._inputX.value, this.options.decimalSeperator)
        var y = L.NumberFormatter.createValidNumber(this._inputY.value, this.options.decimalSeperator)
        if (x !== undefined && y !== undefined) {
          var marker = this._marker
          if (!marker) {
            marker = this._marker = L.marker()
            marker.on('click', this._clearMarker, this)
          }
          var ll = new L.LatLng(y, x)
          marker.setLatLng(ll)
          marker.addTo(this._map)
          if (this.options.centerUserCoordinates) {
            this._map.setView(ll, this._map.getZoom())
          }
        }
      },
      expand: function() {
        this._showsCoordinates = false
        this._map.off('mousemove', this._update, this)
        L.DomEvent.addListener(this._container, 'mousemove', L.DomEvent.stop)
        L.DomEvent.removeListener(this._container, 'click', this._switchUI, this)
        L.DomUtil.addClass(this._labelcontainer, 'uiHidden')
        L.DomUtil.removeClass(this._inputcontainer, 'uiHidden')
      },
      _createCoordinateLabel: function(ll) {
        var opts = this.options
        var x
        var y
        if (opts.labelFormatterLng) {
          x = opts.labelFormatterLng(ll.x)
        } else {
          x = L.Util.template(opts.labelTemplateLng, {
            x: this._getNumber(ll.x, opts),
          })
        }
        if (opts.labelFormatterLat) {
          y = opts.labelFormatterLat(ll.y)
        } else {
          y = L.Util.template(opts.labelTemplateLat, {
            y: this._getNumber(ll.y, opts),
          })
        }
        if (opts.useLatLngOrder) {
          return y + ' ' + x
        }
        return x + ' ' + y
      },
      _getNumber: function(n, opts) {
        return L.NumberFormatter.round(n, opts.decimals, opts.decimalSeperator)
      },
      collapse: function() {
        if (!this._showsCoordinates) {
          this._map.on('mousemove', this._update, this)
          this._showsCoordinates = true
          var opts = this.options
          L.DomEvent.addListener(this._container, 'click', this._switchUI, this)
          L.DomEvent.removeListener(this._container, 'mousemove', L.DomEvent.stop)
          L.DomUtil.addClass(this._inputcontainer, 'uiHidden')
          L.DomUtil.removeClass(this._labelcontainer, 'uiHidden')
          if (this._marker) {
            var m = L.marker(),
              ll = this._marker.getLatLng()
            m.setLatLng(ll)
            var container = L.DomUtil.create('div', '')
            var label = L.DomUtil.create('div', '', container)
            label.innerHTML = this._createCoordinateLabel(ll)
            var close = L.DomUtil.create('a', '', container)
            close.textContent = 'Remove'
            close.href = '#'
            var stop = L.DomEvent.stopPropagation
            L.DomEvent.on(close, 'click', stop)
              .on(close, 'mousedown', stop)
              .on(close, 'dblclick', stop)
              .on(close, 'click', L.DomEvent.preventDefault)
              .on(
                close,
                'click',
                function() {
                  this._map.removeLayer(m)
                },
                this,
              )
            m.bindPopup(container)
            m.addTo(this._map)
            this._map.removeLayer(this._marker)
            this._marker = null
          }
        }
      },
      _switchUI: function(event) {
        L.DomEvent.stop(event)
        L.DomEvent.stopPropagation(event)
        L.DomEvent.preventDefault(event)
        if (this._showsCoordinates) {
          this.expand()
        } else {
          this.collapse()
        }
      },
      onRemove: function(map) {
        map.off('mousemove', this._update, this)
      },
      _update: function(event) {
        var pos = event.latlng
        var opts = this.options
        if (pos) {
          pos = pos.wrap()
          this._currentPos = pos
          this._inputY.value = L.NumberFormatter.round(pos.lat, opts.decimals, opts.decimalSeperator)
          this._inputX.value = L.NumberFormatter.round(pos.lng, opts.decimals, opts.decimalSeperator)
          this._label.innerHTML = this._createCoordinateLabel(this._map.project(event.latlng, 0))
        }
      },
    })
    L.control.coordinates = function(options) {
      return new L.Control.Coordinates(options)
    }
    L.Map.mergeOptions({
      coordinateControl: false,
    })
    L.Map.addInitHook(function() {
      if (this.options.coordinateControl) {
        this.coordinateControl = new L.Control.Coordinates()
        this.addControl(this.coordinateControl)
      }
    })
    L.NumberFormatter = {
      round: function(num, dec, sep) {
        var res = L.Util.formatNum(num, dec) + ''
        var numbers = res.split('.')
        if (numbers[1]) {
          var d = dec - numbers[1].length
          for (; d > 0; d--) {
            numbers[1] += '0'
          }
          res = numbers.join(sep || '.')
        }
        return res
      },
      createValidNumber: function(num, sep) {
        if (num && num.length > 0) {
          var numbers = num.split(sep || '.')
          try {
            var numRes = Number(numbers.join('.'))
            if (isNaN(numRes)) {
              return undefined
            }
            return numRes
          } catch (exception) {
            return undefined
          }
        }
        return undefined
      },
    }

    function TibiaMap() {
      this.map = null
      this.floor = 7
      this.mapFloors = []
      this.mapDataStore = []
      this.waypoints = []
    }
    var URL_PREFIX = 'https://tibiamaps.github.io/tibia-map-data/mapper/'
    // `KNOWN_TILES` is a placeholder for the whitelist of known tiles:
    // https://tibiamaps.github.io/tibia-map-data/mapper/tiles.json
    var KNOWN_TILES = null
    var fetchKnownTiles = function() {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', URL_PREFIX + 'tiles.json', true)
      xhr.responseType = 'json'
      xhr.onload = function() {
        if (xhr.status == 200) {
          KNOWN_TILES = new Set(xhr.response)
        }
      }
      xhr.send()
    }
    fetchKnownTiles()
    var isEmbed = location.pathname.indexOf('/embed') != -1
    var padNumber = function(number, size) {
      var s = '000' + String(number)
      return s.substr(s.length - size)
    }
    var setUrlPosition = function(coords, forceHash) {
      var url = '#' + coords.x + ',' + coords.y + ',' + coords.floor + ':' + coords.zoom
      if (forceHash && location.hash != url) {
        window.history.pushState(null, null, url)
      }
    }
    TibiaMap.prototype.setUrlPosition = setUrlPosition
    var getUrlPosition = function() {
      var position = {
        x: 32368,
        y: 32198,
        floor: 7,
        zoom: 0,
      }
      var parts = window.location.hash.slice(1).split(':')
      if (parts[0]) {
        var tempPos = parts[0].split(',')
        if (tempPos.length == 3) {
          position.x = parseInt(tempPos[0], 10)
          position.y = parseInt(tempPos[1], 10)
          position.floor = parseInt(tempPos[2], 10)
        }
      }
      if (parts[1]) {
        position.zoom = parseInt(parts[1], 10)
      }
      return position
    }
    TibiaMap.prototype.getUrlPosition = getUrlPosition
    var modifyLeaflet = function() {
      L.CRS.CustomZoom = L.extend({}, L.CRS.Simple, {
        scale: function(zoom) {
          switch (zoom) {
            case 0:
              return 256
            case 1:
              return 512
            case 2:
              return 1792
            case 3:
              return 5120
            case 4:
              return 10240
            default:
              return 256
          }
        },
        latLngToPoint: function(latlng, zoom) {
          var projectedPoint = this.projection.project(latlng)
          var scale = this.scale(zoom)
          return this.transformation._transform(projectedPoint, scale)
        },
        pointToLatLng: function(point, zoom) {
          var scale = this.scale(zoom)
          var untransformedPoint = this.transformation.untransform(point, scale)
          return this.projection.unproject(untransformedPoint)
        },
      })
    }
    TibiaMap.prototype._createMapFloorLayer = function(floor) {
      var mapLayer = (this.mapFloors[floor] = new L.GridLayer({
        floor: floor,
      }))
      var map = this.map
      var _this = this
      mapLayer.getTileSize = function() {
        var tileSize = L.GridLayer.prototype.getTileSize.call(this)
        var zoom = this._tileZoom
        // Increase tile size when scaling above `maxNativeZoom`.
        if (zoom > 0) {
          return tileSize.divideBy(this._map.getZoomScale(0, zoom)).round()
        }
        return tileSize
      }
      mapLayer._setZoomTransform = function(level, center, zoom) {
        var coords = getUrlPosition()
        coords.zoom = zoom
        setUrlPosition(coords, true)
        var scale = this._map.getZoomScale(zoom, level.zoom)
        var translate = level.origin
          .multiplyBy(scale)
          .subtract(this._map._getNewPixelOrigin(center, zoom))
          .round()
        L.DomUtil.setTransform(level.el, translate, scale)
      }
      mapLayer.createTile = function(coords, done) {
        var tile = document.createElement('canvas')
        var ctx = tile.getContext('2d')
        tile.width = tile.height = 256

        var latlng = this._map.project({ lng: coords.x, lat: coords.y }, 0)
        Object.keys(latlng).map(function(key, _) {
          latlng[key] = Math.abs(latlng[key])
        })

        var tileId = latlng.x + '_' + latlng.y + '_' + this.options.floor
        // Only fetch the map file if it’s in the whitelist, or if the whitelist
        // has not finished loading yet.
        if (KNOWN_TILES && !KNOWN_TILES.has(tileId)) {
          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, 256, 256)
          return tile
        }
        ctx.imageSmoothingEnabled = false
        var image = new Image()
        image.onload = function() {
          ctx.drawImage(image, 0, 0, 256, 256)
          done(null, tile)
        }
        image.src = URL_PREFIX + 'Minimap_Color_' + tileId + '.png'
        return tile
      }
      return mapLayer
    }
    TibiaMap.prototype._showHoverTile = function() {
      var map = this.map
      var _this = this
      map.on('mouseout', function(event) {
        _this.hoverTile.setBounds([[0, 0], [0, 0]])
      })
      map.on('mousemove', function(event) {
        var pos = map.project(event.latlng, 0)
        var x = Math.floor(pos.x)
        var y = Math.floor(pos.y)
        var bounds = [map.unproject([x, y], 0), map.unproject([x + 1, y + 1], 0)]
        var bounds1 = [map.project([x, y], 0), map.project([x + 1, y + 1], 0)]
        if (!_this.hoverTile) {
          _this.hoverTile = L.rectangle(bounds, {
            color: '#009eff',
            weight: 1,
            clickable: false,
            pointerEvents: 'none',
          }).addTo(map)
        } else {
          _this.hoverTile.setBounds(bounds)
        }
      })
    }
    TibiaMap.prototype.init = function() {
      var _this = this
      modifyLeaflet()
      // Taken from https://tibiamaps.github.io/tibia-map-data/bounds.json, which
      // rarely (if ever) changes.
      var bounds = { xMin: 124, xMax: 132, yMin: 121, yMax: 128 }
      var xPadding = window.innerWidth / 256 / 2
      var yPadding = window.innerHeight / 256 / 2
      var yMin = bounds.yMin - yPadding
      var xMin = bounds.xMin - xPadding
      var yMax = bounds.yMax + 1 + yPadding
      var xMax = bounds.xMax + 1 + xPadding
      var maxBounds = L.latLngBounds(L.latLng(-yMin, xMin), L.latLng(-yMax, xMax))
      var map = (_this.map = L.map('map', {
        attributionControl: false,
        crs: L.CRS.CustomZoom,
        fadeAnimation: false,
        keyboardPanOffset: 400,
        maxBounds: maxBounds,
        maxNativeZoom: 0,
        maxZoom: 4,
        minZoom: 0,
        scrollWheelZoom: !isEmbed,
        unloadInvisibleTiles: false,
        updateWhenIdle: true,
        zoomAnimationThreshold: 4,
      }))
      // L.control.fullscreen({
      //   'title': {
      //     'false': isEmbed ? 'Explore this area in the map viewer' : 'View fullscreen',
      //     'true': 'Exit fullscreen'
      //   },
      //   'pseudoFullscreen': true
      // }).addTo(map);
      var baseMaps = {
        'Floor +7': _this._createMapFloorLayer(0),
        'Floor +6': _this._createMapFloorLayer(1),
        'Floor +5': _this._createMapFloorLayer(2),
        'Floor +4': _this._createMapFloorLayer(3),
        'Floor +3': _this._createMapFloorLayer(4),
        'Floor +2': _this._createMapFloorLayer(5),
        'Floor +1': _this._createMapFloorLayer(6),
        'Ground floor': _this._createMapFloorLayer(7),
        'Floor -1': _this._createMapFloorLayer(8),
        'Floor -2': _this._createMapFloorLayer(9),
        'Floor -3': _this._createMapFloorLayer(10),
        'Floor -4': _this._createMapFloorLayer(11),
        'Floor -5': _this._createMapFloorLayer(12),
        'Floor -6': _this._createMapFloorLayer(13),
        'Floor -7': _this._createMapFloorLayer(14),
        'Floor -8': _this._createMapFloorLayer(15),
      }
      var layers_widget = L.control.layers(baseMaps, {}).addTo(map)
      var current = getUrlPosition()
      _this.floor = current.floor
      map.setView(map.unproject([current.x, current.y], 0), current.zoom)
      _this.mapFloors[current.floor].addTo(map)
      window.addEventListener('popstate', function(event) {
        var current = getUrlPosition()
        if (current.floor !== _this.floor) {
          _this.floor = current.floor
          _this.mapFloors[_this.floor].addTo(map)
        }
        if (current.zoom !== map.getZoom()) {
          map.setZoom(current.zoom)
        }
        map.panTo(map.unproject([current.x, current.y], 0))
      })
      map.on('baselayerchange', function(layer) {
        _this.floor = layer.layer.options.floor
      })
      map.on('click', function(event) {
        var coords = L.CRS.CustomZoom.latLngToPoint(event.latlng, 0)
        var zoom = map.getZoom()
        var coordX = Math.floor(Math.abs(coords.x))
        var coordY = Math.floor(Math.abs(coords.y))
        var coordZ = _this.floor
        setUrlPosition(
          {
            x: coordX,
            y: coordY,
            floor: coordZ,
            zoom: zoom,
          },
          true,
        )
        if (window.console) {
          var xID = Math.floor(coordX / 256) * 256
          var yID = Math.floor(coordY / 256) * 256
          var id = xID + '_' + yID + '_' + coordZ
          console.log(id)
        }
      })
      L.crosshairs().addTo(map)
      L.control
        .coordinates({
          position: 'bottomleft',
          enableUserInput: false,
          labelFormatterLat: function(lat) {
            return '<b>Y</b>: ' + Math.floor(lat) + ' <b>Z</b>: ' + _this.floor
          },
          labelFormatterLng: function(lng) {
            return '<b>X</b>: ' + Math.floor(lng)
          },
        })
        .addTo(map)
      L.LevelButtons.btns = L.levelButtons({
        layers_widget: layers_widget,
      }).addTo(map)
      _this._showHoverTile()
      L.marker(map.unproject([32385, 31708], 7)).addTo(map)
    }

    var map = new TibiaMap()
    map.init()
    L.LevelButtons.btns.setTibiaMap(map)

    var fakeClick = function(target) {
      var event = document.createEvent('MouseEvents')
      event.initMouseEvent('click')
      target.dispatchEvent(event)
    }

    var unembed = function(url) {
      return url.replace('/embed', '')
    }
  }

  onClickInner = () => {
    this.setState({ bounds: inner })
  }

  onClickOuter = () => {
    this.setState({ bounds: outer })
  }

  render() {
    return <Map id="map" style={{ width: '500px', height: '500px' }} />
  }
}
