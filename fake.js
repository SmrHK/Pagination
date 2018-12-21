var faker = require('faker');

module.exports = () => {
    const data = {
        users : [],
    }

    for (let i = 0; i < 100; i++){
        
        data.users.push({
            id : i,
            avatar : faker.image.avatar(),
            name : faker.name.firstName(),
            family : faker.name.lastName(),
            gender : (Math.floor(Math.random() * 2)) ? 'male' : 'female',
            country : faker.address.country(),
            shortStory : faker.lorem.paragraph(),
            storyOfLife : faker.lorem.paragraphs()
        })

    }

    return data;

}