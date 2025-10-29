
function ServerError() {
    return (
        <div className='server_error'>
            <img src="/icon/server-error.svg" />
            <p>اتصال با سرور برقرار نیست!</p>
            <span>لطفا بعدا دوباره امتحان کنید</span>
        </div>
    )
}

export default ServerError