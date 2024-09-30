/**
 * Sources: 
 * flags: https://flagpedia.net
 * maps: https://www.naturalearthdata.com/
 */

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface MouseState {
    isPressed: boolean;
    isMoved: boolean;
    lastPosition: { x: number; y: number };
}

const GeoCanvas: React.FC<{ data: any, featureSelectCallback: (feature: any) => void }> = ({ data, featureSelectCallback }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseState = useRef<MouseState>({ isPressed: false, isMoved: false, lastPosition: { x: 0, y: 0} })
    const rotationRef = useRef<[number, number, number]>([-24.9, -60.2, 0]);
    const selectedFeature = useRef<string>("");

    const getFeatureAt = (x: number, y: number) => {
        if (!canvasRef.current || !data)
            return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context)
            return;

        let projection = d3.geoOrthographic()
            .scale(300)
            .rotate(rotationRef.current)
            .translate([canvas.width/2, canvas.height/2]);

        const lonlat: [number, number] = projection.invert ? projection.invert([x, y])! : [0, 0];
        for (const d of data.features) {
            if (d3.geoContains(d, lonlat))
                return d;
        }
        return null;
    };

    const draw = () => {
        if (!canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context)
            return;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawGraticule();
        drawFeatures();
    };

    // Draw map
    const drawFeatures = () => {
        if (!data)
            return;
        if (!canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context)
            return;

        let projection = d3.geoOrthographic()
            .scale(300)
            .rotate(rotationRef.current)
            .translate([canvas.width/2, canvas.height/2]);
        let geoGen = d3.geoPath().projection(projection).context(context);

        data.features.forEach((d: any) => {
            context.fillStyle = (selectedFeature.current === d.properties.name) ? "orange" : "#369";
            context.strokeStyle = "white";
            context.beginPath();
            geoGen(d);
            context.fill();
            context.stroke();
        });
    };

    // Draw graticule
    const drawGraticule = () => {
        if (!canvasRef.current)
            return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context)
            return;

        let projection = d3.geoOrthographic()
            .scale(300)
            .rotate(rotationRef.current)
            .translate([canvas.width/2, canvas.height/2]);
        let geoGen = d3.geoPath().projection(projection).context(context);
        let graticule = d3.geoGraticule10();

        context.beginPath();
        geoGen(graticule);
        context.strokeStyle = "gray";
        context.lineWidth = 1;
        context.stroke();
    };

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current)
            return;
        const canvas = canvasRef.current;
    
        const getPosition = (e: MouseEvent | TouchEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) 
                return { x: 0, y: 0 };
            const rect = canvas.getBoundingClientRect();
            if ('touches' in e) {
                if (e.touches.length > 0)
                    return { x: e.touches[0].clientX-rect.left, y: e.touches[0].clientY-rect.top };
                else
                    return { x: mouseState.current.lastPosition.x, y: mouseState.current.lastPosition.y };
            }
            return { x: (e as MouseEvent).clientX-rect.left, y: (e as MouseEvent).clientY-rect.top };
        };
    
        // const handleClick = (e: MouseEvent) => {
        //     console.log("handleClick");
        //     // button 0 is left click
        //     console.log(mouseState);
        //     if (e.button === 0 && !mouseState.current.isMoved) {
        //         const { x, y } = getPosition(e);
        //         console.log("Left-click detected at", x, y);
        //         // drawCircle(x, y, 10);
        //         const feature = getFeatureAt(x, y);
        //         if (feature)
        //             featureSelectCallback(feature);
        //         else 
        //             console.log("No feature found.")
        //     }
        // };
    
        // Drag start: mouse down / touch start
        const handleStartDrag = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            console.log("handleStartDrag");
            mouseState.current.isPressed = true;
            const { x, y } = getPosition(e);
            mouseState.current.lastPosition = { x, y };
        };
    
        // Drag move: mouse move / touch move
        const handleMove = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            if (!mouseState.current.isPressed) 
                return;
            mouseState.current.isMoved = true;
            const { x, y } = getPosition(e);
            const dx = x - mouseState.current.lastPosition.x;
            const dy = y - mouseState.current.lastPosition.y;
            mouseState.current.lastPosition = { x, y };
            // drawCircle(x, y, 3);
            if (('touches' in e && e.touches.length > 0) 
                    || (e instanceof MouseEvent && e.button === 0)) {
                const rot = rotationRef.current;
                rotationRef.current = [rot[0]+dx/2, Math.max(Math.min(rot[1]-dy/2, 90), -90), rot[2]];
                draw();
            }
        };
    
        // Drag end: mouse up / touch end
        const handleEndDrag = (e: MouseEvent | TouchEvent) => {
            // e.preventDefault();
            console.log("handleEndDrag");

            if (!mouseState.current.isMoved && (!(e instanceof MouseEvent) || e.button === 0)) {
                const { x, y } = getPosition(e);
                console.log("Left-click detected at", x, y);
                // drawCircle(x, y, 10);
                const feature = getFeatureAt(x, y);
                selectedFeature.current = feature ? feature.properties.name : null;
                featureSelectCallback(feature);
                draw();
            }

            mouseState.current.isPressed = false;
            mouseState.current.isMoved = false;
        };
    
        // Add listeners
        canvas.addEventListener("mousedown", handleStartDrag);
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleEndDrag);
        canvas.addEventListener("touchstart", handleStartDrag);
        window.addEventListener("touchmove", handleMove);
        window.addEventListener("touchend", handleEndDrag);
    
        // Cleanup event listeners on component unmount
        return () => {
            canvas.removeEventListener("mousedown", handleStartDrag);
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleEndDrag);
            canvas.removeEventListener("touchstart", handleStartDrag);
            window.removeEventListener("touchmove", handleMove);
            window.removeEventListener("touchend", handleEndDrag);
        };
    }, [data]);

    // handle resizing
    useEffect(() => {
        if (!containerRef.current)
            return;
        const resizeObserver = new ResizeObserver(() => {
            if (!containerRef.current || !canvasRef.current)
                return;
            const { clientWidth, clientHeight } = containerRef.current;
            canvasRef.current.width = clientWidth;
            canvasRef.current.height = clientHeight;
            draw();
            console.log("GeoCanvas useEffect", clientWidth, clientHeight);
        });
        resizeObserver.observe(containerRef.current);
        return () => {
            if (containerRef.current)
                resizeObserver.unobserve(containerRef.current)
        };
    }, [data]);

    // useEffect(() => {
    //     // console.log("GeoCanvas");
    //     draw();
    // }, [rotationRef.current]);
    
    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} >
            <canvas ref={canvasRef}></canvas>
        </div>
        );
};

export { GeoCanvas };