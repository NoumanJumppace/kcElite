import GradeModel from '../Models/GradesModel.js'

export const GradeSeeder = async () => {
    try {
        const grades = await GradeModel.find()
        // Create Grade Array
        const gradeArray = [
            {
                name: '1',
            },
            {
                name: '2',
            },
            {
                name: '3',
            },
            {
                name: '4',
            },
            {
                name: '5',
            },
            {
                name: '6',
            },
        ]
        // Create Grade
        if (grades.length === 0) {
            await GradeModel.insertMany(gradeArray)
        }
    } catch (error) {
        console.error(error)
    }
}
