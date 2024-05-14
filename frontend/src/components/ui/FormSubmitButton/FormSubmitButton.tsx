import React from 'react';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material';

interface Props {
  isLoading: boolean;
  title: string;
}

const MYButton = styled(LoadingButton)(({ theme }) => ({
  border: '1px solid #989898',
  borderRadius: '30px',
  padding: 10,
}));

const FormSubmitButton: React.FC<Props> = ({ isLoading, title }) => {
  return (
    <MYButton loading={isLoading} variant="outlined" type="submit">
      {title}
    </MYButton>
  );
};

export default FormSubmitButton;
