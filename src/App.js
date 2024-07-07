import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Components/Card";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [page, setPage] = useState(1);
  const [limit, setlimit] = useState(3);
  const [totalPages, settotalPages] = useState(0);
  const [dataToRender, setdataToRender] = useState([]);

  useEffect(() => {
    (async () => {
      const dataFromApi = await fetchData(page, limit);
      setdataToRender(dataFromApi);
    })();
  });

  const fetchData = async (page = 1, limit = 4) => {
    const res = await fetch(
      `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`
    );
    const data = await res.json();
    if (data) {
      console.log("Api data", data);
      settotalPages(data.meta.totalPages);
      return data.items;
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (toPage) => {
    if (page !== toPage) setPage(toPage);
  };

  return (
    <>
      <Header />
      <div className="app">
        {dataToRender.map((item, index) => {
          return <Card item={item} />;
        })}
      </div>
      <Footer
        totalPages={totalPages}
        page={page}
        handleNextClick={handleNextClick}
        handlePreviousClick={handlePreviousClick}
        handlePageClick={handlePageClick}
      />
    </>
  );
}

export default App;
