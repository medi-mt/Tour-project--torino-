import CallCard from '../../module/callCard/CallCard'
import HomeSlider from '../../module/homeSlider/HomeSlider'
import SearchForm from '../../module/searchForm/SearchForm'
import ServiceAdvantages from '../../module/serviceAdvantages/ServiceAdvantages'
import Tours from '../tours/Tours'

function HomePage({ toursData }) {
    return (
        <>
        <div>

            <SearchForm />
            <Tours toursData={toursData} />
            <CallCard />
            <HomeSlider />
            <ServiceAdvantages />
        </div>
        </>
    )
}

export default HomePage