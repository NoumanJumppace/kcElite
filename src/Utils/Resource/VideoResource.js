import moment from 'moment'
// Create SubscriptionTypeResource class For Response
class VideoResource {
    constructor(Video) {
        this.id = Video._id
        this.title = Video.title
        // Add Server URL to video_url and thumbnail_url
        this.video_url = process.env.SERVER_URL + Video.video_url
        this.thumbnail_url = process.env.SERVER_URL + Video.thumbnail_url

        this.createdAt = moment(Video.createdAt).format('YYYY-MM-DD HH:mm:ss')
    }
}

export default VideoResource
