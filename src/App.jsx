import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = 'https://www.course-api.com/react-tours-project';

const App = () => {

  const [isLoading, isSetLoading] = useState(true);
  const [tours, isSetTours] = useState([]);


  const removeTour = (id)=>{
    const newTours = tours.filter((tour)=>tour.id !== id);
    isSetTours (newTours);
  }


  const fetchTours = async () => {
    isSetLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      isSetTours(data)
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
    isSetLoading(false)
  }

  useEffect(() => {
    fetchTours()
  }, [])


  if (isLoading) {
    return <main>
      <Loading />
    </main>
  }

if(tours.length === 0){
  return <main>
    <div className="title" >
      <h2>no tours left</h2>
      <button type="button" className="btn" style={{marginTop:'2rem'}} onClick={fetchTours}>Refresh</button>
    </div>
  </main>
}

  // TODO
  return <main>
    <Tours tours={tours} removeTour={removeTour} />
  </main>

};
export default App;
