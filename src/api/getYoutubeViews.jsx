import axios from "axios";

export const getYoutubeViews = async(mediaLink) => {
	if (mediaLink.length > 0) {
	  try {
	    const viewCountReq = await axios({
	        method: "post",
	        url: process.env.REACT_APP_API_URL + "getYoutubeViews",
	        data: {
	          id: mediaLink
	        }
	      });
	    const viewCount = viewCountReq.data; 
	    return viewCount;
	  } catch (err) {
	    console.log(err);
	    return 0;
	  }
	}
};

export default getYoutubeViews;