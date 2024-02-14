import { useState } from 'react';
import './Masks.css';
import { IconButton, useTheme } from '@mui/material';
import { FaStar } from 'react-icons/fa';
const Masks = ({     
    quantidade: quantidadeAntiga,
    editavel = false,
    grande = false,
    setNovaQuantidade
 }) => {
    const [quantidade, setQuantidade] = useState(quantidadeAntiga);
    const tamanho = grande ? 24 : 16;
    const { palette } = useTheme();
    const getMask = (index) =>{
        if ( index <= quantidade){
            return <FaStar size={tamanho} color={palette.neutral.dark} />;
        }
        return <FaStar size={tamanho} color={palette.neutral.medium} />;
    }
    const RenderMasks = () => {
        const listMasks = [];
        for( let i = 1; i <= 5; i++){
            listMasks.push(
                <IconButton
                    key={i}
                    onClick={() => {
                        setQuantidade(i)
                    }}
                    disabled={!editavel}
                    >
                    {getMask(i)}
                </IconButton>
            );
        }
        return listMasks;
    }
    if(setNovaQuantidade){
        setNovaQuantidade(quantidade);
    }
    return RenderMasks();
 };

 export default Masks;