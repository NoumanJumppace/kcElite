// Create SubscriptionTypeResource class For Response
class VideoCatagoryResource {
    constructor(VideoCatagory) {
        this.id = VideoCatagory._id
        this.name = VideoCatagory.name
        this.description = VideoCatagory.description
    }
}

export default VideoCatagoryResource
