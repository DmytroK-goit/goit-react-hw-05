import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MoviesPage" element={<MoviesPage />} />
        {/* <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetails />}>
          <Route path="info" element={<h2>lorem ipsum</h2>} />
          <Route path="posts" element={<PostsByUser />}>
            <Route path=":postId/details" element={<PostDetails />} />
          </Route>
        </Route> */}
        {/* users/24/info */}
        {/* users/24/posts */}
        {/*Якщо роут не підійшов - переведе на сторінку 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default App;
