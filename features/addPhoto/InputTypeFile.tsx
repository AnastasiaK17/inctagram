import React, { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/shared/ui/Button';

type ADd = {
  addPhoto: (a: any) => void;
  photo: string;
};

export const InputTypeFile = (props: ADd) => {
  const dispatch = useDispatch();

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      convertFileToBase64(file, (file64: string) => {
        props.addPhoto(file);
      });

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          /*dispatch(setMe({ avatar: file64 }))*/
        });
      } else {
        console.error('Error: ', 'Файл слишком большого размера');
      }
    }
  };

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const file64 = reader.result as string;

      callBack(file64);
    };
    reader.readAsDataURL(file);
  };
  const errorHandler = () => {
    /*dispatch(setMe({ avatar: profDefaultPicture }));*/
    console.log('error');
  };

  return (
    <div>
      <label style={{ width: '50px' }}>
        <input onChange={uploadHandler} style={{ display: 'none' }} type={'file'} />

        <Button as={'span'} onClick={() => console.log('heelo')} style={{ width: '219px' }}>
          Select from Computer
        </Button>
      </label>
    </div>
  );
};
