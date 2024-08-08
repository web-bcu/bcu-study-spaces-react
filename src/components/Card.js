export default function Card({children, noPadding}) {
    let classes = "bg-[#192938] shadow-md shadow-gray-300 rounded-md mb-5 text-white text-xl";
    if (!noPadding) {
        classes += ' p-4';
    }
    return (
        <div className={classes}>
            {children}
        </div>
    )
}