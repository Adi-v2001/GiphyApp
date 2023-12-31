const paginate = (props)=>{

    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(props.totalItems/props.itemsPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <>
        <nav>
            <ul className="pagination pagination-xl justify-content-center border-0 mt-4">
                {pageNumbers.map(number=>{
                    return(
                        <li className="page-item">
                            <a onClick={()=>props.pageSelected(number)} href="#" className="page-link">{number}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
        </>
    );
}

export default paginate;