import { defaultSeoImage } from "frontedUtils/consts/spaces/sns";
import { NextSeo } from "next-seo";

export default function Seo({ space, title, desc, banner }) {
  // const imageCid = space?.seoImage || defaultSeoImage;
  const images = [
    {
      url: banner ?? `${process.env.NEXT_PUBLIC_API_END_POINT}imgs/card.png`,
      width: 1201,
      height: 629,
    },
  ];

  const finalTitle = title ?? "dVote | Decentralized Governance Infrastructure ";
  return (
    <NextSeo
      title={finalTitle}
      description={desc}
      openGraph={{
        url: process.env.NEXT_PUBLIC_API_END_POINT,
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
