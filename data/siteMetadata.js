/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Hao Jun - Data Engineer',
  author: 'Hao Jun',
  headerTitle: 'HAO JUN',
  description: 'Sailing through data, tech, and running - one adventure at a time.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://snghaojun.com',
  siteRepo: 'https://github.com/haojunsng/sh-luffy',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'snghaojun18@gmail.com',
  github: 'https://github.com/haojunsng',
  linkedin: 'https://www.linkedin.com/in/snghaojun/',
  locale: 'en-SG',
  // set to true if you want a navbar fixed to the top
  stickyNav: true,
}

module.exports = siteMetadata
