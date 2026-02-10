function automationScript() {
    console.log("Automation Running");


    let totalHeight = 0;
    const distance = 200;


    const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;


        if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            console.log("Scroll Finished");
        }
    }, 500);
}