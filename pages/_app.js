import Layout from ".././components/layout/Layout"
import TanstakQueryProvider from "../components/provider/TanstakQueryProvider"
import "../styles/globals.css"


export default function App({ Component, pageProps }) {

  return (
    <>

      <TanstakQueryProvider>
        <Layout>
          < Component {...pageProps} />
        </Layout>
      </TanstakQueryProvider>

    </>
  )

}
