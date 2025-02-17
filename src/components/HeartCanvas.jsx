import { useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";

const HeartCanvas = () => {
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        let random = Math.random;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);


        const heartPos = (rad) => [
            Math.pow(Math.sin(rad), 3),
            -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad)),
        ];

        const scaleAndTranslate = (pos, sx, sy, dx, dy) => [dx + pos[0] * sx, dy + pos[1] * sy];

        const drawHeart = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 3);
            ctx.bezierCurveTo(
                canvas.width / 2 + 50, canvas.height / 5,
                canvas.width / 2 + 100, canvas.height / 3,
                canvas.width / 2, canvas.height / 1.5
            );
            ctx.bezierCurveTo(
                canvas.width / 2 - 100, canvas.height / 3,
                canvas.width / 2 - 50, canvas.height / 5,
                canvas.width / 2, canvas.height / 3
            );
            ctx.fill();
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth * 0.9; // Отступы по бокам
            canvas.height = window.innerHeight * 0.9; // Отступ сверху и снизу
            drawHeart();
        };

        window.addEventListener("resize", resizeCanvas);

        let traceCount = 50;
        let pointsOrigin = [];
        let dr = 0.1;

        for (let i = 0; i < Math.PI * 2; i += dr)
            pointsOrigin.push(scaleAndTranslate(heartPos(i), 210, 13, 0, 0));

        for (let i = 0; i < Math.PI * 2; i += dr)
            pointsOrigin.push(scaleAndTranslate(heartPos(i), 150, 9, 0, 0));

        for (let i = 0; i < Math.PI * 2; i += dr)
            pointsOrigin.push(scaleAndTranslate(heartPos(i), 90, 5, 0, 0));

        let heartPointsCount = pointsOrigin.length;
        let targetPoints = [];

        const pulse = (kx, ky) => {
            for (let i = 0; i < pointsOrigin.length; i++) {
                targetPoints[i] = [];
                targetPoints[i][0] = kx * pointsOrigin[i][0] + w / 2;
                targetPoints[i][1] = ky * pointsOrigin[i][1] + h / 2;
            }
        };

        let e = [];
        for (let i = 0; i < heartPointsCount; i++) {
            let x = random() * w;
            let y = random() * h;

            e[i] = {
                vx: 0,
                vy: 0,
                R: 2,
                speed: random() + 5,
                q: ~~(random() * heartPointsCount),
                D: 2 * (i % 2) - 1,
                force: 0.2 * random() + 0.7,
                f: `hsla(0, ${~~(40 * random() + 60)}%, ${~~(60 * random() + 20)}%, .3)`,
                trace: Array(traceCount).fill({ x, y }),
            };
        }

        let config = {
            traceK: 0.4,
            timeDelta: 0.01,
        };

        let time = 0;
        const loop = () => {
            let n = -Math.cos(time);

            pulse((1 + n) * 0.5, (1 + n) * 0.5);

            time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;

            ctx.fillStyle = "rgba(0,0,0,.1)";
            ctx.fillRect(0, 0, w, h);

            for (let i = e.length; i--; ) {
                let u = e[i],
                    q = targetPoints[u.q],
                    dx = u.trace[0].x - q[0],
                    dy = u.trace[1].y - q[1],
                    length = Math.sqrt(dx * dx + dy * dy);

                if (length < 10) {
                    if (random() > 0.95) {
                        u.q = ~~(random() * heartPointsCount);
                    } else {
                        if (random() > 0.99) {
                            u.D *= -1;
                        }

                        u.q = (u.q + u.D) % heartPointsCount;
                        if (u.q < 0) u.q += heartPointsCount;
                    }
                }

                u.vx += (-dx / length) * u.speed;
                u.vy += (-dy / length) * u.speed;

                u.trace[0].x += u.vx;
                u.trace[0].y += u.vy;

                u.vx *= u.force;
                u.vy *= u.force;

                for (let k = 0; k < u.trace.length - 1; ) {
                    let T = u.trace[k];
                    let N = u.trace[++k];
                    N.x -= config.traceK * (N.x - T.x);
                    N.y -= config.traceK * (N.y - T.y);
                }

                ctx.fillStyle = u.f;
                for (let k = 0; k < u.trace.length; k++) {
                    ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
                }
            }

            requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <div
            style={{
                width: "100dvw",
                height: "100dvh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "black",
            }}
            onClick={() => navigate("/beMyValentine")}
        >
            <canvas ref={canvasRef} style={{cursor: "pointer"}}/>
        </div>
    );
};

export default HeartCanvas;
