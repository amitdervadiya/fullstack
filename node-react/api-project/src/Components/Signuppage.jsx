import React from 'react'


export default function Signuppage() {
    
  useEffect(() => {
    axios.get("http://localhost:1008/viewAdmin")
      .then((res) => {
        console.log("API :", res.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  }, [])
  return (
    <div>
      
    </div>
  )
}
