import React, { useEffect, useState } from 'react';
import axios from 'axios'

// Add progress bar
// open article in lightbox

export default function App() {

  const [hits, setHits] = useState([])
  const [query, setQuery] = useState('reacthooks')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   fetchData()
  // eslint-disable-next-line 
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const res = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`)
    setHits(res.data.hits)
    console.log(hits)
    setLoading(false)
  }

const handleSubmit = (e) => {
  e.preventDefault()
  fetchData()
}

  return (
   <div className="container">
     <form onSubmit={handleSubmit}>
       <input type="text" name="search" value={query} onChange={e => setQuery(e.target.value)} />
       <input type="submit" value="Submit" />
     </form>
  {
    loading ? ( 
    <div className="m-3">Loading stories...</div>
    ) : (
      <ul className="articles">
      {
       hits.map(hit => (
         <li className="item" key={hit.objectID}>
           <a href={hit.url} target="_blank" rel="noreferrer">{hit.title}</a>
         </li>
       )) 
      }
      </ul>
    )
  }
   </div>
  );
}


