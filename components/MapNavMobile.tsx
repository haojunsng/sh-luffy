import MapNav from './MapNav'

const ZONES = [
  {
    name: 'House',
    x: 255,
    y: 1275,
    radius: 120,
    href: '/projects',
    label: 'Projects',
  },
  {
    name: 'Mountain',
    x: 810,
    y: 700,
    radius: 120,
    href: '/about',
    label: 'About',
  },
  {
    name: 'Tent',
    x: 785,
    y: 250,
    radius: 120,
    href: '/blog',
    label: 'Blog',
  },
  {
    name: 'Big House',
    x: 275,
    y: 1620,
    radius: 120,
    href: '/contact',
    label: 'Contact',
  },
]

export default function MapNavMobile() {
  return (
    <MapNav
      svgWidth={1024}
      svgHeight={2048}
      zones={ZONES}
      avatarStartPos={{ x: 210, y: 560 }}
      mugiwara={300}
      containerClassName="fixed inset-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-black"
      imageSrc="/static/images/one-piece-map-mobile.svg"
      imageAlt="One Piece Map Mobile"
    />
  )
}
