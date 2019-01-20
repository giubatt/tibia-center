import styled from 'styled-components'

export const Map = styled.div`
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
    /* display: none; */
  }

  .leaflet-control-zoom-in {
    line-height: 1.3;
  }

  .leaflet-control-zoom-out {
    line-height: 1.1;
  }

  .leaflet-control-level-buttons-panel {
    font-weight: bold;
  }

  .leaflet-control-level-buttons-panel-a {
    line-height: 1.8;
  }

  .leaflet-control-level-buttons-span {
    font-size: 18px;
    background-color: #fff;
    display: block;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  .leaflet-control-coordinates {
    background-color: #d8d8d8;
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
  }
  .leaflet-control-coordinates,
  .leaflet-control-coordinates .uiElement input {
    border-radius: 5px;
  }
  .leaflet-control-coordinates .uiElement {
    margin: 4px;
  }
  .leaflet-control-coordinates .uiElement .labelFirst {
    margin-right: 4px;
  }
  .leaflet-control-coordinates .uiHidden {
    display: none;
  }
`
