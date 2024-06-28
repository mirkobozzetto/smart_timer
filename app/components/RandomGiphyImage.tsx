import { useEffect, useState } from "react";

type RandomGiphyImageProps = {
  size: number;
  gifKeywords: string[];
};

const RandomGiphyImage = ({ size, gifKeywords }: RandomGiphyImageProps) => {
  const [gifUrl, setGifUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomGif = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

      if (!apiKey) {
        console.error(
          "Clé API Giphy non définie dans les variables d'environnement"
        );
        return;
      }

      const randomKeyword =
        gifKeywords[Math.floor(Math.random() * gifKeywords.length)];

      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${randomKeyword}&limit=5&rating=g`
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * Math.min(5, data.data.length)
          );
          setGifUrl(data.data[randomIndex].images.fixed_height_small.url);
        } else {
          console.log("Aucun GIF trouvé pour ce mot-clé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du GIF:", error);
      }
    };

    fetchRandomGif();
  }, [gifKeywords]);

  if (!gifUrl) return null;

  return (
    <image
      href={gifUrl}
      width={size}
      height={size}
      opacity={1}
      preserveAspectRatio="xMidYMid meet"
      clipPath="url(#gifClip)"
    />
  );
};

export default RandomGiphyImage;
