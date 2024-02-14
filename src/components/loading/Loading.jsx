import { Box } from '@mui/material';
import './Loading.css';

const LoadingComponent = () => {
    return <Box>
        <div className="loader-container">
          <div className="spinner"></div>
      </div>
    </Box>
}

export default LoadingComponent;