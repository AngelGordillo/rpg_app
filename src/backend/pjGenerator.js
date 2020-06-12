export const generatePj = (pjData) => {
    const stats = {
        Destreza: randomIntFromInterval(3, 18),
        Fuerza: randomIntFromInterval(3, 18),
        Resistencia:  randomIntFromInterval(1, 12),
    }
    const lifeAndMagic = {
        Vida: randomIntFromInterval(5, 22),
        Magia: randomIntFromInterval(5, 55),
    }
    const generatedPj = {
        info: { ...pjData.formData, tipo:'normal' },
        stats: { ...stats },
        lifeAndMagic: { ...lifeAndMagic }

    }
    return generatedPj;

}
export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}