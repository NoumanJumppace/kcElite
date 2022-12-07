// Create SubscriptionTypeResource class For Response
class GradeResource {
    constructor(Grades) {
        this.id = Grades._id
        this.name = Grades.name
        this.description = Grades.description
    }
}

export default GradeResource
