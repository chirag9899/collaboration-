import { defaultSeoImage } from "frontedUtils/consts/spaces/sns";
import { NextSeo } from "next-seo";

export default function Seo({ space, title, desc, banner }) {
  const imageCid = space?.seoImage || defaultSeoImage;
  const images = [
    {
      url: banner ?? `https://beravote.com/imgs/beravote_preview.png`,
      width: 1200,
      height: 628,
    },
  ];

  const finalTitle =
    title ?? "BeraVote | Decentralized Governance Infrastructure ";
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
