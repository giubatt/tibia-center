import dynamic from 'next/dynamic'

const TibiaMap = dynamic(() => import('../components/map/TibiaMap'), { ssr: false })

export default TibiaMap
