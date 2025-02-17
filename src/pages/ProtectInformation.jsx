import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const ProtectInformation = () => {
    const navigate = useNavigate();

    const SECRET_DATE = import.meta.env.VITE_SECRET_DATE;
    const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

    useEffect(() => {
        const key = localStorage.getItem("SECRET_KEY");

        if (key === SECRET_KEY) {
            navigate("/next-page");
        }
    }, [SECRET_KEY, navigate]);

    const [inputDate, setInputDate] = useState("");
    const [error, setError] = useState(false);

    const handleInputChange = (e) => {
        setInputDate(e.target.value);
        setError(false);
    };

    const handleSubmit = () => {
        if (inputDate === SECRET_DATE) {
            localStorage.setItem("SECRET_KEY", SECRET_KEY);
            navigate("/next-page");
        } else {
            setError(true);
            setInputDate("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-dvh bg-pink-200 text-center px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-medium text-red-600 mb-6">
                Это точно Александра Судакова?
            </h1>

            <input
                type="text"
                value={inputDate}
                onChange={handleInputChange}
                placeholder="хх.хх.хххх"
                className="px-6 py-3 border border-gray-300 rounded-lg shadow-md w-64 sm:w-96 focus:outline-none focus:ring-2 focus:ring-red-300 transition ease-in-out duration-300 text-center"
            />

            {error && (
                <p className="mt-2 text-amber-100 font-medium text-red-600">
                    Неверно! Если это не Саша, уходи!
                </p>
            )}

            <button
                onClick={handleSubmit}
                className="mt-4 bg-pink-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition ease-in-out duration-300 cursor-pointer"
            >
                Я точно Саша!
            </button>
        </div>
    );
};

export default ProtectInformation;