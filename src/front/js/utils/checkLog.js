import { Navigate, useNavigate } from "react-router-dom"

const checkLog = async () => {
    const navigate = useNavigate();

    const response = await fetch(`${process.env.BACKEND_URL}api/private`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    });
    
    if (response.status !== 200) {
      navigate("/")
    }

}

export default checkLog