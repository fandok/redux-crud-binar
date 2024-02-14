import { BrowserRouter, Route, Routes } from "react-router-dom";

import UserContainer from "./UserContainerNew";
import UserFormContainer from "./UserFormNew";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<UserContainer />} />
        <Route exact path="/add" element={<UserFormContainer />} />
        <Route exact path="/edit/:id" element={<UserFormContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
