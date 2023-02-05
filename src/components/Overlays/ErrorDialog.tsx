import React from 'react';
import Dialog from 'react-native-dialog';

interface Props {
  title: string;
  description: string;
  onClose: () => void;
}

export const CustomDialog = ({description, title, onClose}: Props) => {
  return (
    <Dialog.Container visible>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      <Dialog.Button label="Close" onPress={onClose} />
    </Dialog.Container>
  );
};
