import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const countdown = [
    "Пять...",
    "Четыре...",
    "Три...",
    "Два...",
    "Один..."
];


const SheSaidYes = () => {
    const navigate = useNavigate();
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        if (secondsLeft < 5) {
            const timeoutId = setTimeout(() => {
                setSecondsLeft((prev) => prev + 1);
            }, 1000);
            return () => clearTimeout(timeoutId);
        } else {
            navigate("/protected");
        }
    }, [secondsLeft, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-dvh bg-pink-100 text-center px-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-red-600 mb-6">
                Я знал что ты скажешь да! <br/> {secondsLeft < 5 && countdown[secondsLeft]}
            </h1>
            <div className="w-full max-w-md">
                <img
                    src="./assets/yesGif.webp"
                    alt="Милейшая гифка"
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default SheSaidYes;
