import {useState, useEffect} from "react";
import {getYoutubeViews} from "#api";

export const useViewCountApi = (mediaLink) => {
	const [viewCount, setViewCount] = useState(0);

	useEffect(() => {
		const getViews = async() => {
			const views = await getYoutubeViews(mediaLink);
			setViewCount(views);
		}

		if (mediaLink.length > 0) {
			getViews()
		}
	}, [mediaLink])
	
	return viewCount;
}

export default useViewCountApi;