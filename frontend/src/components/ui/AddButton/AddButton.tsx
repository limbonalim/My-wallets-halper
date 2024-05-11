import React from 'react'
import { PlusCircle } from '@phosphor-icons/react';
import './AddButton.scss'

interface Props {
    onClick: () => void;
}

const AddButton: React.FC<Props> = ({onClick}) => {
    return (
      <button className="AddButton Base_batton" onClick={onClick}>
        <PlusCircle size={70} color="#030303" />
      </button>
    );
};

export default AddButton;