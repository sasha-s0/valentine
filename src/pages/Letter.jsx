import {useEffect, useState} from "react";
import {letterPages} from "../const/letterPages.js";


const Letter = () => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const currentPage = parseInt(localStorage.getItem("page")) || 0;
        setCurrentPage(currentPage);
    }, []);

    const changePage = (offset) => {
        setCurrentPage((prev) => {
            const newPage = prev + offset;
            setStorePage(newPage);
            return Math.max(0, Math.min(newPage, letterPages.length - 1));
        });
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        setStorePage(page);
    };

    const setStorePage = (page) => localStorage.setItem("page", page);

    return (
        <div className="flex items-center justify-center min-h-dvh bg-pink-200 px-2 p-10">
            <div className="w-[500px] min-h-[400px] bg-white p-4 rounded-2xl shadow-lg flex flex-col justify-between">
                <p className="text-gray-500 text-sm md:text-base whitespace-pre-line">
                    {
                        currentPage === 0? (
                            <p>
                                Updates: <br/>
                                <span
                                    className="text-blue-600 underline cursor-pointer"
                                    onClick={() => setCurrentPage(9)}
                                >
                                    №1 - 13.05.2025
                                </span>
                            </p>
                        ) : letterPages[currentPage]
                    }
                </p>
                <div className="flex justify-between items-center mt-10 pt-4 border-t-1 border-gray-500">
                    <div>
                        <button
                            onClick={() => goToPage(0)}
                            disabled={currentPage === 0}
                            className="px-3 py-1 text-white bg-gray-500 rounded-lg disabled:opacity-50 cursor-pointer mr-3"
                        >
                            {"<<"}
                        </button>
                        <button
                            onClick={() => changePage(-1)}
                            disabled={currentPage === 0}
                            className="px-3 py-1 text-white bg-gray-500 rounded-lg disabled:opacity-50 cursor-pointer"
                        >
                            {"<"}
                        </button>
                    </div>

                    <span className="text-gray-600">
                         {currentPage + 1} / {letterPages.length}
                    </span>

                    <div>
                        <button
                            onClick={() => changePage(1)}
                            disabled={currentPage === letterPages.length - 1}
                            className="px-3 py-1 text-white bg-gray-500 rounded-lg disabled:opacity-50 cursor-pointer mr-3"
                        >
                            {">"}
                        </button>
                        <button
                            onClick={() => goToPage(letterPages.length - 1)}
                            disabled={currentPage === letterPages.length - 1}
                            className="px-3 py-1 text-white bg-gray-500 rounded-lg disabled:opacity-50 cursor-pointer"
                        >
                            {">>"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Letter;
