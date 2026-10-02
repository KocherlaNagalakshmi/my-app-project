export default function Pagination ({ meta, setPage}) {
    if(!meta?.totalPages || meta.totalPages <= 1) return null;
    return(
        <div className = "pagination">
            <button disabled = {meta.page === 1} onClick = {() => setPage(meta.page -1)}
            >
                Previous
            </button>

            <span>

                Page {meta.page} of {meta.totalPages} 
            </span>

            <button disabled = {meta.page === meta.totalPages} onClick={() => setPage(meta.page+1)}
> Next 
            </button>
        </div>
    )
}