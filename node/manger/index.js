const fn = () => {
    console.log(1);
}

(async () => {
    await fn();
})()