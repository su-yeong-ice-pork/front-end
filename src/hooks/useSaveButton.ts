import {useMutation} from '@tanstack/react-query';
import {updateProfileImage} from '../api/patchProfile/patchImageAPI';
import sendDefaultImg from '../api/sendDefaultImage/sendImageAPI';
import changeMessage from '../api/changeMessages/patchMessageAPI';
import {CHANGE_PROFILE_SUBMIT_MESSAGE} from '@/src/constants/EditProfile/Message';
import {SubmitProfileUpdateParams} from '../api/patchProfile/patchImageType';

const useSubmitProfileUpdate = () => {
  return useMutation<
    {uploadSuccess: boolean},
    Error,
    SubmitProfileUpdateParams
  >({
    mutationFn: async (
      params: SubmitProfileUpdateParams,
    ): Promise<{uploadSuccess: boolean}> => {
      const {
        id,
        authToken,
        selectedProfile,
        selectedBanner,
        isCustomImage,
        isCustomBanner,
        currentMessage,
        clearProfile,
        clearBanner,
      } = params;

      let successProfile = false;
      let successBanner = false;
      let successMessage = false;

      // ������ �̹��� ������Ʈ
      if (selectedProfile) {
        if (isCustomImage) {
          try {
            const success = await updateProfileImage(id, authToken, 'image', {
              uri: selectedProfile,
              name: 'profile.jpg',
              type: 'image/jpeg',
            } as unknown as Blob);

            if (success) {
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.profileImageUploadSuccess,
              );
              successProfile = true;
              clearProfile && clearProfile();
            } else {
              console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.profileImageUploadFail);
            }
          } catch (err) {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, err);
          }
        } else {
          try {
            const response = await sendDefaultImg(
              id.toString(),
              authToken,
              'profile',
              {url: selectedProfile},
            );
            if (response.success) {
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.defaultProfileImageUploadSuccess,
              );
              successProfile = true;
              clearProfile && clearProfile();
            } else {
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.defaultProfileImageUploadFail,
              );
            }
          } catch (err) {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, err);
          }
        }
      } else {
        console.log('���õ� ������ �̹����� �����ϴ�.');
      }

      // ��� �̹��� ������Ʈ
      if (selectedBanner) {
        if (isCustomBanner) {
          try {
            const success = await updateProfileImage(id, authToken, 'banner', {
              uri: selectedBanner,
              name: 'banner.jpg',
              type: 'image/jpeg',
            } as unknown as Blob);
            if (success) {
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.bannerImageUploadSuccess,
              );
              successBanner = true;
              clearBanner && clearBanner();
            } else {
              console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.bannerImageUploadFail);
            }
          } catch (err) {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, err);
          }
        } else {
          try {
            const response = await sendDefaultImg(
              id.toString(),
              authToken,
              'banner',
              {url: selectedBanner},
            );
            if (response.success) {
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.defaultBannerImageUploadSuccess,
              );
              successBanner = true;
              clearBanner && clearBanner();
            } else {
              console.log(
                CHANGE_PROFILE_SUBMIT_MESSAGE.defaultBannerImageUploadFail,
              );
            }
          } catch (err) {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, err);
          }
        }
      }

      // �޽��� ���� ó��
      if (currentMessage) {
        try {
          const success = await changeMessage(id, authToken, {
            message: currentMessage,
          });
          if (success) {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.messageChangeSuccess);
            successMessage = true;
          } else {
            console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.messageChangeFail);
          }
        } catch (err) {
          console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.error, err);
        }
      }

      if (successProfile || successBanner || successMessage) {
        return {uploadSuccess: true};
      } else {
        console.log(CHANGE_PROFILE_SUBMIT_MESSAGE.imageUploadFail);
        throw new Error('�̹����� �޽��� ������Ʈ�� �����߽��ϴ�.');
      }
    },
  });
};

export default useSubmitProfileUpdate;
