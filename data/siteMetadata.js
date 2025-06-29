/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Hao Jun - Data Engineer',
  author: 'Hao Jun',
  headerTitle: 'Hao Jun',
  description: 'I turn coffee into ideas and code.',
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
  stickyNav: true,
}

module.exports = siteMetadata
