import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeSquare } from '../styles/globalCss';
import { getSpaceIconUrl } from 'frontedUtils/space';
import { black } from './styles/colors';

const LogoImg = styled.img`
  ${makeSquare(64)};
  background-color: ${black};
  border-radius: 32px;
  margin-right: 24px;
`;

const DEFAULT_ICON_URL = '/imgs/icons/pending.svg';

export default function SpaceLogo({ space }) {
  const [spaceIconUrl, setSpaceIconUrl] = useState(DEFAULT_ICON_URL);

  useEffect(() => {
    let isMounted = true;

    async function preloadImage(url) {
      try {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (isMounted) {
            console.log(`Image loaded: ${url}`);
            setSpaceIconUrl(url);
          }
        };
        img.onerror = () => {
          if (isMounted) {
            console.log(`Image failed to load: ${url}`);
            setSpaceIconUrl(DEFAULT_ICON_URL);
          }
        };
      } catch (error) {
        console.error('Error loading image:', error);
        if (isMounted) {
          setSpaceIconUrl(DEFAULT_ICON_URL);
        }
      }
    }

    const url = getSpaceIconUrl(space);
    console.log(`Loading image: ${url}`);
    setSpaceIconUrl(DEFAULT_ICON_URL);
    preloadImage(url);

    return () => {
      isMounted = false;
    };
  }, [space]);

  return (
    <LogoImg
      src={spaceIconUrl}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = DEFAULT_ICON_URL;
      }}
      alt="Space Icon"
    />
  );
}
