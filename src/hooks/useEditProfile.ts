import {useState, useEffect} from 'react';
import {DefaultImg} from '../api/editProfile/getImageType';
import {GetDefaultImages} from '../api/editProfile/getImageAPI';

type UseDefaultImagesResult = {
  defaultProfile: DefaultImg[] | null;
  defaultBanner: DefaultImg[] | null;
  isLoading: boolean;
  error: string | null;
};

const useDefaultImages = (
  authToken: string,
  id: string,
): UseDefaultImagesResult => {
  const [defaultProfile, setDefaultProfile] = useState<DefaultImg[] | null>(
    null,
  );
  const [defaultBanner, setDefaultBanner] = useState<DefaultImg[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authToken || !id) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const profileImages = await GetDefaultImages(authToken, id, 'profile');
        if (profileImages) {
          setDefaultProfile(profileImages);
          console.log('프로필 이미지 불러오기 성공');
        } else {
          console.error('프로필 이미지 불러오기 실패');
          setError('프로필 이미지 불러오기 실패');
        }

        // 배너 이미지 불러오기
        const bannerImages = await GetDefaultImages(authToken, id, 'banner');
        if (bannerImages) {
          setDefaultBanner(bannerImages);
          console.log('배너 이미지 불러오기 성공');
        } else {
          console.error('배너 이미지 불러오기 실패');
          setError('배너 이미지 불러오기 실패');
        }
      } catch (err) {
        console.error('기본 이미지 데이터를 가져오는 도중 에러 발생:', err);
        setError('기본 이미지 데이터를 가져오는 도중 에러가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [authToken, id]);

  return {defaultProfile, defaultBanner, isLoading, error};
};

export default useDefaultImages;
