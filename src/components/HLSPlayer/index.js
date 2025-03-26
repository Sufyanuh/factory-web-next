"use client"
import React, { useEffect, useRef } from 'react';
import HLS from 'hls.js';

const HLSPlayer = ({ src }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            const hls = new HLS({
                xhrSetup: (xhr, url) => {
                    xhr.withCredentials = false
                    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
                    // xhr.setRequestHeader("Cookie", null)
                }
            });

            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
            hls.on(HLS.Events.MANIFEST_PARSED, function () {
                videoRef.current.play();
            });
        }
    }, [src]);

    return (
        <video
            ref={videoRef}
            crossOrigin='anonymous'
            controls
            className="w-full h-full object-cover inset-0"
            alt=""
        />
    );
}

export default HLSPlayer;
