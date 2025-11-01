import HomePage from "../components/template/homePage/HomePage"
import { serverFetch } from "../components/core/services/http"

export default function Home({ tours }) {


  return (
    <>
      <HomePage toursData={tours} />
    </>
  )
}

export async function getServerSideProps(params) {

  const searchParams = params.query
  const tours = await serverFetch("/tour", searchParams, { cache: "no-store" })

  return {
    props: {
      tours: tours
    }
  }


}