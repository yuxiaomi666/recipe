import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home} from "./pages/home";
import { Auth} from "./pages/auth";
import { CreateRecipe} from "./pages/create-recipe";
import { SavedRecipe} from "./pages/saved-recipe";
import { Navbar} from "./components/navbar";

function App() {
  return (
    // 是html，但是用react（用js帮写出来html）
    // div是段落，后面是属性
    // navbar必须在Router里面才能用link（属于react-router-dom）;
    // 为了显示在route上面，又要在route上
 
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* path: endpoint=localhost(ip address):port/path，是url; 
          element: 上面import的,把path和那个文件对应起来 */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipe" element={<SavedRecipe />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
