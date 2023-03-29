import Layout from "./components/Layout/Layout";
import AllPaymentTypes from "./components/MainList/AllPaymentTypes";

function App() {
  return (
    <div className="App">
      <Layout>
        <AllPaymentTypes />
      </Layout>
    </div>
  );
}

export default App;
