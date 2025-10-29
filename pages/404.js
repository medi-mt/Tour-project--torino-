import Link from 'next/link'

function notFound() {
    return (
        <div className="notFound">
            <img src="/icon/Error-TV.svg" />
            <p>صفحه مورد نظر یافت نشد!</p>
            <Link href="/">
                <span>برگشت به صفحه اصلی </span>
            </Link>
        </div>
    )
}

export default notFound