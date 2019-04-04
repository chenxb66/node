
exports.buffer = function(buffer, delimiter) {
    let bufferPart = [];
    while((n = buffer.indexOf(delimiter)) != -1) {
        bufferPart.push(buffer.slice(0, n));
        buffer = buffer.slice(n + delimiter.length);
    }
    bufferPart.push(buffer);

    return bufferPart;
}