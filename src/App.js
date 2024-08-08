import { useContext, useEffect, useState } from "react";
import Document from "./components/Document/Document";
import Forum from "./components/Forum/Forum";
import Games from "./components/Games/Games";
import LayoutDashBoard from "./components/LayoutDashBoard/LayoutDashBoard";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { UserContext, UserContextProvider } from "./contexts/UserContext";
import Login from "./components/SignIn";
import axios from "axios";
import { Toaster } from "sonner";
import SignIn from "./components/SignIn";
import Folder from "./components/Folder";
import PuzzleGame from "./components/PuzzleGame/PuzzleGame";
import SudokuSolver from "./components/SudokuSolver/SudokuSolver";
import TicTacToe from "./components/TicTacToe/TicTacToe";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000';
export default function App() {
  const [loggedIn, setLoggedIn] = useState();
  const {user} = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && user !== null) {
      navigate('/forum');
    }
  }, [location.pathname, user]);

  if (user === null) {
    return <SignIn/>
  }
  else if (location.pathname.includes('/games/puzzle_game')) {
    return <PuzzleGame/>
  }
  else if (location.pathname.includes('/games/sudoku_solver')) {
    return <SudokuSolver/>
  }
  else if (location.pathname.includes('/games/tic_tac_toe')) {
    return <TicTacToe/>
  }
  
  return (
    <LayoutDashBoard>
      <Routes>
        <Route path="/forum" element={<Forum/>}/>
        <Route path="/document" element={<Document/>}/>
        <Route path="/document/:id" element={<Folder/>}/>
        <Route path="/games" element={<Games/>}/>
      </Routes>
    </LayoutDashBoard>
  )
}