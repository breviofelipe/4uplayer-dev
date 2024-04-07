import { initMercadoPago } from '@mercadopago/sdk-react';
import { CardPayment } from '@mercadopago/sdk-react';
import { useTheme } from '@mui/material';
import GamerLoading from 'components/gamerLoading/GamerLoading';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Checkout = ({product, setResponse}) => {

    const theme = useTheme();
    const mode = useSelector((state) => state.mode);
    const backgroud = theme.palette.background.alt;
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.token);
    const { email, emailCheck } = useSelector((state) => state.user);
    const url =  process.env.REACT_APP_HOST_NOTIFICATIONS;

    const keyMercadoPago = process.env.REACT_APP_MERCADO_PAGO;
    var locale = {locale: 'pt-BR'}; 
    initMercadoPago(keyMercadoPago, locale);

    const feactPayment = async (params) => {
      setLoading(true);
      let body = JSON.stringify(params);
      try{
        const response = await fetch(
          url+`/pagamentos/criar?product=${product.id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json"  },
          body: body
        }
      );
      if(response.ok){
        const data = await response.json();
        console.log(data);
        setResponse(data);
        
      } else {
        console.log(response);
      }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
     }

    const customization = {
        visual: {
          style: {
            customVariables: {
                formBackgroundColor: backgroud,                
                textPrimaryColor: theme.palette.primary,
                inputBackgroundColor: backgroud,
                baseColor: theme.palette.primary.main,
                outlinePrimaryColor: theme.palette.neutral.dark,
              },
            theme:  mode === 'dark' ? 'dark' : 'default',
          }
        }
       };
       
    return <>{!loading ? <CardPayment
      installments={1}
      customization={customization}
      locale='pt-BR' //remover se nao funfa online
      initialization={{ 
        amount: product.price,
        payer: {
          email: email
          }
       }}
      onSubmit={async (param) => {
        console.log(param);
        feactPayment(param);
      }}
    /> : <GamerLoading />}</>
}

export default Checkout;