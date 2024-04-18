import { defaultSeoImage } from "frontedUtils/consts/spaces/sns";
import { NextSeo } from "next-seo";

export default function Seo({ space, title, desc, banner }) {
  const imageCid = space?.seoImage || defaultSeoImage;
  const images = [
    {
      url: banner ?? `https://dvote.ai/imgs/dvote_preview.png`,
      width: 1201,
      height: 629,
    },
  ];

  const finalTitle = title ?? "BeraVote | Decentralized Governance Infrastructure ";
  return (
    <NextSeo
      title={finalTitle}
      description={desc}
      openGraph={{
        url: "https://dvote.ai",
        title: finalTitle,
        description: desc,
        images,
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
}
