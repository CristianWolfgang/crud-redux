import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import AddSingerForm from "./AddSingerForm";
import { useDispatch } from "react-redux";
import { removeSinger } from "./features/crud/crud-slice";
import { toggleUpdate } from "./features/crud/active-updating-slice";
function App() {
  const singers = useSelector((state: RootState) => state.crud),
    dispatch = useDispatch(),
    singersList = (
      <table
        style={{
          textAlign: "left",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Band</th>
            <th>Voice type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {singers.map((element) => (
            <tr key={element.id}>
              <td>{element.name}</td>
              <td>{element.band}</td>
              <td>{element.voiceType}</td>
              <td>
                <button onClick={() => dispatch(toggleUpdate(element.id))}>
                  Editar
                </button>
                <button onClick={() => dispatch(removeSinger(element.id))}>
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <>
      <h2>Singer CRUD</h2>
      <AddSingerForm />
      <br />
      {singersList}
    </>
  );
}

export default App;
