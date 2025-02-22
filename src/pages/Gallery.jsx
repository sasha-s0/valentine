import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const images = [
    "../assets/gallery/0.jpg",
    "../assets/gallery/1.jpg",
    "../assets/gallery/2.jpg",
    "../assets/gallery/3.jpg",
    "../assets/gallery/4.jpg",
    "../assets/gallery/5.jpg",
    "../assets/gallery/6.jpg",
    "../assets/gallery/7.jpg",
    "../assets/gallery/8.jpg",
    "../assets/gallery/9.jpg",
    "../assets/gallery/v1.MP4",
    "../assets/gallery/v2.MP4",
    "../assets/gallery/10.jpg",
    "../assets/gallery/11.jpg",
    "../assets/gallery/12.jpg",
    "../assets/gallery/13.jpg",
    "../assets/gallery/14.jpg",
    "../assets/gallery/v3.MP4",
    "../assets/gallery/15.jpg",
    "../assets/gallery/16.jpg",
    "../assets/gallery/v5.MP4",
];

const Gallery = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1000); // Эффект плавной загрузки
        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-pink-100">
                <p className="text-lg text-gray-600 animate-pulse">Загрузка...</p>
            </div>
        );
    }

    return (
        <div className="min-h-dvh bg-pink-200 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Крутые фоточки! <br/> <span className="text-sm font-normal text-ce">Будет дополняться...</span></h1>

            <div className="grid grid-cols-auto-fit gap-4 max-w-5xl">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        {src.endsWith(".MP4") ? (
                            <video
                                src={src}
                                className="w-[400px] object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        ) : (
                            <img
                                src={src}
                                alt={`Медиа ${index + 1}`}
                                className="w-[400px] object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/letter')}
                className="mt-8 px-6 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition"
            >
                {">>>"}
            </button>
        </div>
    );
};

export default Gallery;
