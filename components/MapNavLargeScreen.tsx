import MapNav from './MapNav'

const ZONES = [
  {
    name: 'Hut',
    x: 830,
    y: 680,
    radius: 120,
    href: '/projects',
    label: 'Projects',
  },
  {
    name: 'Volcano',
    x: 1075,
    y: 250,
    radius: 120,
    href: '/about',
    label: 'About',
  },
  {
    name: 'Palms',
    x: 560,
    y: 310,
    radius: 120,
    href: '/blog',
    label: 'Blog',
  },
  {
    name: 'House',
    x: 1350,
    y: 550,
    radius: 120,
    href: '/contact',
    label: 'Contact',
  },
]

export default function MapNavLargeScreen() {
  return (
    <MapNav
      svgWidth={1600}
      svgHeight={900}
      zones={ZONES}
      avatarStartPos={{ x: 300, y: 750 }}
      mugiwara={250}
      containerClassName="fixed inset-0 z-0 m-0 h-screen w-screen bg-[#5caec3] p-0 dark:bg-gray-950"
      innerDivClassName="absolute inset-0 h-full w-full"
      imageSrc="/static/images/one-piece.svg"
      imageAlt="One Piece Map"
    />
  )
}
