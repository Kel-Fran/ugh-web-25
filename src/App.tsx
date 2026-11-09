import { useState , useEffect } from 'react'

interface Movie
  {
    id: number,
    cim:string,
    studio:string,
    megjelenesEve: number,
    premier:string, // date yyyy-mm-dd
  }

function MovieCard(movie: Movie) {
  const [showDate, setShowDate]=useState(true);
  return <div className="card">
           <div className="card-body">
             <h2 className="card-title">{movie.cim}</h2>
             <p className="card-subtitle fg-3 fw-bold">{movie.megjelenesEve < 2000 ? "classic" : movie.megjelenesEve < 2010 ? "old" : "new"} movie</p>
             <p className="card-text">{movie.studio}</p>
             {showDate && <p className="card-text">{movie.megjelenesEve}</p>}
             <button onClick={()=>setShowDate(x => !x)}>{showDate ? "hide" : "show"}</button>
           </div>
         </div>
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(()=>{
document.title = "Rajzfilmek";
    },[]);
  useEffect(() => {
    let ignore = false;
    (async()=>{
      const ms = await (await fetch("/rajzfilmek.json")).json() as Movie[];
      if (!ignore) setMovies(ms);
    })();
    return () => ignore = true;
  });
  return <>
           <h1>rajzfilmek</h1>
           <p>number of movies: {movies.length}</p>
           <p>min release year: {movies.reduce((acc, r)=>Math.min(acc, r.megjelenesEve),movies[0]?.megjelenesEve ?? NaN)}</p>
           <p>max release year: {movies.reduce((acc, r)=>Math.max(acc, r.megjelenesEve),movies[0]?.megjelenesEve ?? NaN)}</p>
           {movies.map(it => <MovieCard key={it.id} {...it}/>)}
         </>
}
