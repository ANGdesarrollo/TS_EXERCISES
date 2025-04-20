interface GetRandomApiResponse {
	id: string;
	url: string;
	width: number;
	height: number;
}

const BASE_API_URL = "https://api.thecatapi.com/v1";

const getRandomImage = async (): Promise<GetRandomApiResponse[]> => {
	const response = await fetch(`${BASE_API_URL}/images/search`, {
	   METHOD: "GET"
	});

	return response.json();
}

const imageUrl = getRandomImage();

console.log(imageUrl);
