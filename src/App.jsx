import "./App.css";

export default function App() {
  return (
    <div className="main">
      <div className="title-wrapper">
        <h1>THINGS TO DO</h1>
      </div>

      <input type="text" className="input-text" placeholder="Add New" />
      <div className="wrapper-checkbox">
        <div className="checkbox">
          <input type="checkbox" name="" id="" />
          <h2>Huhdsauhduahsdha</h2>
        </div>
        <div className="checkbox">
          <input type="checkbox" name="" id="" />
          <h2>Huhdsauhduahsdha</h2>
        </div>
        <div className="checkbox">
          <input type="checkbox" name="" id="" />
          <h2>Huhdsauhduahsdha</h2>
        </div>
      </div>
      <div className="footer">
        <div className="footer-element">
          <span>➕</span>
          <span>🔍</span> | <p>3 items left</p>
        </div>
        <div className="footer-element">
          <p>All</p>
          <p>Active</p>
          <p>Completed</p>
        </div>
      </div>
    </div>
  );
}
