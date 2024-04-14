import "./App.css";
import AgeGroupPriceList from "./components/AgeGroupPriceList";

function App() {
    return (
        <>
            <AgeGroupPriceList onChange={(result) => console.log(result)} />
        </>
    );
}

export default App;
