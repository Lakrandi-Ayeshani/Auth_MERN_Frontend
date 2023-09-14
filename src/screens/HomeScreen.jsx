import { useEffect } from "react";
import Hero from "../components/Hero.jsx"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/task');
    }
  }, [navigate, userInfo]);

  return (
    <Hero />
  )
}

export default HomeScreen
