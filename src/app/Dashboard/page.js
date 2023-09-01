'use client';
import {useState, useEffect} from 'react';
import {auth} from '../config/firebase';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../CSS/Dashboard.module.css';
import Loader from '../Loader';
import Paginate from '../Paginate';

function Dashboard(){
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [gifs, setGifs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem-itemsPerPage;
    const currentItems = gifs.slice(indexOfFirstItem, indexOfLastItem);



    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                setUsername(user.displayName);
            }else{
                setUsername("");
            }
        })

        const fetchData = async()=>{
            setIsError(false);
            setIsLoading(true);

            try{
                const results = await axios("https://api.giphy.com/v1/gifs/trending",{
                params:{
                    api_key:"GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
                }
            });
            setGifs(results.data.data);
            }
            catch(err){
                setIsError(true);
                setTimeout(()=>setIsError(false), 4000);
            }
            
            setIsLoading(false);
        }

        fetchData();

    },[]);

    const renderGifs = ()=>{
        if(isLoading){
            return(<Loader/>);
        }
        return(currentItems.map((curr)=>{
            return(
                <div className={styles.gif}>
                    <img src={curr.images.fixed_height.url}/>
                </div>
            )
        }));
    }

    const renderError = () =>{
        if(isError){
            return(<div className='alert alert-danger alert-dismissible fade show' role='alert'>Unable to get gifs, please try again in a moment!</div>)
        }
    }

    const handleSearchChange = (event)=>{
        setSearch(event.target.value);
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        try{
            const results = await axios("https://api.giphy.com/v1/gifs/search",{
                params:{
                    api_key:"GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
                    q:search,
                }
            });
            setGifs(results.data.data);
        }
        catch(err){
            setIsError(true);
            setTimeout(()=>setIsError(false), 4000);
            console.log(err);
        }
        
        setIsLoading(false);
        console.log("yoyo");
    }

    const pageSelected = (pageNumber)=>{
        setCurrentPage(pageNumber);
    }

    return(
        <div>
        <div className={styles.container}><h1 className={styles.heading}>Welcome - {username}</h1></div>
        <div className="m-2">
        {renderError()}
        <form className={`form-inline justify-content-center m-2 ${styles.form}`}>
            <input value = {search} type="text" placeholder="Search" className={`form-control form-control-sm ${styles.custom}`} onChange={handleSearchChange}/>
            <button type="submit" className="btn btn-primary mx-2" onClick={handleSubmit}>Go</button>
        </form>
        <div className={styles.gifs}>{renderGifs()}</div>
        <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={gifs.length} pageSelected={pageSelected}/>
        </div>
        </div> 
    ); 
}


export default Dashboard;