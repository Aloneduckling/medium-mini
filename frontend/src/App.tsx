import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home.tsx'
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Blog from "./pages/Blog/Blog"
import NewBlog from "./pages/Blog/NewBlog"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home />} />
          <Route path="/blog">
            <Route path="new" element={<NewBlog />} />
            <Route path=":id" element={<Blog />} />
          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
