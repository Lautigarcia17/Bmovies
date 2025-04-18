import { useEffect, useState } from 'react';
import styles from './SearchMovie.module.css'
import { useGenericContext } from '../../hooks/useGenericContext';
import { scrollContext } from '../../context/ScrollContext';

function SearchMovie( {search,setSearch} : { search : string,setSearch:React.Dispatch<React.SetStateAction<string>> } ) {
    const [isScrolled,setIsScrolled] = useState(false);
    const {scrollRef} = useGenericContext(scrollContext)

    useEffect(() => {
        const scrollElement = scrollRef.current;
      
        if (!scrollElement) return; 
      
        const handleScroll = () => {
            const widthLimit = window.innerWidth < 600 ? 200 : 400;
            if(scrollElement.scrollTop > widthLimit){
                setIsScrolled(true);
            }else{
                setIsScrolled(false);
            }
        };
      
        scrollElement.addEventListener('scroll', handleScroll);
      
        return () => {
          scrollElement.removeEventListener('scroll', handleScroll);
        };
      }, []);

  return (
        <div className={styles.contentSearch}>
            <div className={`${isScrolled ? styles.elementScroll : styles.element}`}>
                <div className={styles.iconWrapper}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon}  viewBox="0 0 16 16"><path fill="#ffffff" d="m15.504 13.616l-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8a4 4 0 0 1 0 8" /></svg>
                </div>
                <input type="text" value={search} onChange={(e)=>setSearch(e.currentTarget.value)} className={styles.search} placeholder="What movie do you want?" />
                
                {search.length > 0 &&   
                    <button className={styles.clear} onClick={()=> setSearch('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24"><path fill="#cfbebe" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"/></svg>
                    </button>
                }
           
            </div>
        </div>
  )
}

export default SearchMovie
