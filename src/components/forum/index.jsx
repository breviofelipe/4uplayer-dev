import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';

import { Box, Typography, useTheme } from '@mui/material';
import ItemForum from './components/ItemForum';

function Forum() {
   
    
    const [topics, setTopics] = useState([
        { id: 1, title: 'Primeiro Tópico', content: 'Conteúdo do primeiro tópico' },
        { id: 2, title: 'Segundo Tópico', content: 'Conteúdo do segundo tópico' },
        { id: 3, title: 'Terceiro Tópico', content: 'Conteúdo do terceiro tópico' },
        { id: 2, title: 'Quarto Tópico', content: 'Conteúdo do quarto tópico' },
    ]);

    const [newTopicTitle, setNewTopicTitle] = useState('');
    const [newTopicContent, setNewTopicContent] = useState('');
    
  const handleNewTopicSubmit = (e) => {
    e.preventDefault();
    const newTopic = {
      id: topics.length + 1,
      title: newTopicTitle,
      content: newTopicContent,
    };
    setTopics([...topics, newTopic]);
    setNewTopicTitle('');
    setNewTopicContent('');
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
      <Typography variant='h3'>Fórum</Typography>
      <form onSubmit={handleNewTopicSubmit}>
        <Box display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
            <TextField
            label="Título do Tópico"
            variant="outlined"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            />
            <TextField
            label="Conteúdo do Tópico"
            variant="outlined"
            multiline
            rows={4}
            value={newTopicContent}
            onChange={(e) => setNewTopicContent(e.target.value)}
            />
            <Button variant="contained" type="submit">Criar Tópico</Button>
        </Box>
      </form>
      <Box>
        <Typography variant='h4'>Tópicos</Typography>
        <List>
          {topics.map((topic) => (
                <ItemForum topic={topic} />
          ))}
        </List>
        
      </Box>
    </Box>
  );
}

export default Forum;
