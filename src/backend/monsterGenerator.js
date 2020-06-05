export const generateMonster = (MonsterData) => {
    const stats = {
        Destreza: randomIntFromInterval(3, 18),
        Fuerza: randomIntFromInterval(1, 18),
        Resistencia:  randomIntFromInterval(1, 12),
    }
    const lifeAndMagic = {
        Vida: randomIntFromInterval(5, 18),
        Magia: randomIntFromInterval(5, 55),
    }
    const generatedMonster = {
        info: { ...MonsterData.formData },
        stats: { ...stats },
        lifeAndMagic: { ...lifeAndMagic }

    }
    return generatedMonster;

}
export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}