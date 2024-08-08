export default function Avatar({size, url}) {
    let width = 'w-12';
    if (size === 'lg') {
        width = 'w-52 md:w-72';
    }
    return (
        <div className={`${width} relative`}>
            <div className="rounded-full overflow-hidden">
                <img src={url} alt="avatar"/>
            </div>
        </div>
    )
}