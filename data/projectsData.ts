interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'sh-vegapunk',
    description: `A collection of intelligent bots and automation tools built on AWS with Terraform. Features include Telegram bots for bill splitting, poll dispatcher, and more.`,
    imgSrc: '/static/images/projects/sh-vegapunk.png',
    href: 'https://github.com/haojunsng/sh-vegapunk',
  },
  {
    title: 'sh-thousand-sunny',
    description: `A containerised ELT pipeline that ingests data from the Strava API and the Open Meteo API, landing it in S3 and Postgres, with dbt for data modeling.`,
    imgSrc: '/static/images/projects/sh-thousand-sunny.png',
    href: 'https://github.com/haojunsng/sh-thousand-sunny',
  },
  {
    title: 'sh-datrun-dp',
    description: `A serverless data pipeline that pulls data from DATRUN app's Firestore database for transformation, wrangling and analytics.`,
    imgSrc: '/static/images/projects/sh-datrun-dp.png',
    href: 'https://github.com/haojunsng/sh-datrun-dp',
  },
  {
    title: 'sh-datrun-iac',
    description: `A repository dedicated to provisioning cloud infrastructure for DATRUN app.`,
    imgSrc: '/static/images/projects/sh-datrun-iac.png',
    href: 'https://github.com/haojunsng/sh-datrun-iac',
  },
]

export default projectsData
