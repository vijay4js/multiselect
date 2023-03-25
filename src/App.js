import MultiSelect from "./components/MultiSelect";
//Mock Data
import options from "./mockData";
import "./styles.css";

export default function App() {
  const onOptionRemoved = (option) => {
    console.log("Option Removed ", option);
  };

  const onOptionSelected = (option) => {
    console.log("Option Selected ", option);
  };

  return (
    <div className="App">
      <MultiSelect
        options={options}
        onOptionRemoved={onOptionRemoved}
        onOptionSelected={onOptionSelected}
      />
    </div>
  );
}
