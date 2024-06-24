// SpaceLogo.js

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
    async function validateImageUrl(url) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok && response.headers.get('Content-Type').startsWith('image/')) {
          return url;
        }
      } catch (error) {
        console.error('Error validating image URL:', error);
      }
      return DEFAULT_ICON_URL;
    }

    const url = getSpaceIconUrl(space);
    validateImageUrl(url).then(validUrl => setSpaceIconUrl(validUrl));
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
