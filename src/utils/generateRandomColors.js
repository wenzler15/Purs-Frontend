export const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
        colors.push(color);
    }
    return colors;
};
