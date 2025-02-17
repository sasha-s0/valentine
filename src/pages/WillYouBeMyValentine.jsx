import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const messages = [
    "Нет.",
    "Ты уверена???",
    "Реально уверена??",
    "Точно уверена да?",
    "Pookie, please...",
    "Подумай еще раз!",
    "Если ты скажешь нет, я расстроюсь...",
    "Я очень сильно расстроюсь...",
    "Я очень очень очень сильно расстроюсь...",
    "За что...",
    "А кто Новоуральск то штурмом взял?",
    "Похоже, я не могу оставить тебе право выбора...",
];

const WillYouBeMyValentine = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [yesButtonSize, setYesButtonSize] = useState(16);
    const [maxWidth, setMaxWidth] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const updateMaxWidth = () => {
            setMaxWidth(window.innerWidth - 8);
        };

        updateMaxWidth();
        window.addEventListener("resize", updateMaxWidth);
        return () => window.removeEventListener("resize", updateMaxWidth);
    }, []);

    const handleNoClick = () => {
        setMessageIndex((prevIndex) => prevIndex + 1);
        setYesButtonSize((prevSize) => Math.min(prevSize * 1.3, 200));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-pink-200 text-center p-4 overflow-x-hidden">
            <h1 className="text-4xl font-bold text-red-600">Будешь моей валентинкой?</h1>
            <div className="mt-6 flex gap-4 flex-wrap items-center justify-center select-none max-w-[400px]">
                <button
                    className="bg-green-500 text-white font-semibold rounded-lg px-6 py-3 transition-transform active:scale-90 w-fit cursor-pointer"
                    style={{ fontSize: `${yesButtonSize}px`, maxWidth: `${maxWidth}px` }}
                    onClick={() => navigate("/sheSaidYes")}
                >
                    Да!
                </button>
                {messageIndex < messages.length && (
                    <button
                        className="bg-red-500 text-white font-semibold rounded-lg px-6 py-3 transition-transform active:scale-90 text-center h-max-[100px] cursor-pointer"
                        onClick={handleNoClick}
                    >
                        {messages[messageIndex]}
                    </button>
                )}
            </div>
            <div className="mt-6">
                <img
                    className=""
                    src="../../public/BeMine.webp"
                    alt="Тут должна быть милая гифка!"
                />
            </div>
        </div>
    );
};

export default WillYouBeMyValentine;
