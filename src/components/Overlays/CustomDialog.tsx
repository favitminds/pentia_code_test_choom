import React from 'react';
import Dialog from 'react-native-dialog';

interface Props {
  title: string;
  description: string;
  onClose: () => void;
  onOkay?: () => void;
}

export const CustomDialog = ({description, title, onClose, onOkay}: Props) => {
  return (
    <Dialog.Container visible>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      {onOkay && <Dialog.Button label="Okay" onPress={onOkay} />}
      <Dialog.Button label="Close" onPress={onClose} />
    </Dialog.Container>
  );
};
