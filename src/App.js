import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Components/Card";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, settotalPages] = useState(0);
  const [dataToRender, setdataToRender] = useState([]);
  const [dataToRenderForInfiniteScroll, setdataToRenderForInfiniteScroll] =
    useState([]);
  const [mode, setMode] = useState("pagination");
  const modeArray = ["pagination", "infiniteScroll"];

  useEffect(() => {
    (async () => {
      const dataFromApi = await fetchData(page, limit);
      console.log({ dataFromApi });
      setdataToRender(dataFromApi);
      if (page > 1) {
        setdataToRenderForInfiniteScroll((prev) => [...prev, ...dataFromApi]);
      } else {
        setdataToRenderForInfiniteScroll(dataFromApi);
      }
    })();
  }, [limit, page]);

  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = async (page = 1, limit = 5) => {
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
      <Header
        modeArray={modeArray}
        setMode={setMode}
        mode={mode}
        setLimit={setLimit}
        setPage={setPage}
      />

      {mode === modeArray[0] ? (
        <>
          <div className="app">
            {dataToRender.map((item, index) => {
              return <Card item={item} key={index} />;
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
      ) : (
        <>
          {
            <div className="app">
              {dataToRenderForInfiniteScroll.map((item, index) => {
                return <Card item={item} key={index} />;
              })}
            </div>
          }
        </>
      )}
    </>
  );
}

export default App;
