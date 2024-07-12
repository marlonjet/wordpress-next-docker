import type {ReactElement} from 'react';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {
  ImageSourceSet,
  ImageSourceSetsRecord
} from '@/types/of-image.types';
import type {Nullable} from '@/types/nullable';
import styles from './ImageWithSets.module.scss';
import {useColorSchema} from '@/context/ColorSchema';
import {useScreenSize} from '@/utils/hooks/useScreenSize';
import {imageUrlService} from '@/services/image-url-service';
import {error} from '@/utils/logger';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import {getRecordEntries} from '@/utils/getRecordEntries';
import {
  DARK_MODE_MEDIA_QUERY,
  LIGHT_MODE_MEDIA_QUERY
} from '@/constants/color-theme-media-queris.constant';

export interface ImageWithSetsProps {
  classNames?: string;
  alt?: string;
  placeholderImagePath?: string;
  isPreloaded?: boolean;
  image: Nullable<OFImageType>;
}

// It needs or (|) string because of teaser image
type OFImageType = string | ImageSourceSetsRecord;

const DEFAULT_PLACEHOLDER =
  'https://images.onefootball.com/cw/icons/placeholder_image-light.svg';

/*
 * This component was formally named "of-image" in Angular solution
 * */
export const ImageWithSets: React.FC<ImageWithSetsProps> = ({
  alt = '',
  classNames = '',
  image,
  isPreloaded = false,
  placeholderImagePath = DEFAULT_PLACEHOLDER
}) => {
  const screenSize = useScreenSize();
  const colorSchema = useColorSchema();
  const [imageAvailable, setImageAvailable] = useState(true);
  const {t} = useTranslation('web-payments');

  // React doesn't recognize "importance" attribute, so we must be added in this way
  const customAttr = {
    importance: isPreloaded ? 'high' : 'low'
  };

  const imageSourceSets = useMemo<Nullable<ImageSourceSetsRecord>>(() => {
    if (typeof image === 'string') {
      const imageSourceSetsRecordResult =
        imageUrlService.buildImageSourceSetsFromUrl(image);

      if (imageSourceSetsRecordResult.isErr()) {
        error(
          imageSourceSetsRecordResult.error.message,
          imageSourceSetsRecordResult.error
        );

        return null;
      } else {
        return imageSourceSetsRecordResult.value;
      }
    } else {
      return image;
    }
  }, [image]);

  const imageUrlProperty: 'darkModeUrl' | 'lightModeUrl' =
    colorSchema.uiMode !== 'auto' && colorSchema.schema === 'dark'
      ? 'darkModeUrl'
      : 'lightModeUrl';
  const getPaddingBottomForRatio = useCallback(
    (ratio: ImageSourceSet['ratio']) => {
      if (ratio <= 0) {
        return '0';
      }

      return `${(1 / ratio) * 100}%`;
    },
    []
  );
  const handleImageLoadError = useCallback(() => {
    setImageAvailable(false);
  }, []);
  const handleImageLoadSuccess = useCallback(() => {
    setImageAvailable(true);
  }, []);
  const sourcesElements: Array<ReactElement> = useMemo(() => {
    if (!imageSourceSets) {
      return [];
    }

    return getRecordEntries(imageSourceSets).flatMap(([, set]) => {
      if (colorSchema.uiMode === 'auto') {
        const darkMedia = `${set.media} and ${DARK_MODE_MEDIA_QUERY}`;
        const lightMedia = `${set.media} and ${LIGHT_MODE_MEDIA_QUERY}`;

        return [
          <source media={darkMedia} key={darkMedia} srcSet={set.darkModeUrl} />,
          <source
            media={lightMedia}
            key={lightMedia}
            srcSet={set.lightModeUrl}
          />
        ];
      } else {
        return [
          <source
            key={set.media}
            media={set.media}
            srcSet={set[imageUrlProperty]}
          />
        ];
      }
    });
  }, [imageSourceSets, colorSchema.uiMode, imageUrlProperty]);

  useEffect(() => {
    if (
      screenSize !== 'unknown' &&
      imageSourceSets?.[screenSize][imageUrlProperty] != null
    ) {
      setImageAvailable(true);
    }
  }, [imageSourceSets, imageUrlProperty, screenSize]);

  if (!imageSourceSets) {
    return <></>;
  }

  return (
    <>
      {isPreloaded && (
        <Head>
          {getRecordEntries(imageSourceSets).map(([, set]) => (
            <link
              rel="preload"
              as="image"
              media={set.media}
              href={set[imageUrlProperty]}
              key={set[imageUrlProperty]}
            />
          ))}
        </Head>
      )}
      <div
        className={styles['of-image']}
        style={{
          '--padding-bottom-mobile': getPaddingBottomForRatio(
            imageSourceSets.mobile.ratio
          ),
          '--padding-bottom-tablet-portrait': getPaddingBottomForRatio(
            imageSourceSets.tabletPortrait.ratio
          ),
          '--padding-bottom-tablet-landscape': getPaddingBottomForRatio(
            imageSourceSets.tabletLandscape.ratio
          ),
          '--padding-bottom-desktop': getPaddingBottomForRatio(
            imageSourceSets.desktop.ratio
          )
        }}
      >
        <picture className={styles['of-image__picture']}>
          {imageAvailable ? (
            <>
              {sourcesElements}
              {/*Rule wouldn't be active if not for condition. Using <img> inside <picture> is okay, because NextImage can't work with <picture> yet.*/}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                onError={handleImageLoadError}
                onLoad={handleImageLoadSuccess}
                alt={alt}
                decoding={isPreloaded ? 'sync' : 'async'}
                height={
                  imageSourceSets.mobile.width / imageSourceSets.mobile.ratio
                }
                loading={isPreloaded ? 'eager' : 'lazy'}
                src={imageSourceSets.mobile[imageUrlProperty]}
                width={imageSourceSets.mobile.width}
                className={[styles['of-image__img'], classNames].join(' ')}
                {...customAttr}
              />
            </>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={t`IMAGE_NOT_AVAILABLE`}
              src={placeholderImagePath}
              className={[styles['of-image__img'], classNames].join(' ')}
              loading="lazy"
            />
          )}
        </picture>
      </div>
    </>
  );
};
