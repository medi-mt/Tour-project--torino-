import DetailTour from "../../components/template/detailTour/DetailTour";

function DetailTourPage({ tours }) {



    return (
        <div>
            <DetailTour tours={tours} />
        </div>
    )
}

export default DetailTourPage



export async function getServerSideProps(params) {

    const { id } = params.query

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tour/${id}`);
    const tours = await res.json();

    return {
        props: {
            tours: tours
        }
    }


}