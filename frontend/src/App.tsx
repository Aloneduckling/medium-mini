import { BrowserRouter, Route, Routes } from "react-router-dom"

import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Blog from "./pages/Blog/Blog"
import NewBlog from "./pages/Blog/NewBlog"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog">
          <Route path="new" element={<NewBlog />} />
          <Route path=":id" element={<Blog />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App