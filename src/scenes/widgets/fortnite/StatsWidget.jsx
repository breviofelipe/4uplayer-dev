import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Box,
  useTheme
} from '@mui/material';
import PostComponent from 'components/post/PostComponent';

const StatsWidget = ({ data }) => {
  const [currentPage, setCurrentPage] = useState('all');
  const [currentMode, setCurrentMode] = useState('overall');
  const [showAllStats, setShowAllStats] = useState(false);

  const pages = ['all', 'keyboardMouse', 'gamepad'];
  const modes = ['overall', 'solo', 'squad'];

  const { palette } = useTheme();

  const renderStats = (stats) => {
    const statEntries = Object.entries(stats);
    const visibleStats = showAllStats ? statEntries : statEntries.slice(0, 5);

    return (
      <TableContainer sx={{backgroundColor: 'background.alt',}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stat</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleStats.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="right">{typeof value === 'number' ? value.toFixed(2) : value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {statEntries.length > 5 && (
          <Box textAlign="center" py={2}>
            <Button 
              variant="contained" 
              sx={{color: palette.neutral.dark}}
              onClick={() => setShowAllStats(!showAllStats)}
            >
              {showAllStats ? 'Show Less' : 'Show More'}
            </Button>
          </Box>
        )}
      </TableContainer>
    );
  };

  const content = () => {
    return (
        <><img width="100%"
        height="auto"
        alt="game"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        src='https://res.cloudinary.com/dosghtja7/image/upload/v1727316730/assets/games/klyikxhewyuhliqvljld.jpg' />
      <Card sx={{backgroundColor: 'background.alt',}}>
        <CardContent>
          <Typography>
            Nick:  {data.account.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Battle Pass Level: {data.battlePass.level}
          </Typography>
          <Box mb={2}>
            {pages.map((page) => (
              <Button 
                key={page} 
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? 'contained' : 'outlined'}
                style={{ marginRight: '8px', color: palette.neutral.dark }}
              >
                {page === 'keyboardMouse' ? 'PC' : page}
              </Button>
            ))}
          </Box>
          <Box mb={2}>
            {modes.map((mode) => (
              <Button 
                key={mode} 
                onClick={() => setCurrentMode(mode)}
                variant={currentMode === mode ? 'contained' : 'outlined'}
                style={{ marginRight: '8px', color: palette.neutral.dark }}
                disabled={!data.stats[currentPage][mode]}
              >
                {mode}
              </Button>
            ))}
          </Box>
          {data.stats[currentPage][currentMode] && renderStats(data.stats[currentPage][currentMode])}
        </CardContent>
      </Card>
      </>
    );
  }

  return <PostComponent titulo={"Player Stats"} subtitulo={"FORTNITE"} content={content()} isCenter={false} />
  
};

export default StatsWidget;